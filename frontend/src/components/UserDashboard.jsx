import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const UserDashboard = () => {
  const { user, logout, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postal_code: user?.postal_code || '',
    country: user?.country || ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const result = await updateProfile(formData)
    if (result.success) {
      setMessage('Profil mis à jour avec succès!')
      setIsEditing(false)
    } else {
      setMessage('Erreur lors de la mise à jour')
    }
    setLoading(false)
  }

  const handleLogout = () => {
    logout()
  }

  const startEditing = () => {
    setFormData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      postal_code: user?.postal_code || '',
      country: user?.country || ''
    })
    setIsEditing(true)
    setMessage('')
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-2xl">
            <span className="text-white text-2xl"> </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Mon Tableau de Bord
          </h1>
          <p className="text-gray-600 text-lg">Gérez vos informations personnelles</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-sm ${
            message.includes('Erreur') 
              ? 'bg-red-50 border border-red-200 text-red-600'
              : 'bg-green-50 border border-green-200 text-green-600'
          }`}>
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-xl font-bold">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {user?.first_name} {user?.last_name}
                </h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <p className="text-blue-600 text-sm font-medium mt-2">
                  Membre depuis {new Date(user?.date_joined).toLocaleDateString('fr-FR')}
                </p>
              </div>

              <div className="space-y-3">
                  <button
    onClick={() => window.location.href = '/change-password'}
    className="w-full bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
  >
    Changer le mot de passe
  </button>

                {!isEditing ? (
                  <button
                    onClick={startEditing}
                    className="w-full bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Modifier le profil
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="submit"                              
                      form="profile-form"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      Annuler
                    </button>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all duration-300 font-medium"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {isEditing ? 'Modifier mes informations' : 'Mes Informations'}
              </h2>
              
              <form id="profile-form" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {user?.first_name || 'Non renseigné'}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {user?.last_name || 'Non renseigné'}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {user?.email || 'Non renseigné'}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {user?.phone || 'Non renseigné'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                      {isEditing ? (
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {user?.address || 'Non renseigné'}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {user?.city || 'Non renseigné'}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="postal_code"
                          value={formData.postal_code}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {user?.postal_code || 'Non renseigné'}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pays</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          {user?.country || 'Non renseigné'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard