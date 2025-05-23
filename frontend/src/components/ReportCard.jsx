import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

export default function ReportCard({ report }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'badge-pending'
      case 'in-progress':
        return 'badge-in-progress'
      case 'resolved':
        return 'badge-resolved'
      case 'rejected':
        return 'badge-rejected'
      default:
        return 'badge-pending'
    }
  }

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            <Link to={`/reports/${report._id}`} className="hover:text-primary-600">
              {report.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {report.description}
          </p>
        </div>
        <span className={`badge ${getStatusColor(report.status)}`}>
          {report.status}
        </span>
      </div>

      {report.images && report.images.length > 0 && (
        <div className="mt-4">
          <img
            src={report.images[0]}
            alt={report.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>
            <i className="fas fa-map-marker-alt mr-1" />
            {report.location.address || 'Location not specified'}
          </span>
          <span>
            <i className="fas fa-clock mr-1" />
            {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            <i className="fas fa-thumbs-up mr-1" />
            {report.upvotes || 0}
          </span>
          <span className="flex items-center">
            <i className="fas fa-comment mr-1" />
            {report.comments?.length || 0}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
              {report.reporter?.name?.charAt(0) || 'U'}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {report.reporter?.name || 'Anonymous'}
            </span>
          </div>
          <Link
            to={`/reports/${report._id}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
} 