import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              RoadEye
            </Link>
            <p className="mt-4 text-gray-600">
              Helping communities report and track road conditions for safer
              transportation.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/submit-report"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Submit Report
                </Link>
              </li>
              <li>
                <Link
                  to="/stats"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Statistics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/privacy"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} RoadEye. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 