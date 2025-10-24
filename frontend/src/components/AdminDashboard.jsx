
// // import React, { useState, useEffect } from 'react'
// // import { useAuth } from '../contexts/AuthContext'
// // import axios from 'axios'

// // const AdminDashboard = () => {
// //   const { user, logout } = useAuth()
// //   const [users, setUsers] = useState([])
// //   const [editingUser, setEditingUser] = useState(null)
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [loading, setLoading] = useState(true)
// //   const [activeTab, setActiveTab] = useState('users')
  
// //   // ÉTAT POUR L'AJOUT D'UTILISATEUR
// //   const [showAddModal, setShowAddModal] = useState(false)
// //   const [newUser, setNewUser] = useState({
// //     username: '',
// //     email: '',
// //     first_name: '',
// //     last_name: '',
// //     phone: '',
// //     password: '',
// //     confirm_password: ''
// //   })
// //   const [addingUser, setAddingUser] = useState(false)

// //   // Charger les utilisateurs depuis l'API Django
// //   const fetchUsers = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:8000/api/auth/users/')
// //       setUsers(response.data)
// //     } catch (error) {
// //       console.error('Erreur lors du chargement des utilisateurs:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     fetchUsers()
// //   }, [])

// //   // Filtrer les utilisateurs selon la recherche
// //   const filteredUsers = users.filter(u =>
// //     u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     (u.first_name && u.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //     (u.last_name && u.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
// //   )

// //   const handleEdit = (user) => {
// //     setEditingUser({ ...user })
// //   }

// //   const handleSave = async () => {
// //     if (editingUser) {
// //       try {
// //         await axios.patch(`http://localhost:8000/api/auth/profile/`, editingUser)
// //         await fetchUsers()
// //         setEditingUser(null)
// //       } catch (error) {
// //         console.error('Erreur lors de la modification:', error)
// //         alert('Erreur lors de la modification de l\'utilisateur')
// //       }
// //     }
// //   }

// //   const handleDelete = async (userId) => {
// //     if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
// //       try {
// //         await axios.delete(`http://localhost:8000/api/auth/users/${userId}/delete/`)
// //         await fetchUsers()
// //       } catch (error) {
// //         console.error('Erreur lors de la suppression:', error)
// //         alert('Erreur lors de la suppression de l\'utilisateur')
// //       }
// //     }
// //   }


// //  const handleAddUser = async () => {
// //   if (newUser.password !== newUser.confirm_password) {
// //     alert('Les mots de passe ne correspondent pas')
// //     return
// //   }

// //   // Validation du mot de passe
// //   if (newUser.password.length < 8) {
// //     alert('Le mot de passe doit contenir au moins 8 caractères')
// //     return
// //   }

// //   setAddingUser(true)
// //   try {
// //     const userData = {
// //       username: newUser.username,
// //       email: newUser.email,
// //       password: newUser.password,
// //       password2: newUser.confirm_password,
// //       first_name: newUser.first_name || '',
// //       last_name: newUser.last_name || '',
// //       phone: newUser.phone || ''
// //     }

// //     console.log('📤 Données envoyées:', userData)

// //     const response = await axios.post('http://localhost:8000/api/auth/register/', userData)

// //     console.log('✅ Réponse API:', response.data)

// //     if (response.status === 201) {
// //       setShowAddModal(false)
// //       setNewUser({
// //         username: '',
// //         email: '',
// //         first_name: '',
// //         last_name: '',
// //         phone: '',
// //         password: '',
// //         confirm_password: ''
// //       })
// //       await fetchUsers()
// //       alert('Utilisateur créé avec succès!')
// //     }
// //   } catch (error) {
// //     console.error('❌ Erreur création utilisateur:', error)
// //     if (error.response?.data) {
// //       // Affiche les erreurs de validation Django
// //       const errors = error.response.data
// //       let errorMessage = 'Erreurs de validation:\n'
      
// //       for (const field in errors) {
// //         if (Array.isArray(errors[field])) {
// //           errorMessage += `• ${field}: ${errors[field].join(', ')}\n`
// //         } else {
// //           errorMessage += `• ${field}: ${errors[field]}\n`
// //         }
// //       }
// //       alert(errorMessage)
// //     } else {
// //       alert('Erreur de connexion au serveur')
// //     }
// //   } finally {
// //     setAddingUser(false)
// //   }
// // }

// //   const handleLogout = () => {
// //     logout()
// //   }

// //   // Statistiques
// //   const totalUsers = users.length
// //   const activeUsers = users.length
// //   const recentUsers = users.filter(u => {
// //     const userDate = new Date(u.date_joined)
// //     const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
// //     return userDate > weekAgo
// //   }).length

// //   // Icônes SVG en BLANC
// //   const UsersIcon = () => (
// //     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
// //     </svg>
// //   )

