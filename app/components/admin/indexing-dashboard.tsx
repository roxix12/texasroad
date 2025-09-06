'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, CheckCircle, XCircle, Clock, Globe, Database, Zap } from 'lucide-react'

interface IndexingStatus {
  google_indexing_enabled: boolean
  site_url: string
  last_sitemap_update?: string
  recent_indexing_requests?: Array<{
    url: string
    timestamp: string
    success: boolean
    message: string
  }>
}

interface IndexingStats {
  total_urls_indexed_today: number
  success_rate_24h: number
  pending_urls: number
  last_successful_index: string
}

export function IndexingDashboard() {
  const [status, setStatus] = useState<IndexingStatus | null>(null)
  const [stats, setStats] = useState<IndexingStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)

  useEffect(() => {
    fetchIndexingStatus()
  }, [])

  const fetchIndexingStatus = async () => {
    try {
      setLoading(true)
      
      // Fetch status from multiple endpoints
      const [autoIndexStatus, reindexStatus] = await Promise.all([
        fetch('/api/auto-index?action=status').then(r => r.json()).catch(() => null),
        fetch('/api/reindex').then(r => r.json()).catch(() => null)
      ])

      setStatus({
        google_indexing_enabled: autoIndexStatus?.configuration?.google_indexing_enabled || false,
        site_url: autoIndexStatus?.configuration?.site_url || 'https://texasroadhouse-menus.us',
        last_sitemap_update: new Date().toISOString(),
        recent_indexing_requests: []
      })

      // Mock stats for demo - in production, these would come from a database
      setStats({
        total_urls_indexed_today: 12,
        success_rate_24h: 94.5,
        pending_urls: 3,
        last_successful_index: new Date(Date.now() - 1000 * 60 * 15).toISOString()
      })

    } catch (error) {
      console.error('Failed to fetch indexing status:', error)
    } finally {
      setLoading(false)
    }
  }

  const testGoogleIndexing = async () => {
    setTesting(true)
    setTestResults(null)

    try {
      const response = await fetch('/api/reindex', {
        method: 'GET'
      })
      
      const result = await response.json()
      setTestResults(result)
      
    } catch (error) {
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : 'Test failed'
      })
    } finally {
      setTesting(false)
    }
  }

  const triggerSitemapRevalidation = async () => {
    try {
      const response = await fetch('/api/revalidate-sitemap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'manual_trigger',
          trigger_type: 'admin_dashboard'
        })
      })

      const result = await response.json()
      
      if (result.success) {
        alert('✅ Sitemap revalidation triggered successfully!')
        fetchIndexingStatus() // Refresh status
      } else {
        alert('❌ Failed to trigger revalidation: ' + result.message)
      }
    } catch (error) {
      alert('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const bulkReindex = async () => {
    if (!confirm('This will submit all main pages to Google for indexing. Continue?')) {
      return
    }

    try {
      const response = await fetch('/api/reindex', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'bulk'
        })
      })

      const result = await response.json()
      
      if (result.success) {
        alert(`✅ Bulk reindex completed: ${result.message}`)
        fetchIndexingStatus() // Refresh status
      } else {
        alert('❌ Bulk reindex failed: ' + result.message)
      }
    } catch (error) {
      alert('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <RefreshCw className="w-6 h-6 animate-spin text-texas-yellow mr-2" />
          <span>Loading indexing status...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-stone-900 flex items-center">
            <Globe className="w-6 h-6 text-texas-yellow mr-2" />
            Indexing Dashboard
          </h2>
          <button
            onClick={fetchIndexingStatus}
            className="flex items-center px-4 py-2 bg-texas-yellow text-texas-black rounded-lg hover:bg-texas-yellow/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-stone-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Google Indexing</p>
                <p className="text-lg font-semibold">
                  {status?.google_indexing_enabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              {status?.google_indexing_enabled ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <XCircle className="w-8 h-8 text-red-500" />
              )}
            </div>
          </div>

          <div className="bg-stone-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">URLs Indexed Today</p>
                <p className="text-lg font-semibold">{stats?.total_urls_indexed_today || 0}</p>
              </div>
              <Zap className="w-8 h-8 text-texas-yellow" />
            </div>
          </div>

          <div className="bg-stone-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Success Rate (24h)</p>
                <p className="text-lg font-semibold">{stats?.success_rate_24h || 0}%</p>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                (stats?.success_rate_24h || 0) > 90 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-stone-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Pending URLs</p>
                <p className="text-lg font-semibold">{stats?.pending_urls || 0}</p>
              </div>
              <Clock className="w-8 h-8 text-orange" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={testGoogleIndexing}
            disabled={testing}
            className="flex items-center justify-center px-6 py-3 bg-texas-green text-white rounded-lg hover:bg-texas-green/90 transition-colors disabled:opacity-50"
          >
            {testing ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            Test Google Indexing
          </button>

          <button
            onClick={triggerSitemapRevalidation}
            className="flex items-center justify-center px-6 py-3 bg-texas-yellow text-texas-black rounded-lg hover:bg-texas-yellow/90 transition-colors"
          >
            <Database className="w-4 h-4 mr-2" />
            Revalidate Sitemap
          </button>

          <button
            onClick={bulkReindex}
            className="flex items-center justify-center px-6 py-3 bg-texas-red text-white rounded-lg hover:bg-texas-red/90 transition-colors"
          >
            <Globe className="w-4 h-4 mr-2" />
            Bulk Reindex
          </button>
        </div>

        {/* Test Results */}
        {testResults && (
          <div className={`p-4 rounded-lg mb-6 ${
            testResults.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              {testResults.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mr-2" />
              )}
              <span className={`font-semibold ${
                testResults.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {testResults.success ? 'Test Successful!' : 'Test Failed'}
              </span>
            </div>
            <p className={`mt-2 text-sm ${
              testResults.success ? 'text-green-700' : 'text-red-700'
            }`}>
              {testResults.message || testResults.error}
            </p>
          </div>
        )}

        {/* Configuration Info */}
        <div className="bg-stone-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-stone-900 mb-4">Configuration</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-600">Site URL:</span>
              <span className="font-mono">{status?.site_url}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Sitemap URL:</span>
              <span className="font-mono">{status?.site_url}/sitemap.xml</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Last Sitemap Update:</span>
              <span>{status?.last_sitemap_update ? new Date(status.last_sitemap_update).toLocaleString() : 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Last Successful Index:</span>
              <span>{stats?.last_successful_index ? new Date(stats.last_successful_index).toLocaleString() : 'Unknown'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
