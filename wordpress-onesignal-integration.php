<?php
/**
 * OneSignal Push Notifications Integration for Texas Roadhouse Menus
 * 
 * Add this code to your WordPress theme's functions.php file
 * or create it as a separate plugin file.
 * 
 * Required: Replace YOUR_REST_API_KEY with your actual OneSignal REST API Key
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class TexasRoadhouseOneSignal {
    
    private $app_id = '7629b842-fb4e-4821-a9dd-e60ca450a208';
    private $rest_api_key = 'YOUR_REST_API_KEY'; // Replace with your actual REST API key
    private $api_url = 'https://onesignal.com/api/v1/notifications';
    
    public function __construct() {
        // Hook into WordPress actions
        add_action('publish_post', array($this, 'send_post_notification'), 10, 2);
        add_action('publish_page', array($this, 'send_post_notification'), 10, 2);
        
        // Add admin menu for settings
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Add settings
        add_action('admin_init', array($this, 'settings_init'));
        
        // Initialize REST API key from options
        $this->rest_api_key = get_option('onesignal_rest_api_key', 'YOUR_REST_API_KEY');
    }
    
    /**
     * Send push notification when a post is published
     */
    public function send_post_notification($post_id, $post) {
        // Skip if this is an auto-save, revision, or draft
        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
            return;
        }
        
        // Skip if post is not published
        if ($post->post_status !== 'publish') {
            return;
        }
        
        // Skip if REST API key is not configured
        if ($this->rest_api_key === 'YOUR_REST_API_KEY' || empty($this->rest_api_key)) {
            error_log('OneSignal: REST API key not configured');
            return;
        }
        
        // Check if notification was already sent for this post
        $notification_sent = get_post_meta($post_id, '_onesignal_notification_sent', true);
        if ($notification_sent) {
            return;
        }
        
        // Get post data
        $post_title = get_the_title($post_id);
        $post_url = get_permalink($post_id);
        $post_excerpt = get_the_excerpt($post_id);
        
        // Create notification content based on post type
        if ($post->post_type === 'post') {
            $heading = "New Blog Post: Texas Roadhouse Menu";
            $content = $post_title;
            $large_icon = "https://texasroadhouse-menus.us/favicon-192x192.png";
        } else {
            $heading = "Texas Roadhouse Menu Update";
            $content = $post_title;
            $large_icon = "https://texasroadhouse-menus.us/favicon-192x192.png";
        }
        
        // Prepare notification data
        $notification_data = array(
            'app_id' => $this->app_id,
            'included_segments' => array('All'),
            'headings' => array('en' => $heading),
            'contents' => array('en' => $content),
            'url' => $post_url,
            'large_icon' => $large_icon,
            'chrome_web_icon' => "https://texasroadhouse-menus.us/favicon-192x192.png",
            'firefox_icon' => "https://texasroadhouse-menus.us/favicon-192x192.png",
            'web_buttons' => array(
                array(
                    'id' => 'read-more-button',
                    'text' => 'Read Full Article',
                    'icon' => 'https://texasroadhouse-menus.us/favicon-32x32.png',
                    'url' => $post_url
                )
            ),
            'data' => array(
                'post_id' => $post_id,
                'post_type' => $post->post_type,
                'site_url' => 'https://texasroadhouse-menus.us'
            )
        );
        
        // Add excerpt if available
        if (!empty($post_excerpt)) {
            $notification_data['subtitle'] = array('en' => wp_trim_words($post_excerpt, 20));
        }
        
        // Send the notification
        $response = $this->send_notification($notification_data);
        
        // Log the response
        if ($response) {
            $response_body = json_decode($response, true);
            if (isset($response_body['id'])) {
                // Success - mark as sent
                update_post_meta($post_id, '_onesignal_notification_sent', true);
                update_post_meta($post_id, '_onesignal_notification_id', $response_body['id']);
                error_log('OneSignal: Notification sent successfully for post ' . $post_id . ' - ID: ' . $response_body['id']);
            } else {
                // Error
                error_log('OneSignal: Failed to send notification for post ' . $post_id . ' - Response: ' . $response);
            }
        }
    }
    
    /**
     * Send notification to OneSignal API
     */
    private function send_notification($data) {
        $headers = array(
            'Content-Type: application/json; charset=utf-8',
            'Authorization: Basic ' . $this->rest_api_key
        );
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->api_url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($http_code !== 200) {
            error_log('OneSignal: HTTP Error ' . $http_code . ' - Response: ' . $response);
            return false;
        }
        
        return $response;
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            'OneSignal Settings',
            'OneSignal Push',
            'manage_options',
            'onesignal-settings',
            array($this, 'options_page')
        );
    }
    
    /**
     * Initialize settings
     */
    public function settings_init() {
        register_setting('onesignal_settings', 'onesignal_rest_api_key');
        
        add_settings_section(
            'onesignal_section',
            'OneSignal Configuration',
            array($this, 'settings_section_callback'),
            'onesignal_settings'
        );
        
        add_settings_field(
            'onesignal_rest_api_key',
            'REST API Key',
            array($this, 'rest_api_key_render'),
            'onesignal_settings',
            'onesignal_section'
        );
    }
    
    /**
     * Settings section callback
     */
    public function settings_section_callback() {
        echo '<p>Configure your OneSignal REST API key to enable automatic push notifications.</p>';
        echo '<p>Get your REST API key from: <a href="https://app.onesignal.com" target="_blank">OneSignal Dashboard</a> → Settings → Keys & IDs</p>';
    }
    
    /**
     * REST API key field render
     */
    public function rest_api_key_render() {
        $value = get_option('onesignal_rest_api_key');
        echo '<input type="password" name="onesignal_rest_api_key" value="' . esc_attr($value) . '" size="50" />';
        echo '<p class="description">Your OneSignal REST API Key (keep this secure!)</p>';
    }
    
    /**
     * Options page
     */
    public function options_page() {
        ?>
        <div class="wrap">
            <h1>OneSignal Push Notifications</h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('onesignal_settings');
                do_settings_sections('onesignal_settings');
                submit_button();
                ?>
            </form>
            
            <div class="card">
                <h2>Test Notification</h2>
                <p>Send a test notification to all subscribers:</p>
                <?php if (isset($_POST['send_test'])): ?>
                    <?php
                    $test_data = array(
                        'app_id' => $this->app_id,
                        'included_segments' => array('All'),
                        'headings' => array('en' => 'Test Notification'),
                        'contents' => array('en' => 'This is a test notification from Texas Roadhouse Menus!'),
                        'url' => 'https://texasroadhouse-menus.us'
                    );
                    $response = $this->send_notification($test_data);
                    if ($response) {
                        echo '<div class="notice notice-success"><p>Test notification sent successfully!</p></div>';
                    } else {
                        echo '<div class="notice notice-error"><p>Failed to send test notification. Check your API key.</p></div>';
                    }
                    ?>
                <?php endif; ?>
                <form method="post">
                    <input type="hidden" name="send_test" value="1" />
                    <?php submit_button('Send Test Notification', 'secondary'); ?>
                </form>
            </div>
            
            <div class="card">
                <h2>App Configuration</h2>
                <table class="widefat">
                    <tr>
                        <td><strong>App ID:</strong></td>
                        <td><?php echo esc_html($this->app_id); ?></td>
                    </tr>
                    <tr>
                        <td><strong>Frontend URL:</strong></td>
                        <td>https://texasroadhouse-menus.us</td>
                    </tr>
                    <tr>
                        <td><strong>API Endpoint:</strong></td>
                        <td><?php echo esc_html($this->api_url); ?></td>
                    </tr>
                </table>
            </div>
        </div>
        <?php
    }
}

