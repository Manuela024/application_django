
// import React, { useState, useEffect } from 'react'
// import { useAuth } from '../contexts/AuthContext'
// import axios from 'axios'

// const AdminDashboard = () => {
//   const { user, logout } = useAuth()
//   const [users, setUsers] = useState([])
//   const [editingUser, setEditingUser] = useState(null)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [loading, setLoading] = useState(true)

//   // Charger les utilisateurs depuis l'API Django
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/auth/users/')
//       setUsers(response.data)
//     } catch (error) {
//       console.error('Erreur lors du chargement des utilisateurs:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   // Filtrer les utilisateurs selon la recherche
//   const filteredUsers = users.filter(u =>
//     u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (u.first_name && u.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (u.last_name && u.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
//   )

//   const handleEdit = (user) => {
//     setEditingUser({ ...user })
//   }

//   const handleSave = async () => {
//     if (editingUser) {
//       try {
//         await axios.patch(`http://localhost:8000/api/auth/profile/`, editingUser)
//         await fetchUsers() // Recharger la liste
//         setEditingUser(null)
//       } catch (error) {
//         console.error('Erreur lors de la modification:', error)
//         alert('Erreur lors de la modification de l\'utilisateur')
//       }
//     }
//   }

//   const handleDelete = async (userId) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
//       try {
//         await axios.delete(`http://localhost:8000/api/auth/users/${userId}/delete/`)
//         await fetchUsers() // Recharger la liste
//       } catch (error) {
//         console.error('Erreur lors de la suppression:', error)
//         alert('Erreur lors de la suppression de l\'utilisateur')
//       }
//     }
//   }

//   const handleLogout = () => {
//     logout()
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-2xl">
//             <span className="text-white text-2xl">👑</span>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Dashboard Administrateur
//           </h1>
//           <p className="text-gray-600 text-lg">Gestion des utilisateurs</p>
//         </div>

//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 space-y-6">
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <span className="text-white text-xl font-bold">
//                     {user?.first_name?.[0]}{user?.last_name?.[0]}
//                   </span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900">{user?.first_name} {user?.last_name}</h3>
//                 <p className="text-gray-600 text-sm">{user?.email}</p>
//                 <p className="text-green-600 text-sm font-medium mt-2">
//                   {users.length} utilisateur(s)
//                 </p>
//               </div>

//               <div className="space-y-3">
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-3 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all duration-300 font-medium"
//                 >
//                   Se déconnecter
//                 </button>
//               </div>

//               {/* Statistiques */}
//               <div className="bg-gray-50 rounded-xl p-4">
//                 <h4 className="font-semibold text-gray-900 mb-3">Statistiques</h4>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total utilisateurs:</span>
//                     <span className="font-semibold">{users.length}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Utilisateurs actifs:</span>
//                     <span className="font-semibold text-green-600">{users.length}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
//               {/* Barre de recherche */}
//               <div className="mb-6">
//                 <input
//                   type="text"
//                   placeholder="Rechercher un utilisateur..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>

