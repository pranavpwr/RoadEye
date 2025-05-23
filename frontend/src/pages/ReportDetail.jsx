import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getReportById, updateReportStatus } from '../api/reports'
import { useAuth } from '../context/AuthContext'
import StatusBadge from '../components/StatusBadge'
import { toast } from 'react-toastify'

export default function ReportDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isOfficer } = useAuth()
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReportById(id)
        setReport(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load report details')
        setLoading(false)
      }
    }

    fetchReport()
  }, [id])

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateReportStatus(id, newStatus)
      setReport((prev) => ({ ...prev, status: newStatus }))
      toast.success('Status updated successfully')
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Loading report details...</div>
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{report.title}</h1>
          <StatusBadge status={report.status} />
        </div>

        <div className="card mb-8">
          <div className="prose max-w-none">
            <p className="text-gray-600">{report.description}</p>
          </div>

          {report.images && report.images.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Report image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  {report.reporter?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {report.reporter?.name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(report.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">
                  <i className="fas fa-map-marker-alt mr-1" />
                  {report.location.address || 'Location not specified'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isOfficer && (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Update Status</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => handleStatusUpdate('in-progress')}
                className="btn btn-primary"
                disabled={report.status === 'in-progress'}
              >
                Mark In Progress
              </button>
              <button
                onClick={() => handleStatusUpdate('resolved')}
                className="btn btn-primary"
                disabled={report.status === 'resolved'}
              >
                Mark Resolved
              </button>
              <button
                onClick={() => handleStatusUpdate('rejected')}
                className="btn btn-danger"
                disabled={report.status === 'rejected'}
              >
                Reject Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 