import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const VerifyResetCode = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { verifyResetCode, sendPasswordResetCode } = useAuth()

  const email = localStorage.getItem('resetEmail') || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const result = await verifyResetCode(email, code)
    
    if (result.success) {
      setSuccess('Code vérifié avec succès!')
      setTimeout(() => {
        window.location.href = '/new-password'
      }, 1000)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const handleResendCode = async () => {
    setError('')
    setLoading(true)

    const result = await sendPasswordResetCode(email)
    
    if (result.success) {
      setSuccess('Nouveau code envoyé!')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6 shadow-2xl">
            <span className="text-white text-2xl font-bold">📧</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            VÉRIFICATION
          </h2>
          <p className="text-gray-600 text-lg">Entrez le code reçu par email</p>
          <p className="text-sm text-gray-500 mt-2">Envoyé à: {email}</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                Code de vérification
              </label>
              <input
                type="text"
                required
                maxLength="6"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm text-center text-2xl font-mono tracking-widest"
                placeholder="000000"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Code à 6 chiffres envoyé par email
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? 'Vérification...' : 'Vérifier le code'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={loading}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 disabled:opacity-50"
              >
                Renvoyer le code
              </button>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <Link 
                to="/forgot-password" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                ← Retour
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VerifyResetCode