// //   const ActiveUsersIcon = () => (
// //     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //     </svg>
// //   )

// //   const NewUsersIcon = () => (
// //     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
// //     </svg>
// //   )

// //   const SearchIcon = () => (
// //     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //     </svg>
// //   )

// //   const AdminIcon = () => (
// //     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// //     </svg>
// //   )

// //   const EmptyUsersIcon = () => (
// //     <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
// //     </svg>
// //   )

// //   // NOUVELLES ICÔNES pour les boutons
// //   const EditIcon = () => (
// //     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// //     </svg>
// //   )

// //   const DeleteIcon = () => (
// //     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
// //     </svg>
// //   )

// //   const LogoutIcon = () => (
// //     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
// //     </svg>
// //   )

// //   // Icône pour le bouton Ajouter
// //   const AddIcon = () => (
// //     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //     </svg>
// //   )

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
// //       {/* Header Navigation */}
// //       <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             <div className="flex items-center space-x-3">
// //               <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
// //                 <AdminIcon />
// //               </div>
// //               <div>
// //                 <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
// //                 <p className="text-sm text-gray-500">Gestion des utilisateurs</p>
// //               </div>
// //             </div>
            
// //             <div className="flex items-center space-x-4">
// //               <div className="text-right">
// //                 <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
// //                 <p className="text-xs text-gray-500">Administrateur</p>
// //               </div>
// //               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
// //                 <span className="text-white font-bold text-sm">
// //                   {user?.first_name?.[0]}{user?.last_name?.[0]}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Dashboard Stats */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //             <div className="flex items-center">
// //               <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
// //                 <UsersIcon />
// //               </div>
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
// //                 <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //             <div className="flex items-center">
// //               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
// //                 <ActiveUsersIcon />
// //               </div>
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
// //                 <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //             <div className="flex items-center">
// //               <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
// //                 <NewUsersIcon />
// //               </div>
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Nouveaux (7j)</p>
// //                 <p className="text-2xl font-bold text-gray-900">{recentUsers}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
// //           {/* Toolbar */}
// //           <div className="px-6 py-4 border-b border-gray-200">
// //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
// //               <div className="flex space-x-2">
// //                 <button
// //                   onClick={() => setActiveTab('users')}
// //                   className={`px-4 py-2 rounded-lg font-medium transition-colors ${
// //                     activeTab === 'users'
// //                       ? 'bg-indigo-100 text-indigo-700'
// //                       : 'text-gray-600 hover:text-gray-900'
// //                   }`}
// //                 >
// //                   Utilisateurs
// //                 </button>
                
// //                 {/* BOUTON AJOUTER */}
// //                 <button
// //                   onClick={() => setShowAddModal(true)}
// //                   className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
// //                 >
// //                   <AddIcon />
// //                   Ajouter
// //                 </button>
// //               </div>
              
// //               <div className="flex space-x-3">
// //                 <div className="relative flex-1 sm:flex-none">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <SearchIcon />
// //                   </div>
// //                   <input
// //                     type="text"
// //                     placeholder="Rechercher un utilisateur..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
// //                   />
// //                 </div>
                
