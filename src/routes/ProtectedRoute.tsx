import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  // Check if the auth token exists in the browser's local storage
  const token = localStorage.getItem('token')

  // Convert the token existence into a boolean (true if exists, false if null)
  const isAuthenticated = !!token

  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Render the protected component if authenticated
  return <Outlet />
}