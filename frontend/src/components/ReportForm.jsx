import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createReport } from '../api/reports'
import { toast } from 'react-toastify'

export default function ReportForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'pothole',
    location: {
      lat: 0,
      lng: 0,
    },
    images: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      images: files,
    }))
  }

  const handleLocationSelect = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      location: { lat, lng },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createReport(formData)
      toast.success('Report submitted successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input"
          placeholder="Brief description of the issue"
        />
      </div>

      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="input"
          placeholder="Detailed description of the road condition issue"
        />
      </div>

      <div>
        <label htmlFor="type" className="label">
          Issue Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="input"
        >
          <option value="pothole">Pothole</option>
          <option value="damage">Road Damage</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="label">Location</label>
        <div className="h-[300px] bg-gray-100 rounded-lg">
          {/* Map component will be added here */}
          <div className="flex items-center justify-center h-full text-gray-500">
            Click on the map to select location
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="images" className="label">
          Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="input"
        />
        <p className="mt-1 text-sm text-gray-500">
          Upload up to 5 images of the road condition
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </form>
  )
} 