// //                 <button
// //                   onClick={handleLogout}
// //                   className="flex items-center px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
// //                 >
// //                   <LogoutIcon />
// //                   Déconnexion
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Users Table */}
// //           <div className="overflow-x-auto">
// //             {loading ? (
// //               <div className="flex flex-col items-center justify-center py-12">
// //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
// //                 <p className="text-gray-600">Chargement des utilisateurs...</p>
// //               </div>
// //             ) : (
// //               <table className="min-w-full divide-y divide-gray-200">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Utilisateur
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Contact
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Inscription
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Statut
// //                     </th>
// //                     <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Actions
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {filteredUsers.map((userItem) => (
// //                     <tr key={userItem.id} className="hover:bg-gray-50 transition-colors">
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="flex items-center">
// //                           <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
// //                             <span className="text-white font-bold text-sm">
// //                               {userItem.first_name?.[0]}{userItem.last_name?.[0]}
// //                             </span>
// //                           </div>
// //                           <div className="ml-4">
// //                             <div className="text-sm font-semibold text-gray-900">
// //                               {userItem.first_name} {userItem.last_name}
// //                             </div>
// //                             <div className="text-sm text-gray-500">
// //                               @{userItem.username}
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-gray-900">{userItem.email}</div>
// //                         <div className="text-sm text-gray-500">
// //                           {userItem.phone || 'Aucun téléphone'}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-gray-900">
// //                           {new Date(userItem.date_joined).toLocaleDateString('fr-FR')}
// //                         </div>
// //                         <div className="text-xs text-gray-500">
// //                           {new Date(userItem.date_joined).toLocaleTimeString('fr-FR')}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
// //                           Actif
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                         <div className="flex justify-end space-x-3">
// //                           <button
// //                             onClick={() => handleEdit(userItem)}
// //                             className="flex items-center text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors font-medium min-w-[100px] justify-center"
// //                           >
// //                             <EditIcon />
// //                             Modifier
// //                           </button>
// //                           <button
// //                             onClick={() => handleDelete(userItem.id)}
// //                             className="flex items-center text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors font-medium min-w-[100px] justify-center"
// //                           >
// //                             <DeleteIcon />
// //                             Supprimer
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             )}

// //             {!loading && filteredUsers.length === 0 && (
// //               <div className="text-center py-12">
// //                 <EmptyUsersIcon />
// //                 <h3 className="text-lg font-medium text-gray-900 mb-2">
// //                   {searchTerm ? 'Aucun utilisateur trouvé' : 'Aucun utilisateur'}
// //                 </h3>
// //                 <p className="text-gray-500 max-w-sm mx-auto">
// //                   {searchTerm 
// //                     ? 'Aucun utilisateur ne correspond à votre recherche. Essayez avec d\'autres termes.'
// //                     : 'Commencez par ajouter des utilisateurs à votre plateforme.'
// //                   }
// //                 </p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modal d'édition */}
// //       {editingUser && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
// //             <div className="px-6 py-4 border-b border-gray-200">
// //               <h3 className="text-lg font-semibold text-gray-900">Modifier l'utilisateur</h3>
// //             </div>
            
// //             <div className="px-6 py-4 space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
// //                 <input
// //                   type="text"
// //                   value={editingUser.first_name || ''}
// //                   onChange={(e) => setEditingUser({...editingUser, first_name: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
// //                 <input
// //                   type="text"
// //                   value={editingUser.last_name || ''}
// //                   onChange={(e) => setEditingUser({...editingUser, last_name: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
// //                 <input
// //                   type="email"
// //                   value={editingUser.email || ''}
// //                   onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
// //                 <input
// //                   type="tel"
// //                   value={editingUser.phone || ''}
// //                   onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                 />
// //               </div>
// //             </div>

// //             <div className="px-6 py-4 border-t border-gray-200 flex space-x-3">
// //               <button
// //                 onClick={handleSave}
// //                 className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
// //               >
// //                 Enregistrer
// //               </button>
// //               <button
// //                 onClick={() => setEditingUser(null)}
// //                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
// //               >
// //                 Annuler
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Modal d'ajout d'utilisateur */}
// //       {showAddModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
// //             <div className="px-6 py-4 border-b border-gray-200">
// //               <h3 className="text-lg font-semibold text-gray-900">Ajouter un utilisateur</h3>
// //             </div>
            
// //             <div className="px-6 py-4 space-y-4">
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
// //                   <input
// //                     type="text"
// //                     value={newUser.first_name}
// //                     onChange={(e) => setNewUser({...newUser, first_name: e.target.value})}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                     placeholder="Prénom"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
// //                   <input
// //                     type="text"
// //                     value={newUser.last_name}
// //                     onChange={(e) => setNewUser({...newUser, last_name: e.target.value})}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                     placeholder="Nom"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur *</label>
// //                 <input
// //                   type="text"
// //                   value={newUser.username}
// //                   onChange={(e) => setNewUser({...newUser, username: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                   placeholder="nom.utilisateur"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
// //                 <input
// //                   type="email"
// //                   value={newUser.email}
// //                   onChange={(e) => setNewUser({...newUser, email: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                   placeholder="email@exemple.com"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
// //                 <input
// //                   type="tel"
// //                   value={newUser.phone}
// //                   onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                   placeholder="+33 1 23 45 67 89"
// //                 />
// //               </div>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe *</label>
// //                   <input
// //                     type="password"
// //                     value={newUser.password}
// //                     onChange={(e) => setNewUser({...newUser, password: e.target.value})}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                     placeholder="••••••••"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">Confirmation *</label>
// //                   <input
// //                     type="password"
// //                     value={newUser.confirm_password}
// //                     onChange={(e) => setNewUser({...newUser, confirm_password: e.target.value})}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                     placeholder="••••••••"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="px-6 py-4 border-t border-gray-200 flex space-x-3">
// //               <button
// //                 onClick={handleAddUser}
// //                 disabled={addingUser}
// //                 className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center"
// //               >
// //                 {addingUser ? (
// //                   <>
// //                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                     Création...
// //                   </>
// //                 ) : (
// //                   'Créer l\'utilisateur'
// //                 )}
// //               </button>
// //               <button
// //                 onClick={() => setShowAddModal(false)}
// //                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
// //               >
// //                 Annuler
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default AdminDashboard