//               {loading ? (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
//                   <p className="text-gray-600 mt-4">Chargement des utilisateurs...</p>
//                 </div>
//               ) : (
//                 /* Liste des utilisateurs */
//                 <div className="overflow-hidden rounded-xl border border-gray-200">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Utilisateur
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Email
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Téléphone
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Date d'inscription
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {filteredUsers.map((userItem) => (
//                         <tr key={userItem.id} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//                                 <span className="text-white text-sm font-bold">
//                                   {userItem.first_name?.[0]}{userItem.last_name?.[0]}
//                                 </span>
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {userItem.first_name} {userItem.last_name}
//                                 </div>
//                                 <div className="text-sm text-gray-500">
//                                   @{userItem.username}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{userItem.email}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">
//                               {userItem.phone || 'Non renseigné'}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {new Date(userItem.date_joined).toLocaleDateString('fr-FR')}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                             <button
//                               onClick={() => handleEdit(userItem)}
//                               className="text-indigo-600 hover:text-indigo-900 font-medium px-3 py-1 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
//                             >
//                               Modifier
//                             </button>
//                             <button
//                               onClick={() => handleDelete(userItem.id)}
//                               className="text-red-600 hover:text-red-900 font-medium px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
//                             >
//                               Supprimer
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>

//                   {filteredUsers.length === 0 && (
//                     <div className="text-center py-8 text-gray-500">
//                       {searchTerm ? 'Aucun utilisateur trouvé' : 'Aucun utilisateur'}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal d'édition */}
//       {editingUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Modifier l'utilisateur</h3>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
//                 <input
//                   type="text"
//                   value={editingUser.first_name || ''}
//                   onChange={(e) => setEditingUser({...editingUser, first_name: e.target.value})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
//                 <input
//                   type="text"
//                   value={editingUser.last_name || ''}
//                   onChange={(e) => setEditingUser({...editingUser, last_name: e.target.value})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   value={editingUser.email || ''}
//                   onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
//                 <input
//                   type="tel"
//                   value={editingUser.phone || ''}
//                   onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="flex space-x-3 mt-6">
//               <button
//                 onClick={handleSave}
//                 className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
//               >
//                 Enregistrer
//               </button>
//               <button
//                 onClick={() => setEditingUser(null)}
//                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
//               >
//                 Annuler
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AdminDashboard
import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('users')

  // Charger les utilisateurs depuis l'API Django
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/users/')
      setUsers(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Filtrer les utilisateurs selon la recherche
  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.first_name && u.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (u.last_name && u.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleEdit = (user) => {
    setEditingUser({ ...user })
  }

  const handleSave = async () => {
    if (editingUser) {
      try {
        await axios.patch(`http://localhost:8000/api/auth/profile/`, editingUser)
        await fetchUsers()
        setEditingUser(null)
      } catch (error) {
        console.error('Erreur lors de la modification:', error)
        alert('Erreur lors de la modification de l\'utilisateur')
      }
    }
  }

  const handleDelete = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`http://localhost:8000/api/auth/users/${userId}/delete/`)
        await fetchUsers()
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert('Erreur lors de la suppression de l\'utilisateur')
      }
    }
  }

  const handleLogout = () => {
    logout()
  }

  // Statistiques
  const totalUsers = users.length
  const activeUsers = users.length
  const recentUsers = users.filter(u => {
    const userDate = new Date(u.date_joined)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return userDate > weekAgo
  }).length

  // Icônes SVG en BLANC
  const UsersIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  )

  const ActiveUsersIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  const NewUsersIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  )

  const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )

  const AdminIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )

  const EmptyUsersIcon = () => (
    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  )

  // NOUVELLES ICÔNES pour les boutons
  const EditIcon = () => (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  )

  const DeleteIcon = () => (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )

  const LogoutIcon = () => (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <AdminIcon />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Gestion des utilisateurs</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-gray-500">Administrateur</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <UsersIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                <ActiveUsersIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
                <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <NewUsersIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Nouveaux (7j)</p>
                <p className="text-2xl font-bold text-gray-900">{recentUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'users'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Utilisateurs
                </button>
              </div>
              
              <div className="flex space-x-3">
                <div className="relative flex-1 sm:flex-none">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
                  />
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
                >
                  <LogoutIcon />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
                <p className="text-gray-600">Chargement des utilisateurs...</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inscription
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((userItem) => (
                    <tr key={userItem.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-sm">
                              {userItem.first_name?.[0]}{userItem.last_name?.[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {userItem.first_name} {userItem.last_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              @{userItem.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{userItem.email}</div>
                        <div className="text-sm text-gray-500">
                          {userItem.phone || 'Aucun téléphone'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(userItem.date_joined).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(userItem.date_joined).toLocaleTimeString('fr-FR')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Actif
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleEdit(userItem)}
                            className="flex items-center text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors font-medium min-w-[100px] justify-center"
                          >
                            <EditIcon />
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(userItem.id)}
                            className="flex items-center text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors font-medium min-w-[100px] justify-center"
                          >
                            <DeleteIcon />
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!loading && filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <EmptyUsersIcon />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'Aucun utilisateur trouvé' : 'Aucun utilisateur'}
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  {searchTerm 
                    ? 'Aucun utilisateur ne correspond à votre recherche. Essayez avec d\'autres termes.'
                    : 'Commencez par ajouter des utilisateurs à votre plateforme.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal d'édition */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Modifier l'utilisateur</h3>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  value={editingUser.first_name || ''}
                  onChange={(e) => setEditingUser({...editingUser, first_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={editingUser.last_name || ''}
                  onChange={(e) => setEditingUser({...editingUser, last_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingUser.email || ''}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex space-x-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                Enregistrer
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard