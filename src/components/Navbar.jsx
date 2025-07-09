import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold text-primary-600">Crypto Sentiment</span>
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`text-gray-700 hover:text-primary-600 font-medium ${location.pathname === '/' ? 'underline' : ''}`}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 