// import React, { useState, useEffect } from 'react'
// import { useAuth } from '../contexts/AuthContext'
// import axios from 'axios'

// const AdminDashboard = () => {
//   const { user, logout } = useAuth()
//   const [users, setUsers] = useState([])
//   const [editingUser, setEditingUser] = useState(null)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState('users')
  
//   // ÉTAT POUR L'AJOUT D'UTILISATEUR
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [newUser, setNewUser] = useState({
//     username: '',
//     email: '',
//     first_name: '',
//     last_name: '',
//     phone: '',
//     password: '',
//     confirm_password: ''
//   })
//   const [addingUser, setAddingUser] = useState(false)

//   // ÉTATS POUR LES NOUVEAUX UTILISATEURS
//   const [timeRange, setTimeRange] = useState('7j') // 7j par défaut
//   const [showNewUsers, setShowNewUsers] = useState(false)

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

//   // Calcul des nouveaux utilisateurs selon l'intervalle (CORRIGÉ)
//   const getNewUsersByRange = (range) => {
//     const now = new Date()
//     let startDate = new Date()

//     switch (range) {
//       case '24h':
//         startDate.setHours(now.getHours() - 24)
//         break
//       case '3j':
//         startDate.setDate(now.getDate() - 3)
//         startDate.setHours(0, 0, 0, 0) // Début de journée
//         break
//       case '7j':
//         startDate.setDate(now.getDate() - 7)
//         startDate.setHours(0, 0, 0, 0) // Début de journée
//         break
//       case '30j':
//         startDate.setDate(now.getDate() - 30)
//         startDate.setHours(0, 0, 0, 0) // Début de journée
//         break
//       default:
//         startDate.setDate(now.getDate() - 7)
//         startDate.setHours(0, 0, 0, 0)
//     }

//     return users.filter(user => {
//       const userDate = new Date(user.date_joined)
//       return userDate >= startDate
//     })
//   }

//   // Statistiques améliorées
//   const newUsers = getNewUsersByRange(timeRange)
//   const newUsersCount = newUsers.length

//   // Fonction pour changer la période
//   const handleTimeRangeChange = (range) => {
//     setTimeRange(range)
//     setShowNewUsers(false)
//   }

//   const handleEdit = (user) => {
//     setEditingUser({ ...user })
//   }

//   const handleSave = async () => {
//     if (editingUser) {
//       try {
//         await axios.patch(`http://localhost:8000/api/auth/profile/`, editingUser)
//         await fetchUsers()
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
//         await fetchUsers()
//       } catch (error) {
//         console.error('Erreur lors de la suppression:', error)
//         alert('Erreur lors de la suppression de l\'utilisateur')
//       }
//     }
//   }

//   const handleAddUser = async () => {
//     if (newUser.password !== newUser.confirm_password) {
//       alert('Les mots de passe ne correspondent pas')
//       return
//     }

//     // Validation du mot de passe
//     if (newUser.password.length < 8) {
//       alert('Le mot de passe doit contenir au moins 8 caractères')
//       return
//     }

//     setAddingUser(true)
//     try {
//       const userData = {
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//         password2: newUser.confirm_password,
//         first_name: newUser.first_name || '',
//         last_name: newUser.last_name || '',
//         phone: newUser.phone || ''
//       }

//       console.log('📤 Données envoyées:', userData)

//       const response = await axios.post('http://localhost:8000/api/auth/register/', userData)

//       console.log('✅ Réponse API:', response.data)

//       if (response.status === 201) {
//         setShowAddModal(false)
//         setNewUser({
//           username: '',
//           email: '',
//           first_name: '',
//           last_name: '',
//           phone: '',
//           password: '',
//           confirm_password: ''
//         })
//         await fetchUsers()
//         alert('Utilisateur créé avec succès!')
//       }
//     } catch (error) {
//       console.error('❌ Erreur création utilisateur:', error)
//       if (error.response?.data) {
//         // Affiche les erreurs de validation Django
//         const errors = error.response.data
//         let errorMessage = 'Erreurs de validation:\n'
        
//         for (const field in errors) {
//           if (Array.isArray(errors[field])) {
//             errorMessage += `• ${field}: ${errors[field].join(', ')}\n`
//           } else {
//             errorMessage += `• ${field}: ${errors[field]}\n`
//           }
//         }
//         alert(errorMessage)
//       } else {
//         alert('Erreur de connexion au serveur')
//       }
//     } finally {
//       setAddingUser(false)
//     }
//   }

//   const handleLogout = () => {
//     logout()
//   }

//   // Statistiques
//   const totalUsers = users.length
//   const activeUsers = users.length

//   // Icônes SVG en BLANC
//   const UsersIcon = () => (
//     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//     </svg>
//   )

//   const ActiveUsersIcon = () => (
//     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
//   )

//   const NewUsersIcon = () => (
//     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//     </svg>
//   )

//   const SearchIcon = () => (
//     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//     </svg>
//   )

//   const AdminIcon = () => (
//     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     </svg>
//   )

//   const EmptyUsersIcon = () => (
//     <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//     </svg>
//   )

//   // NOUVELLES ICÔNES pour les boutons
//   const EditIcon = () => (
//     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//     </svg>
//   )

//   const DeleteIcon = () => (
//     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//     </svg>
//   )

//   const LogoutIcon = () => (
//     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//     </svg>
//   )

//   // Icône pour le bouton Ajouter
//   const AddIcon = () => (
//     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//     </svg>
//   )

//   // Icône pour la flèche du dropdown
//   const ChevronIcon = () => (
//     <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//     </svg>
//   )

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       {/* Header Navigation */}
//       <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
//                 <AdminIcon />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
//                 <p className="text-sm text-gray-500">Gestion des utilisateurs</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
//                 <p className="text-xs text-gray-500">Administrateur</p>
//               </div>
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">
//                   {user?.first_name?.[0]}{user?.last_name?.[0]}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Dashboard Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
//                 <UsersIcon />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
//                 <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
//                 <ActiveUsersIcon />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
//                 <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
//               </div>
//             </div>
//           </div>

//           {/* Carte Nouveaux Utilisateurs - Version Compacte */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
//                   <NewUsersIcon />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Nouveaux utilisateurs</p>
//                   <p className="text-2xl font-bold text-gray-900">{newUsersCount}</p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {timeRange === '24h' ? '24 heures' : 
//                      timeRange === '3j' ? '3 derniers jours' : 
//                      timeRange === '7j' ? '7 derniers jours' : 
//                      '30 derniers jours'}
//                   </p>
//                 </div>
//               </div>
              
//               {/* Menu déroulant compact */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowNewUsers(!showNewUsers)}
//                   className="flex items-center px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
//                 >
//                   <span className="mr-1">Période</span>
//                   <ChevronIcon />
//                 </button>

//                 {/* Dropdown Menu */}
//                 {showNewUsers && (
//                   <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//                     <button
//                       onClick={() => handleTimeRangeChange('24h')}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 first:rounded-t-lg"
//                     >
//                       ⏱️ 24 heures
//                     </button>
//                     <button
//                       onClick={() => handleTimeRangeChange('3j')}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
//                     >
//                       📅 3 jours
//                     </button>
//                     <button
//                       onClick={() => handleTimeRangeChange('7j')}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
//                     >
//                       📊 7 jours
//                     </button>
//                     <button
//                       onClick={() => handleTimeRangeChange('30j')}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 last:rounded-b-lg"
//                     >
//                       🗓️ 30 jours
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Liste déroulante des nouveaux utilisateurs */}
//             {showNewUsers && newUsers.length > 0 && (
//               <div className="mt-4 border-t border-gray-200 pt-4">
//                 <div className="max-h-48 overflow-y-auto space-y-2">
//                   {newUsers.map(user => (
//                     <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
//                       <div className="flex items-center min-w-0">
//                         <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0">
//                           {user.first_name?.[0]}{user.last_name?.[0]}
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <p className="text-sm font-medium text-gray-900 truncate">
//                             {user.first_name} {user.last_name}
//                           </p>
//                           <p className="text-xs text-gray-500 truncate">
//                             {user.email}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end flex-shrink-0 ml-2">
//                         <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mb-1">
//                           Nouveau
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           {new Date(user.date_joined).toLocaleDateString('fr-FR')}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           {/* Toolbar */}
//           <div className="px-6 py-4 border-b border-gray-200">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setActiveTab('users')}
//                   className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                     activeTab === 'users'
//                       ? 'bg-indigo-100 text-indigo-700'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   Utilisateurs
//                 </button>
                
//                 {/* BOUTON AJOUTER */}
//                 <button
//                   onClick={() => setShowAddModal(true)}
//                   className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
//                 >
//                   <AddIcon />
//                   Ajouter
//                 </button>
//               </div>
              
//               <div className="flex space-x-3">
//                 <div className="relative flex-1 sm:flex-none">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <SearchIcon />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Rechercher un utilisateur..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
//                   />
//                 </div>
                
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
//                 >
//                   <LogoutIcon />
//                   Déconnexion
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Users Table */}
//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
//                 <p className="text-gray-600">Chargement des utilisateurs...</p>
//               </div>
//             ) : (
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Utilisateur
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Contact
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Inscription
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Statut
//                     </th>
//                     <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredUsers.map((userItem) => (
//                     <tr key={userItem.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
//                             <span className="text-white font-bold text-sm">
//                               {userItem.first_name?.[0]}{userItem.last_name?.[0]}
//                             </span>
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-semibold text-gray-900">
//                               {userItem.first_name} {userItem.last_name}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               @{userItem.username}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{userItem.email}</div>
//                         <div className="text-sm text-gray-500">
//                           {userItem.phone || 'Aucun téléphone'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {new Date(userItem.date_joined).toLocaleDateString('fr-FR')}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {new Date(userItem.date_joined).toLocaleTimeString('fr-FR')}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                           Actif
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex justify-end space-x-3">
//                           <button
//                             onClick={() => handleEdit(userItem)}
//                             className="flex items-center text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors font-medium min-w-[100px] justify-center"
//                           >
//                             <EditIcon />
//                             Modifier
//                           </button>
//                           <button
//                             onClick={() => handleDelete(userItem.id)}
//                             className="flex items-center text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors font-medium min-w-[100px] justify-center"
//                           >
//                             <DeleteIcon />
//                             Supprimer
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}

