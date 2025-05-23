import { useState, useEffect } from 'react'
import { getReportStats } from '../api/reports'

export default function Stats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getReportStats()
        setStats(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load statistics')
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Loading statistics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Road Report Statistics</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-primary-50">
          <h3 className="text-lg font-medium text-primary-900">Total Reports</h3>
          <p className="text-3xl font-bold text-primary-600">
            {stats?.totalReports || 0}
          </p>
        </div>
        <div className="card bg-yellow-50">
          <h3 className="text-lg font-medium text-yellow-900">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {stats?.pendingReports || 0}
          </p>
        </div>
        <div className="card bg-blue-50">
          <h3 className="text-lg font-medium text-blue-900">In Progress</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.inProgressReports || 0}
          </p>
        </div>
        <div className="card bg-green-50">
          <h3 className="text-lg font-medium text-green-900">Resolved</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats?.resolvedReports || 0}
          </p>
        </div>
      </div>

      {/* Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Report Types</h2>
          <div className="space-y-4">
            {stats?.reportTypes?.map((type) => (
              <div key={type.name} className="flex items-center justify-between">
                <span className="text-gray-600">{type.name}</span>
                <span className="font-medium text-gray-900">{type.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Status Distribution</h2>
          <div className="space-y-4">
            {stats?.statusDistribution?.map((status) => (
              <div key={status.name} className="flex items-center justify-between">
                <span className="text-gray-600">{status.name}</span>
                <span className="font-medium text-gray-900">{status.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {stats?.recentActivity?.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600">
                    {activity.type === 'report' ? '📝' : '🔄'}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 