// Initialize the class
new TexasRoadhouseOneSignal();

/**
 * Manual function to send custom notifications
 * Usage: send_custom_onesignal_notification('Title', 'Message', 'https://url.com');
 */
function send_custom_onesignal_notification($title, $message, $url = '') {
    $onesignal = new TexasRoadhouseOneSignal();
    
    $data = array(
        'app_id' => '7629b842-fb4e-4821-a9dd-e60ca450a208',
        'included_segments' => array('All'),
        'headings' => array('en' => $title),
        'contents' => array('en' => $message),
        'url' => !empty($url) ? $url : 'https://texasroadhouse-menus.us'
    );
    
    return $onesignal->send_notification($data);
}

/**
 * Add OneSignal meta box to post editor
 */
add_action('add_meta_boxes', 'add_onesignal_meta_box');
function add_onesignal_meta_box() {
    add_meta_box(
        'onesignal-notification',
        'OneSignal Push Notification',
        'onesignal_meta_box_callback',
        array('post', 'page'),
        'side',
        'high'
    );
}

function onesignal_meta_box_callback($post) {
    $notification_sent = get_post_meta($post->ID, '_onesignal_notification_sent', true);
    $notification_id = get_post_meta($post->ID, '_onesignal_notification_id', true);
    
    echo '<p>';
    if ($notification_sent) {
        echo '<span style="color: green;">✓ Push notification sent</span>';
        if ($notification_id) {
            echo '<br><small>Notification ID: ' . esc_html($notification_id) . '</small>';
        }
    } else {
        echo '<span style="color: orange;">○ No notification sent yet</span>';
        echo '<br><small>Notification will be sent automatically when published</small>';
    }
    echo '</p>';
    
    // Add manual send button for published posts
    if ($post->post_status === 'publish' && !$notification_sent) {
        wp_nonce_field('send_manual_notification', 'onesignal_nonce');
        echo '<p><button type="submit" name="send_manual_notification" class="button">Send Notification Now</button></p>';
    }
}

// Handle manual notification sending
add_action('save_post', 'handle_manual_notification_send');
function handle_manual_notification_send($post_id) {
    if (isset($_POST['send_manual_notification']) && wp_verify_nonce($_POST['onesignal_nonce'], 'send_manual_notification')) {
        $post = get_post($post_id);
        $onesignal = new TexasRoadhouseOneSignal();
        $onesignal->send_post_notification($post_id, $post);
    }
}
