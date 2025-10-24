// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'

// const ChangePassword = () => {
//   const [formData, setFormData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   })
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')
//   const [loading, setLoading] = useState(false)
//   const { user } = useAuth()
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setSuccess('')
//     setLoading(true)

//     // Validation
//     if (formData.newPassword !== formData.confirmPassword) {
//       setError('Les nouveaux mots de passe ne correspondent pas')
//       setLoading(false)
//       return
//     }

//     if (formData.currentPassword === formData.newPassword) {
//       setError('Le nouveau mot de passe doit être différent de l\'actuel')
//       setLoading(false)
//       return
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/auth/change-password/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({
//           current_password: formData.currentPassword,
//           new_password: formData.newPassword
//         })
//       })

//       const result = await response.json()

//       if (response.ok) {
//         setSuccess('Mot de passe changé avec succès! Un email de confirmation a été envoyé.')
//         setFormData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         })
//         setTimeout(() => {
//           navigate('/dashboard')
//         }, 3000)
//       } else {
//         setError(result.error || 'Erreur lors du changement de mot de passe')
//       }
//     } catch (err) {
//       setError('Erreur de connexion au serveur')
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 px-4 py-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <div className="mx-auto h-20 w-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6 shadow-2xl">
//             <span className="text-white text-2xl font-bold">🔒</span>
//           </div>
//           <h2 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//             CHANGER MOT DE PASSE
//           </h2>
//           <p className="text-gray-600 text-lg">Mettez à jour votre mot de passe</p>
//           <p className="text-sm text-gray-500 mt-2">Connecté en tant que : {user?.email}</p>
//         </div>

//         <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
//                 {error}
//               </div>
//             )}

//             {success && (
//               <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm">
//                 {success}
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Mot de passe actuel
//               </label>
//               <input
//                 type="password"
//                 name="currentPassword"
//                 required
//                 value={formData.currentPassword}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
//                 placeholder="Votre mot de passe actuel"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Nouveau mot de passe
//               </label>
//               <input
//                 type="password"
//                 name="newPassword"
//                 required
//                 value={formData.newPassword}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
//                 placeholder="Votre nouveau mot de passe"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Confirmer le nouveau mot de passe
//               </label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
//                 placeholder="Confirmez votre nouveau mot de passe"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
//             >
//               {loading ? 'Changement...' : 'Changer le mot de passe'}
//             </button>

//             <div className="text-center pt-4 border-t border-gray-200">
//               <Link 
//                 to="/dashboard" 
//                 className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
//               >
//                 ← Retour au dashboard
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ChangePassword

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ChangePassword = () => {
  const [step, setStep] = useState(1) // 1: Demande, 2: Confirmation
  const [confirmationCode, setConfirmationCode] = useState('')
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Étape 1: Demander la confirmation par email
  const handleRequestChange = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/auth/request-password-change/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({})
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess('Un code de confirmation a été envoyé à votre email')
        setStep(2)
      } else {
        setError(result.error || 'Erreur lors de la demande de changement')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
    }
    setLoading(false)
  }

  // Étape 2: Confirmer et changer le mot de passe
  const handleConfirmAndChange = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    if (formData.currentPassword === formData.newPassword) {
      setError('Le nouveau mot de passe doit être différent de l\'actuel')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/confirm-and-change-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          confirmation_code: confirmationCode,
          current_password: formData.currentPassword,
          new_password: formData.newPassword
        })
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess('Mot de passe changé avec succès!')
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      } else {
        setError(result.error || 'Erreur lors du changement de mot de passe')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6 shadow-2xl">
            <span className="text-white text-2xl font-bold">🔒</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            CHANGER MOT DE PASSE
          </h2>
          <p className="text-gray-600 text-lg">
            {step === 1 ? 'Démarrez le processus sécurisé' : 'Confirmez et changez votre mot de passe'}
          </p>
          <p className="text-sm text-gray-500 mt-2">Connecté en tant que : {user?.email}</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Étape 1: Demande initiale */}
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleRequestChange}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Pour sécuriser le changement de mot de passe, vous recevrez un code de confirmation par email.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Envoi en cours...' : 'Recevoir le code de confirmation'}
              </button>
            </form>
          )}

          {/* Étape 2: Confirmation et changement */}
          {step === 2 && (
            <form className="space-y-6" onSubmit={handleConfirmAndChange}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm">
                  {success}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code de confirmation
                </label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm text-center text-2xl font-mono tracking-widest"
                  placeholder="000000"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Code à 6 chiffres envoyé à {user?.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  required
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="Votre mot de passe actuel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="Votre nouveau mot de passe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="Confirmez votre nouveau mot de passe"
                />
              </div>

              <button
                type="submit"
                disabled={loading || confirmationCode.length !== 6}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Changement...' : 'Confirmer et changer le mot de passe'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  ← Renvoyer le code
                </button>
              </div>
            </form>
          )}

          <div className="text-center pt-4 border-t border-gray-200">
            <Link 
              to="/dashboard" 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              ← Retour au dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword