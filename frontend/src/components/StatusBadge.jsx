export default function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'badge-pending',
          icon: '⏳',
          label: 'Pending',
        }
      case 'in-progress':
        return {
          color: 'badge-in-progress',
          icon: '🔄',
          label: 'In Progress',
        }
      case 'resolved':
        return {
          color: 'badge-resolved',
          icon: '✅',
          label: 'Resolved',
        }
      case 'rejected':
        return {
          color: 'badge-rejected',
          icon: '❌',
          label: 'Rejected',
        }
      default:
        return {
          color: 'badge-pending',
          icon: '⏳',
          label: 'Pending',
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <span className={`badge ${config.color} flex items-center space-x-1`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  )
} 