
// import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider, useAuth } from './contexts/AuthContext'
// import Login from './components/Login'
// import Register from './components/Register'
// import UserDashboard from './components/UserDashboard'
// import AdminDashboard from './components/AdminDashboard'
// import ForgotPassword from './components/ForgotPassword.jsx'
// import VerifyResetCode from './components/VerifyResetCode.jsx'
// import NewPassword from './components/NewPassword.jsx'

// function ProtectedRoute({ children, adminOnly = false }) {
//   const { user, isAdmin, loading } = useAuth()
  
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Chargement...</p>
//         </div>
//       </div>
//     )
//   }
  
//   if (!user) {
//     return <Navigate to="/login" />
//   }
  
//   if (adminOnly && !isAdmin) {
//     return <Navigate to="/dashboard" />
//   }
  
//   return children
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//           <Routes>
//             <Route path="/" element={<Navigate to="/login" />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             {/*  NOUVELLES ROUTES PASSWORD RESET  */}
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/verify-reset-code" element={<VerifyResetCode />} />
//             <Route path="/new-password" element={<NewPassword />} />
            
//             <Route 
//               path="/dashboard" 
//               element={
//                 <ProtectedRoute>
//                   <UserDashboard />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin" 
//               element={
//                 <ProtectedRoute adminOnly={true}>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               } 
//             />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   )
// }

// export default App

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Register from './components/Register'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import ForgotPassword from './components/ForgotPassword'
import VerifyResetCode from './components/VerifyResetCode'
import NewPassword from './components/NewPassword'
import ChangePassword from './components/ChangePassword'  // ⭐ AJOUTE CET IMPORT

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" />
  }
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-reset-code" element={<VerifyResetCode />} />
            <Route path="/new-password" element={<NewPassword />} />
            
            {/* ⭐⭐ AJOUTE CETTE ROUTE ⭐⭐ */}
            <Route 
              path="/change-password" 
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App