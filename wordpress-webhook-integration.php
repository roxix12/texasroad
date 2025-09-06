<?php
/**
 * Plugin Name: Texas Roadhouse Next.js Integration
 * Description: Automatically triggers Next.js revalidation and Google indexing when content is updated
 * Version: 1.0.0
 * Author: Texas Roadhouse Menu Team
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class TexasRoadhouseNextjsIntegration {
    
    private $nextjs_webhook_url;
    private $webhook_token;
    
    public function __construct() {
        // Configure your Next.js webhook URL and token
        $this->nextjs_webhook_url = 'https://texasroadhouse-menus.us/api/revalidate-sitemap';
        $this->webhook_token = get_option('trh_webhook_token', ''); // Set this in WordPress admin
        
        // Hook into WordPress post save events
        add_action('save_post', array($this, 'trigger_nextjs_revalidation'), 10, 3);
        add_action('delete_post', array($this, 'trigger_nextjs_revalidation_delete'), 10, 1);
        add_action('wp_trash_post', array($this, 'trigger_nextjs_revalidation_delete'), 10, 1);
        
        // Hook into comment events
        add_action('wp_insert_comment', array($this, 'trigger_nextjs_comment_revalidation'), 10, 2);
        add_action('wp_set_comment_status', array($this, 'trigger_nextjs_comment_revalidation'), 10, 2);
        
        // Hook into menu changes
        add_action('wp_update_nav_menu', array($this, 'trigger_nextjs_menu_revalidation'), 10, 2);
        
        // Add admin settings page
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'settings_init'));
    }
    
    /**
     * Trigger Next.js revalidation when posts/pages are saved
     */
    public function trigger_nextjs_revalidation($post_id, $post, $update) {
        // Skip auto-saves, revisions, and drafts
        if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
            return;
        }
        
        // Only trigger for published posts/pages
        if ($post->post_status !== 'publish') {
            return;
        }
        
        // Skip if this is not a public post type
        $public_post_types = get_post_types(array('public' => true));
        if (!in_array($post->post_type, $public_post_types)) {
            return;
        }
        
        $this->send_webhook_notification(array(
            'action' => $update ? 'updated' : 'created',
            'post_type' => $post->post_type,
            'post_id' => $post_id,
            'post_slug' => $post->post_name,
            'post_title' => $post->post_title,
            'post_status' => $post->post_status,
            'post_modified' => $post->post_modified,
        ));
        
        error_log("🔄 Triggered Next.js revalidation for {$post->post_type}: {$post->post_title} (ID: {$post_id})");
    }
    
    /**
     * Trigger Next.js revalidation when posts/pages are deleted
     */
    public function trigger_nextjs_revalidation_delete($post_id) {
        $post = get_post($post_id);
        if (!$post) return;
        
        $this->send_webhook_notification(array(
            'action' => 'deleted',
            'post_type' => $post->post_type,
            'post_id' => $post_id,
            'post_slug' => $post->post_name,
            'post_title' => $post->post_title,
        ));
        
        error_log("🗑️ Triggered Next.js revalidation for deleted {$post->post_type}: {$post->post_title} (ID: {$post_id})");
    }
    
    /**
     * Trigger Next.js revalidation when comments are added/updated
     */
    public function trigger_nextjs_comment_revalidation($comment_id, $comment = null) {
        if (!$comment) {
            $comment = get_comment($comment_id);
        }
        
        if (!$comment || $comment->comment_approved !== '1') {
            return;
        }
        
        $post = get_post($comment->comment_post_ID);
        if (!$post || $post->post_status !== 'publish') {
            return;
        }
        
        $this->send_webhook_notification(array(
            'action' => 'comment_updated',
            'post_type' => $post->post_type,
            'post_id' => $post->ID,
            'post_slug' => $post->post_name,
            'comment_id' => $comment_id,
        ));
        
        error_log("💬 Triggered Next.js revalidation for comment on: {$post->post_title}");
    }
    
    /**
     * Trigger Next.js revalidation when menus are updated
     */
    public function trigger_nextjs_menu_revalidation($menu_id, $menu_data = null) {
        $this->send_webhook_notification(array(
            'action' => 'menu_updated',
            'menu_id' => $menu_id,
            'urls' => array(
                'https://texasroadhouse-menus.us/',
                'https://texasroadhouse-menus.us/menus-prices',
            )
        ));
        
        error_log("🍽️ Triggered Next.js revalidation for menu update (ID: {$menu_id})");
    }
    
    /**
     * Send webhook notification to Next.js
     */
    private function send_webhook_notification($data) {
        if (empty($this->nextjs_webhook_url)) {
            error_log("❌ Next.js webhook URL not configured");
            return false;
        }
        
        $headers = array(
            'Content-Type' => 'application/json',
            'User-Agent' => 'WordPress-TRH-Integration/1.0'
        );
        
        // Add authentication token if configured
        if (!empty($this->webhook_token)) {
            $headers['Authorization'] = 'Bearer ' . $this->webhook_token;
        }
        
        $body = wp_json_encode($data);
        
        $args = array(
            'method' => 'POST',
            'headers' => $headers,
            'body' => $body,
            'timeout' => 30,
            'blocking' => false, // Don't block WordPress execution
        );
        
        $response = wp_remote_request($this->nextjs_webhook_url, $args);
        
        if (is_wp_error($response)) {
            error_log("❌ Next.js webhook failed: " . $response->get_error_message());
            return false;
        }
        
        error_log("✅ Next.js webhook sent successfully");
        return true;
    }
    
    /**
     * Add admin menu page
     */
    public function add_admin_menu() {
        add_options_page(
            'Texas Roadhouse Next.js Integration',
            'Next.js Integration',
            'manage_options',
            'trh-nextjs-integration',
            array($this, 'admin_page')
        );
    }
    
    /**
     * Initialize settings
     */
    public function settings_init() {
        register_setting('trh_nextjs_settings', 'trh_webhook_token');
        register_setting('trh_nextjs_settings', 'trh_webhook_url');
        
        add_settings_section(
            'trh_nextjs_section',
            'Next.js Integration Settings',
            array($this, 'settings_section_callback'),
            'trh_nextjs_settings'
        );
        
        add_settings_field(
            'trh_webhook_url',
            'Webhook URL',
            array($this, 'webhook_url_render'),
            'trh_nextjs_settings',
            'trh_nextjs_section'
        );
        
        add_settings_field(
            'trh_webhook_token',
            'Webhook Token',
            array($this, 'webhook_token_render'),
            'trh_nextjs_settings',
            'trh_nextjs_section'
        );
    }
    
    /**
     * Admin page content
     */
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>Texas Roadhouse Next.js Integration</h1>
            
            <div class="notice notice-info">
                <p><strong>Status:</strong> This plugin automatically triggers Next.js revalidation when content is updated.</p>
                <p><strong>Current Webhook URL:</strong> <?php echo esc_html($this->nextjs_webhook_url); ?></p>
            </div>
            
            <form action="options.php" method="post">
                <?php
                settings_fields('trh_nextjs_settings');
                do_settings_sections('trh_nextjs_settings');
                submit_button();
                ?>
            </form>
            
            <div class="card">
                <h2>Test Webhook</h2>
                <p>Click the button below to test the webhook connection:</p>
                <button type="button" class="button button-secondary" onclick="testWebhook()">Test Webhook</button>
                <div id="webhook-test-result" style="margin-top: 10px;"></div>
            </div>
            
            <script>
            function testWebhook() {
                const resultDiv = document.getElementById('webhook-test-result');
                resultDiv.innerHTML = 'Testing webhook...';
                
                fetch(ajaxurl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'action=test_trh_webhook&_wpnonce=<?php echo wp_create_nonce('test_webhook'); ?>'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        resultDiv.innerHTML = '<div class="notice notice-success"><p>✅ Webhook test successful!</p></div>';
                    } else {
                        resultDiv.innerHTML = '<div class="notice notice-error"><p>❌ Webhook test failed: ' + data.data + '</p></div>';
                    }
                })
                .catch(error => {
                    resultDiv.innerHTML = '<div class="notice notice-error"><p>❌ Error: ' + error.message + '</p></div>';
                });
            }
            </script>
        </div>
        <?php
    }
    
    public function settings_section_callback() {
        echo '<p>Configure the webhook settings for Next.js integration.</p>';
    }
    
    public function webhook_url_render() {
        $value = get_option('trh_webhook_url', $this->nextjs_webhook_url);
        echo '<input type="url" name="trh_webhook_url" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">The Next.js webhook endpoint URL</p>';
    }
    
    public function webhook_token_render() {
        $value = get_option('trh_webhook_token', '');
        echo '<input type="password" name="trh_webhook_token" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">Optional: Security token for webhook authentication</p>';
    }
}

// Initialize the plugin
new TexasRoadhouseNextjsIntegration();

// AJAX handler for webhook testing
add_action('wp_ajax_test_trh_webhook', function() {
    check_ajax_referer('test_webhook');
    
    if (!current_user_can('manage_options')) {
        wp_die('Unauthorized');
    }
    
    $webhook_url = get_option('trh_webhook_url', 'https://texasroadhouse-menus.us/api/revalidate-sitemap');
    $webhook_token = get_option('trh_webhook_token', '');
    
    $headers = array(
        'Content-Type' => 'application/json',
    );
    
    if (!empty($webhook_token)) {
        $headers['Authorization'] = 'Bearer ' . $webhook_token;
    }
    
    $test_data = array(
        'action' => 'test',
        'post_type' => 'test',
        'post_slug' => 'webhook-test',
        'timestamp' => current_time('mysql'),
    );
    
    $response = wp_remote_post($webhook_url, array(
        'headers' => $headers,
        'body' => wp_json_encode($test_data),
        'timeout' => 30,
    ));
    
    if (is_wp_error($response)) {
        wp_send_json_error($response->get_error_message());
    } else {
        wp_send_json_success('Webhook test completed successfully');
    }
});
?>