//             {!loading && filteredUsers.length === 0 && (
//               <div className="text-center py-12">
//                 <EmptyUsersIcon />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   {searchTerm ? 'Aucun utilisateur trouvé' : 'Aucun utilisateur'}
//                 </h3>
//                 <p className="text-gray-500 max-w-sm mx-auto">
//                   {searchTerm 
//                     ? 'Aucun utilisateur ne correspond à votre recherche. Essayez avec d\'autres termes.'
//                     : 'Commencez par ajouter des utilisateurs à votre plateforme.'
//                   }
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modal d'édition */}
//       {editingUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">Modifier l'utilisateur</h3>
//             </div>
            
//             <div className="px-6 py-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
//                 <input
//                   type="text"
//                   value={editingUser.first_name || ''}
//                   onChange={(e) => setEditingUser({...editingUser, first_name: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
//                 <input
//                   type="text"
//                   value={editingUser.last_name || ''}
//                   onChange={(e) => setEditingUser({...editingUser, last_name: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   value={editingUser.email || ''}
//                   onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
//                 <input
//                   type="tel"
//                   value={editingUser.phone || ''}
//                   onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t border-gray-200 flex space-x-3">
//               <button
//                 onClick={handleSave}
//                 className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
//               >
//                 Enregistrer
//               </button>
//               <button
//                 onClick={() => setEditingUser(null)}
//                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
//               >
//                 Annuler
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal d'ajout d'utilisateur */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">Ajouter un utilisateur</h3>
//             </div>
            
