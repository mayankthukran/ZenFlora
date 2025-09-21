'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Leaf, LogOut, User, Home, Settings, Heart, Calendar, Camera, Edit3, Plus, X, Star, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import plantsData from '@/data/plants.json'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('planted')
  const [userPlants, setUserPlants] = useState([])
  const [favoritePlants, setFavoritePlants] = useState([])
  const [showAddPlantModal, setShowAddPlantModal] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null)
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    joinDate: '',
    plantingExperience: 'Beginner'
  })
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        initializeUserData(currentUser)
      } else {
        router.push('/auth')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const initializeUserData = (currentUser) => {
    // Initialize user profile data
    setProfileData({
      displayName: currentUser.displayName || 'Plant Lover',
      bio: 'Finding peace through plants 🌱',
      joinDate: new Date(currentUser.metadata.creationTime).toLocaleDateString(),
      plantingExperience: 'Beginner'
    })

    // Load profile photo from localStorage
    const savedProfilePhoto = localStorage.getItem(`profilePhoto_${currentUser.uid}`)
    if (savedProfilePhoto) {
      setProfilePhotoUrl(savedProfilePhoto)
    } else if (currentUser.photoURL) {
      setProfilePhotoUrl(currentUser.photoURL)
    }

    // Load user's plants from localStorage
    const savedPlants = localStorage.getItem(`userPlants_${currentUser.uid}`)
    const savedFavorites = localStorage.getItem(`favoritePlants_${currentUser.uid}`)
    
    if (savedPlants) {
      setUserPlants(JSON.parse(savedPlants))
    }
    
    if (savedFavorites) {
      setFavoritePlants(JSON.parse(savedFavorites))
    }
  }

  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image smaller than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const imageDataUrl = e.target.result
        setProfilePhotoUrl(imageDataUrl)
        // Save to localStorage
        if (user) {
          localStorage.setItem(`profilePhoto_${user.uid}`, imageDataUrl)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeProfilePhoto = () => {
    setProfilePhotoUrl(null)
    if (user) {
      localStorage.removeItem(`profilePhoto_${user.uid}`)
    }
  }

  const saveUserData = (plants, favorites) => {
    if (user) {
      localStorage.setItem(`userPlants_${user.uid}`, JSON.stringify(plants))
      localStorage.setItem(`favoritePlants_${user.uid}`, JSON.stringify(favorites))
    }
  }

  const addPlantToCollection = (plantId, nickname = '', datePlanted = new Date().toISOString().split('T')[0]) => {
    const plant = plantsData.find(p => p.id === plantId)
    if (!plant) return

    const newPlant = {
      ...plant,
      id: `${plantId}_${Date.now()}`, // Unique ID for user's plant instance
      originalId: plantId,
      nickname: nickname || plant.name,
      datePlanted,
      careHistory: [],
      notes: ''
    }

    const updatedPlants = [...userPlants, newPlant]
    setUserPlants(updatedPlants)
    saveUserData(updatedPlants, favoritePlants)
    setShowAddPlantModal(false)
  }

  const removePlantFromCollection = (plantInstanceId) => {
    const updatedPlants = userPlants.filter(plant => plant.id !== plantInstanceId)
    setUserPlants(updatedPlants)
    saveUserData(updatedPlants, favoritePlants)
  }

  const toggleFavorite = (plantId) => {
    const plant = plantsData.find(p => p.id === plantId)
    if (!plant) return

    let updatedFavorites
    const isAlreadyFavorite = favoritePlants.some(fav => fav.id === plantId)
    
    if (isAlreadyFavorite) {
      updatedFavorites = favoritePlants.filter(fav => fav.id !== plantId)
    } else {
      updatedFavorites = [...favoritePlants, plant]
    }
    
    setFavoritePlants(updatedFavorites)
    saveUserData(userPlants, updatedFavorites)
  }

  const updateProfile = () => {
    // In a real app, this would update the user's profile in the database
    setEditingProfile(false)
    console.log('Profile updated:', profileData)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E7EFC7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#AEC8A4] rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-[#8A784E]">Loading your zen garden...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#E7EFC7]">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* User Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 mb-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-24 h-24 bg-[#AEC8A4] rounded-full flex items-center justify-center overflow-hidden">
                  {profilePhotoUrl ? (
                    <Image 
                      src={profilePhotoUrl} 
                      alt="Profile" 
                      width={96}
                      height={96}
                      className="rounded-full object-cover w-full h-full" 
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                
                {/* Photo Upload/Edit Options */}
                <div className="absolute -bottom-1 -right-1 flex gap-1">
                  <label className="bg-[#AEC8A4] p-2 rounded-full hover:bg-[#8A784E] transition-colors cursor-pointer">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {profilePhotoUrl && (
                    <button
                      onClick={removeProfilePhoto}
                      className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors"
                      title="Remove photo"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {editingProfile ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                      className="text-2xl font-bold text-[#3B3B1A] bg-transparent border-b-2 border-[#AEC8A4] focus:outline-none"
                    />
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="text-[#8A784E] bg-[#E7EFC7] p-3 rounded-lg focus:outline-none resize-none w-full"
                      rows={2}
                    />
                    <select
                      value={profileData.plantingExperience}
                      onChange={(e) => setProfileData({...profileData, plantingExperience: e.target.value})}
                      className="bg-[#E7EFC7] p-2 rounded-lg text-[#3B3B1A] focus:outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={updateProfile}
                        className="bg-[#AEC8A4] text-white px-4 py-2 rounded-lg hover:bg-[#8A784E] transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-[#3B3B1A]">{profileData.displayName}</h1>
                      <button
                        onClick={() => setEditingProfile(true)}
                        className="text-[#AEC8A4] hover:text-[#8A784E] transition-colors"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-[#8A784E] mb-3">{profileData.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-[#8A784E]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {profileData.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Leaf className="w-4 h-4" />
                        <span>{profileData.plantingExperience} Plant Parent</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-[#E7EFC7] p-4 rounded-xl">
                  <div className="text-2xl font-bold text-[#AEC8A4]">{userPlants.length}</div>
                  <div className="text-sm text-[#8A784E]">Plants</div>
                </div>
                <div className="bg-[#E7EFC7] p-4 rounded-xl">
                  <div className="text-2xl font-bold text-[#AEC8A4]">{favoritePlants.length}</div>
                  <div className="text-sm text-[#8A784E]">Favorites</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Plant Collections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            {/* Tab Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('planted')}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeTab === 'planted'
                      ? 'bg-[#AEC8A4] text-white'
                      : 'bg-[#E7EFC7] text-[#8A784E] hover:bg-[#AEC8A4] hover:text-white'
                  }`}
                >
                  My Plants ({userPlants.length})
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeTab === 'favorites'
                      ? 'bg-[#AEC8A4] text-white'
                      : 'bg-[#E7EFC7] text-[#8A784E] hover:bg-[#AEC8A4] hover:text-white'
                  }`}
                >
                  Favorites ({favoritePlants.length})
                </button>
              </div>

              {activeTab === 'planted' && (
                <button
                  onClick={() => setShowAddPlantModal(true)}
                  className="bg-[#AEC8A4] text-white px-4 py-2 rounded-full hover:bg-[#8A784E] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Plant
                </button>
              )}
            </div>

            {/* Plant Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === 'planted' ? (
                userPlants.length > 0 ? (
                  userPlants.map((plant) => (
                    <PlantCard
                      key={plant.id}
                      plant={plant}
                      type="planted"
                      onRemove={() => removePlantFromCollection(plant.id)}
                      onToggleFavorite={() => toggleFavorite(plant.originalId)}
                      isFavorite={favoritePlants.some(fav => fav.id === plant.originalId)}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={<Leaf className="w-12 h-12 text-[#AEC8A4]" />}
                    title="No plants yet"
                    message="Start your plant journey by adding your first plant!"
                    action={
                      <button
                        onClick={() => setShowAddPlantModal(true)}
                        className="bg-[#AEC8A4] text-white px-6 py-3 rounded-full hover:bg-[#8A784E] transition-colors"
                      >
                        Add Your First Plant
                      </button>
                    }
                  />
                )
              ) : (
                favoritePlants.length > 0 ? (
                  <>
                    {favoritePlants.map((plant) => (
                      <PlantCard
                        key={plant.id}
                        plant={plant}
                        type="favorite"
                        onToggleFavorite={() => toggleFavorite(plant.id)}
                        isFavorite={true}
                      />
                    ))}
                    {/* Explore More Plants Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-br from-[#AEC8A4] to-[#8A784E] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-8 text-center"
                    >
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                        <Leaf className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3">
                        Discover More Plants
                      </h3>
                      <p className="text-white/90 text-sm mb-6 leading-relaxed">
                        Explore our full collection of peaceful houseplants and find your next green companion.
                      </p>
                      <Link
                        href="/plants"
                        className="bg-white text-[#AEC8A4] px-6 py-3 rounded-full font-medium hover:bg-[#E7EFC7] hover:text-[#3B3B1A] transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                      >
                        Explore Plants
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </>
                ) : (
                  <EmptyState
                    icon={<Heart className="w-12 h-12 text-[#AEC8A4]" />}
                    title="No favorites yet"
                    message="Browse our plant collection and mark your favorites!"
                    action={
                      <Link
                        href="/plants"
                        className="bg-[#AEC8A4] text-white px-6 py-3 rounded-full hover:bg-[#8A784E] transition-colors inline-block"
                      >
                        Explore Plants
                      </Link>
                    }
                  />
                )
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Add Plant Modal */}
      {showAddPlantModal && (
        <AddPlantModal
          onClose={() => setShowAddPlantModal(false)}
          onAdd={addPlantToCollection}
          availablePlants={plantsData}
        />
      )}
    </div>
  )
}

// Plant Card Component
function PlantCard({ plant, type, onRemove, onToggleFavorite, isFavorite }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#E7EFC7] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48">
        <Image src={plant.image} alt={plant.name} fill className="object-cover" />
        <div className="absolute top-3 right-3 flex gap-2">
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
          {type === 'planted' && onRemove && (
            <button
              onClick={onRemove}
              className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-[#3B3B1A]">
            {type === 'planted' && plant.nickname !== plant.name ? plant.nickname : plant.name}
          </h3>
          <span className="bg-[#AEC8A4] text-white px-2 py-1 rounded-full text-xs">
            {plant.tagline}
          </span>
        </div>
        
        {type === 'planted' && plant.nickname !== plant.name && (
          <p className="text-sm text-[#8A784E] mb-2">({plant.name})</p>
        )}
        
        <p className="text-[#8A784E] text-sm mb-3 line-clamp-2">
          {plant.description.slice(0, 100)}...
        </p>
        
        {type === 'planted' && plant.datePlanted && (
          <div className="flex items-center gap-1 text-xs text-[#8A784E]">
            <Calendar className="w-3 h-3" />
            <span>Planted {new Date(plant.datePlanted).toLocaleDateString()}</span>
          </div>
        )}
        
        <div className="mt-3 flex gap-2">
          <Link
            href={`/plants/${plant.originalId || plant.id}`}
            className="flex-1 bg-[#AEC8A4] text-white text-center py-2 rounded-lg hover:bg-[#8A784E] transition-colors text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// Empty State Component
function EmptyState({ icon, title, message, action }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-[#3B3B1A] mb-2">{title}</h3>
      <p className="text-[#8A784E] mb-6">{message}</p>
      {action}
    </div>
  )
}

// Add Plant Modal Component
function AddPlantModal({ onClose, onAdd, availablePlants }) {
  const [selectedPlant, setSelectedPlant] = useState('')
  const [nickname, setNickname] = useState('')
  const [datePlanted, setDatePlanted] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedPlant) {
      onAdd(selectedPlant, nickname, datePlanted)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#3B3B1A]">Add New Plant</h2>
          <button onClick={onClose} className="text-[#8A784E] hover:text-[#3B3B1A]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#3B3B1A] font-medium mb-2">Plant Type</label>
            <select
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              required
              className="w-full p-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none"
            >
              <option value="">Select a plant...</option>
              {availablePlants.map((plant) => (
                <option key={plant.id} value={plant.id}>
                  {plant.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#3B3B1A] font-medium mb-2">Nickname (optional)</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Give your plant a special name..."
              className="w-full p-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#3B3B1A] font-medium mb-2">Date Planted</label>
            <input
              type="date"
              value={datePlanted}
              onChange={(e) => setDatePlanted(e.target.value)}
              className="w-full p-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#AEC8A4] text-white py-3 rounded-lg hover:bg-[#8A784E] transition-colors"
            >
              Add Plant
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}