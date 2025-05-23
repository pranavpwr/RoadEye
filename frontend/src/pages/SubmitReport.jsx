import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { Icon } from 'leaflet'
import ReportForm from '../components/ReportForm'
import { createReport } from '../api/reports'
import { toast } from 'react-toastify'

const markerIcon = new Icon({
  iconUrl: '/marker-icons/report.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null)

  useMapEvents({
    click(e) {
      setPosition(e.latlng)
      onLocationSelect(e.latlng.lat, e.latlng.lng)
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={markerIcon} />
  )
}

export default function SubmitReport() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)

  const handleLocationSelect = (lat, lng) => {
    setSelectedLocation({ lat, lng })
  }

  const handleSubmit = async (formData) => {
    if (!selectedLocation) {
      toast.error('Please select a location on the map')
      return
    }

    setLoading(true)
    try {
      const reportData = {
        ...formData,
        location: selectedLocation,
      }
      await createReport(reportData)
      toast.success('Report submitted successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Submit Road Report
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Select Location
            </h2>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                className="h-full w-full"
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onLocationSelect={handleLocationSelect} />
              </MapContainer>
            </div>
            {selectedLocation && (
              <p className="mt-2 text-sm text-gray-600">
                Selected location: {selectedLocation.lat.toFixed(6)},{' '}
                {selectedLocation.lng.toFixed(6)}
              </p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Report Details
            </h2>
            <ReportForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
} 