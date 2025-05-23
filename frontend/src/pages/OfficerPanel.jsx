import { useState, useEffect } from 'react'
import { getOfficerDashboard, getOfficerReports } from '../api/officer'
import ReportCard from '../components/ReportCard'
import StatusBadge from '../components/StatusBadge'

export default function OfficerPanel() {
  const [dashboard, setDashboard] = useState(null)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, reportsRes] = await Promise.all([
          getOfficerDashboard(),
          getOfficerReports({ status: filter === 'all' ? undefined : filter }),
        ])
        setDashboard(dashboardRes.data)
        setReports(reportsRes.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load dashboard data')
        setLoading(false)
      }
    }

    fetchData()
  }, [filter])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Loading dashboard...</div>
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Officer Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-primary-50">
          <h3 className="text-lg font-medium text-primary-900">Total Reports</h3>
          <p className="text-3xl font-bold text-primary-600">
            {dashboard?.totalReports || 0}
          </p>
        </div>
        <div className="card bg-yellow-50">
          <h3 className="text-lg font-medium text-yellow-900">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {dashboard?.pendingReports || 0}
          </p>
        </div>
        <div className="card bg-blue-50">
          <h3 className="text-lg font-medium text-blue-900">In Progress</h3>
          <p className="text-3xl font-bold text-blue-600">
            {dashboard?.inProgressReports || 0}
          </p>
        </div>
        <div className="card bg-green-50">
          <h3 className="text-lg font-medium text-green-900">Resolved</h3>
          <p className="text-3xl font-bold text-green-600">
            {dashboard?.resolvedReports || 0}
          </p>
        </div>
      </div>

      {/* Reports Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`btn ${
                filter === 'all' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`btn ${
                filter === 'pending' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`btn ${
                filter === 'in-progress' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`btn ${
                filter === 'resolved' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))}
        </div>

        {reports.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No reports found</h3>
            <p className="mt-2 text-gray-500">
              There are no reports matching the current filter.
            </p>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="card">
          <div className="space-y-4">
            {dashboard?.recentActivity?.map((activity, index) => (
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
                {activity.status && (
                  <StatusBadge status={activity.status} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}