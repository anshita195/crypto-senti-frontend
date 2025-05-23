import { useAuth0 } from '@auth0/auth0-react'

function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-600">Crypto Sentiment</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">{user.email}</span>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 