//             <div className="px-6 py-4 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
//                   <input
//                     type="text"
//                     value={newUser.first_name}
//                     onChange={(e) => setNewUser({...newUser, first_name: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Prénom"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
//                   <input
//                     type="text"
//                     value={newUser.last_name}
//                     onChange={(e) => setNewUser({...newUser, last_name: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Nom"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur *</label>
//                 <input
//                   type="text"
//                   value={newUser.username}
//                   onChange={(e) => setNewUser({...newUser, username: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="nom.utilisateur"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
//                 <input
//                   type="email"
//                   value={newUser.email}
//                   onChange={(e) => setNewUser({...newUser, email: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="email@exemple.com"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
//                 <input
//                   type="tel"
//                   value={newUser.phone}
//                   onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="+33 1 23 45 67 89"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe *</label>
//                   <input
//                     type="password"
//                     value={newUser.password}
//                     onChange={(e) => setNewUser({...newUser, password: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Confirmation *</label>
//                   <input
//                     type="password"
//                     value={newUser.confirm_password}
//                     onChange={(e) => setNewUser({...newUser, confirm_password: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="••••••••"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t border-gray-200 flex space-x-3">
//               <button
//                 onClick={handleAddUser}
//                 disabled={addingUser}
//                 className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center"
//               >
//                 {addingUser ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Création...
//                   </>
//                 ) : (
//                   'Créer l\'utilisateur'
//                 )}
//               </button>
//               <button
//                 onClick={() => setShowAddModal(false)}
//                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
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
  
  // ÉTAT POUR L'AJOUT D'UTILISATEUR
  const [showAddModal, setShowAddModal] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    confirm_password: ''
  })
  const [addingUser, setAddingUser] = useState(false)

  // ÉTATS POUR LES NOUVEAUX UTILISATEURS
  const [timeRange, setTimeRange] = useState('7j') // 7j par défaut
  const [showNewUsers, setShowNewUsers] = useState(false)

  // ÉTATS POUR LES UTILISATEURS ACTIFS/INACTIFS
  const [showActiveUsers, setShowActiveUsers] = useState(false)
  const [userStatus, setUserStatus] = useState('all') // all, active, inactive

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

  // Fonction pour déterminer si un utilisateur est actif
  const isUserActive = (user) => {
    if (!user.last_login) return false
    
    const lastLogin = new Date(user.last_login)
    const now = new Date()
    const hoursSinceLogin = (now - lastLogin) / (1000 * 60 * 60)
    
    // Considéré actif s'il s'est connecté dans les dernières 24h
    return hoursSinceLogin <= 24
  }

  // Utilisateurs actifs/inactifs
  const activeUsersList = users.filter(user => isUserActive(user))
  const inactiveUsersList = users.filter(user => !isUserActive(user))

  // Filtrage selon le statut sélectionné
  const getFilteredUsersByStatus = () => {
    switch (userStatus) {
      case 'active':
        return users.filter(user => isUserActive(user))
      case 'inactive':
        return users.filter(user => !isUserActive(user))
      default:
        return users
    }
  }

  const statusFilteredUsers = getFilteredUsersByStatus()

  // Filtrer les utilisateurs selon la recherche
  const filteredUsers = statusFilteredUsers.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.first_name && u.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (u.last_name && u.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Calcul des nouveaux utilisateurs selon l'intervalle (CORRIGÉ)
  const getNewUsersByRange = (range) => {
    const now = new Date()
    let startDate = new Date()

    switch (range) {
      case '24h':
        startDate.setHours(now.getHours() - 24)
        break
      case '3j':
        startDate.setDate(now.getDate() - 3)
        startDate.setHours(0, 0, 0, 0) // Début de journée
        break
      case '7j':
        startDate.setDate(now.getDate() - 7)
        startDate.setHours(0, 0, 0, 0) // Début de journée
        break
      case '30j':
        startDate.setDate(now.getDate() - 30)
        startDate.setHours(0, 0, 0, 0) // Début de journée
        break
      default:
        startDate.setDate(now.getDate() - 7)
        startDate.setHours(0, 0, 0, 0)
    }

    return users.filter(user => {
      const userDate = new Date(user.date_joined)
      return userDate >= startDate
    })
  }

  // Statistiques améliorées
  const newUsers = getNewUsersByRange(timeRange)
  const newUsersCount = newUsers.length

  // Statistiques dynamiques selon le filtre
  const totalUsers = users.length
  const activeUsersCount = activeUsersList.length
  const inactiveUsersCount = inactiveUsersList.length

  // Compteur dynamique pour la carte "Utilisateurs actifs"
  const getActiveUsersDisplayCount = () => {
    switch (userStatus) {
      case 'active':
        return activeUsersCount
      case 'inactive':
        return inactiveUsersCount
      default:
        return totalUsers
    }
  }

  const activeUsersDisplayCount = getActiveUsersDisplayCount()

  // Fonction pour changer la période des nouveaux utilisateurs
  const handleTimeRangeChange = (range) => {
    setTimeRange(range)
    setShowNewUsers(false)
  }

  // Fonction pour changer le statut des utilisateurs
  const handleStatusChange = (status) => {
    setUserStatus(status)
    setShowActiveUsers(false)
  }

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

  const handleAddUser = async () => {
    if (newUser.password !== newUser.confirm_password) {
      alert('Les mots de passe ne correspondent pas')
      return
    }

    // Validation du mot de passe
    if (newUser.password.length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères')
      return
    }

    setAddingUser(true)
    try {
      const userData = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        password2: newUser.confirm_password,
        first_name: newUser.first_name || '',
        last_name: newUser.last_name || '',
        phone: newUser.phone || ''
      }

      console.log('📤 Données envoyées:', userData)

      const response = await axios.post('http://localhost:8000/api/auth/register/', userData)

      console.log('✅ Réponse API:', response.data)

      if (response.status === 201) {
        setShowAddModal(false)
        setNewUser({
          username: '',
          email: '',
          first_name: '',
          last_name: '',
          phone: '',
          password: '',
          confirm_password: ''
        })
        await fetchUsers()
        alert('Utilisateur créé avec succès!')
      }
    } catch (error) {
      console.error('❌ Erreur création utilisateur:', error)
      if (error.response?.data) {
        // Affiche les erreurs de validation Django
        const errors = error.response.data
        let errorMessage = 'Erreurs de validation:\n'
        
        for (const field in errors) {
          if (Array.isArray(errors[field])) {
            errorMessage += `• ${field}: ${errors[field].join(', ')}\n`
          } else {
            errorMessage += `• ${field}: ${errors[field]}\n`
          }
        }
        alert(errorMessage)
      } else {
        alert('Erreur de connexion au serveur')
      }
    } finally {
      setAddingUser(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

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

  // Icône pour le bouton Ajouter
  const AddIcon = () => (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )

  // Icône pour la flèche du dropdown
  const ChevronIcon = () => (
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
          {/* Carte Utilisateurs Totaux */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <UsersIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {activeUsersCount} actifs • {inactiveUsersCount} inactifs
                </p>
              </div>
            </div>
          </div>

          {/* Carte Utilisateurs Actifs - Version Améliorée */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                  <ActiveUsersIcon />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {userStatus === 'all' ? 'Tous les utilisateurs' : 
                     userStatus === 'active' ? 'Utilisateurs actifs' : 
                     'Utilisateurs inactifs'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{activeUsersDisplayCount}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {userStatus === 'all' ? `${activeUsersCount} actifs • ${inactiveUsersCount} inactifs` : 
                     userStatus === 'active' ? 'Connectés dans les 24h' : 
                     'Non connectés depuis 24h'}
                  </p>
                </div>
              </div>
              
              {/* Menu déroulant des statuts */}
              <div className="relative">
                <button
                  onClick={() => setShowActiveUsers(!showActiveUsers)}
                  className="flex items-center px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span className="mr-1">Filtre</span>
                  <ChevronIcon />
                </button>

                {/* Dropdown Menu */}
                {showActiveUsers && (
                  <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => handleStatusChange('all')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 first:rounded-t-lg"
                    >
                      👥 Tous ({totalUsers})
                    </button>
                    <button
                      onClick={() => handleStatusChange('active')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      ✅ Actifs ({activeUsersCount})
                    </button>
                    <button
                      onClick={() => handleStatusChange('inactive')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 last:rounded-b-lg"
                    >
                      ❌ Inactifs ({inactiveUsersCount})
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Liste déroulante des utilisateurs selon le statut */}
            {showActiveUsers && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {statusFilteredUsers.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-2">Aucun utilisateur</p>
                  ) : (
                    statusFilteredUsers.slice(0, 5).map(user => (
                      <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center min-w-0">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0">
                            {user.first_name?.[0]}{user.last_name?.[0]}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.first_name} {user.last_name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0 ml-2">
                          <span className={`text-xs px-2 py-1 rounded-full mb-1 ${
                            isUserActive(user) 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {isUserActive(user) ? 'Actif' : 'Inactif'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {user.last_login 
                              ? `Dernière connexion: ${new Date(user.last_login).toLocaleDateString('fr-FR')}`
                              : 'Jamais connecté'
                            }
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                  {statusFilteredUsers.length > 5 && (
                    <p className="text-xs text-gray-500 text-center pt-2">
                      + {statusFilteredUsers.length - 5} autres utilisateurs
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Carte Nouveaux Utilisateurs - Version Compacte */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <NewUsersIcon />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Nouveaux utilisateurs</p>
                  <p className="text-2xl font-bold text-gray-900">{newUsersCount}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {timeRange === '24h' ? '24 heures' : 
                     timeRange === '3j' ? '3 derniers jours' : 
                     timeRange === '7j' ? '7 derniers jours' : 
                     '30 derniers jours'}
                  </p>
                </div>
              </div>
              
              {/* Menu déroulant compact */}
              <div className="relative">
                <button
                  onClick={() => setShowNewUsers(!showNewUsers)}
                  className="flex items-center px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <span className="mr-1">Période</span>
                  <ChevronIcon />
                </button>

                {/* Dropdown Menu */}
                {showNewUsers && (
                  <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => handleTimeRangeChange('24h')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 first:rounded-t-lg"
                    >
                      ⏱️ 24 heures
                    </button>
                    <button
                      onClick={() => handleTimeRangeChange('3j')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    >
                      📅 3 jours
                    </button>
                    <button
                      onClick={() => handleTimeRangeChange('7j')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    >
                      📊 7 jours
                    </button>
                    <button
                      onClick={() => handleTimeRangeChange('30j')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 last:rounded-b-lg"
                    >
                      🗓️ 30 jours
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Liste déroulante des nouveaux utilisateurs */}
            {showNewUsers && newUsers.length > 0 && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {newUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center min-w-0">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0 ml-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mb-1">
                          Nouveau
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(user.date_joined).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                
                {/* BOUTON AJOUTER */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <AddIcon />
                  Ajouter
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isUserActive(userItem) 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {isUserActive(userItem) ? 'Actif' : 'Inactif'}
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

      {/* Modal d'ajout d'utilisateur */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ajouter un utilisateur</h3>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                  <input
                    type="text"
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({...newUser, first_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input
                    type="text"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({...newUser, last_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur *</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="nom.utilisateur"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="email@exemple.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="+33 1 23 45 67 89"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe *</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirmation *</label>
                  <input
                    type="password"
                    value={newUser.confirm_password}
                    onChange={(e) => setNewUser({...newUser, confirm_password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex space-x-3">
              <button
                onClick={handleAddUser}
                disabled={addingUser}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {addingUser ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Création...
                  </>
                ) : (
                  'Créer l\'utilisateur'
                )}
              </button>
              <button
                onClick={() => setShowAddModal(false)}
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