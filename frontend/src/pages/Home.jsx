import { useState, useEffect } from 'react'
import MapView from '../components/MapView'
import ReportCard from '../components/ReportCard'
import { getReports } from '../api/reports'

export default function Home() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [view, setView] = useState('map') // 'map' or 'list'

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReports()
        setReports(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load reports')
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Loading reports...</div>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Road Reports</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setView('map')}
            className={`btn ${
              view === 'map' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setView('list')}
            className={`btn ${
              view === 'list' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {view === 'map' ? (
        <div className="mb-8">
          <MapView reports={reports} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))}
        </div>
      )}

      {reports.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No reports found</h3>
          <p className="mt-2 text-gray-500">
            Be the first to report a road condition issue in your area.
          </p>
        </div>
      )}
    </div>
  )
} 