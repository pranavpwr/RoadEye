import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { getReports } from '../api/reports'

// Default marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function MapView({ center = [51.505, -0.09], zoom = 13 }) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-lg">
        <div className="text-gray-500">Loading map...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-lg">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="leaflet-container"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {reports.map((report) => (
        <Marker
          key={report._id}
          position={[report.location.lat, report.location.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-lg">{report.title}</h3>
              <p className="text-sm text-gray-600">{report.description}</p>
              <div className="mt-2">
                <span className={`badge badge-${report.status}`}>
                  {report.status}
                </span>
              </div>
              {report.images && report.images.length > 0 && (
                <div className="mt-2">
                  <img
                    src={report.images[0]}
                    alt={report.title}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
} 