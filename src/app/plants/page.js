'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, Filter, ArrowRight, Heart, Plus, Star, LogIn } from 'lucide-react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import plantsData from '@/data/plants.json'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PlantsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [user, setUser] = useState(null)
  const [userPlants, setUserPlants] = useState([])
  const [favoritePlants, setFavoritePlants] = useState([])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const categories = useMemo(() => {
    const allCategories = plantsData.flatMap(plant => plant.category)
    return ['All', ...new Set(allCategories)]
  }, [])

  const filteredPlants = useMemo(() => {
    return plantsData.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.tagline.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || plant.category.includes(selectedCategory)
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        loadUserData(currentUser)
      }
    })

    return () => unsubscribe()
  }, [])

  const loadUserData = (currentUser) => {
    const savedPlants = localStorage.getItem(`userPlants_${currentUser.uid}`)
    const savedFavorites = localStorage.getItem(`favoritePlants_${currentUser.uid}`)
    
    if (savedPlants) {
      setUserPlants(JSON.parse(savedPlants))
    }
    
    if (savedFavorites) {
      setFavoritePlants(JSON.parse(savedFavorites))
    }
  }

  const handleAuthRequired = () => {
    setShowLoginPrompt(true)
    setTimeout(() => setShowLoginPrompt(false), 3000)
  }

  const toggleFavorite = (plant) => {
    if (!user) {
      handleAuthRequired()
      return
    }

    const isFavorite = favoritePlants.some(p => p.id === plant.id)
    let updatedFavorites

    if (isFavorite) {
      updatedFavorites = favoritePlants.filter(p => p.id !== plant.id)
    } else {
      updatedFavorites = [...favoritePlants, plant]
    }

    setFavoritePlants(updatedFavorites)
    localStorage.setItem(`favoritePlants_${user.uid}`, JSON.stringify(updatedFavorites))
  }

  const addToGarden = (plant) => {
    if (!user) {
      handleAuthRequired()
      return
    }

    const newPlant = {
      ...plant,
      id: `${plant.id}_${Date.now()}`,
      originalId: plant.id,
      nickname: plant.name,
      datePlanted: new Date().toISOString().split('T')[0],
      careHistory: [],
      notes: ''
    }

    const updatedPlants = [...userPlants, newPlant]
    setUserPlants(updatedPlants)
    localStorage.setItem(`userPlants_${user.uid}`, JSON.stringify(updatedPlants))
  }

  const isPlantFavorite = (plantId) => {
    return favoritePlants.some(p => p.id === plantId)
  }

  const isPlantInGarden = (plantId) => {
    return userPlants.some(p => p.originalId === plantId)
  }

  return (
    <div className="min-h-screen bg-[#E7EFC7]">
      <Header />
      
      {/* Login Prompt */}
      {showLoginPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#3B3B1A] text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3"
        >
          <LogIn className="w-5 h-5" />
          <span>Please log in to save plants to your collection</span>
          <Link href="/auth" className="bg-[#AEC8A4] px-3 py-1 rounded text-sm hover:bg-[#8A784E] transition-colors">
            Login
          </Link>
        </motion.div>
      )}

      <section className="py-16 bg-[#AEC8A4]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ always: true }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-display font-light mb-4 text-[#3B3B1A]">
              Plant Directory
            </h1>
            <p className="text-lg text-[#8A784E] max-w-2xl mx-auto">
              Explore our curated collection of calming houseplants, each chosen for their beauty, 
              ease of care, and ability to bring peace to your space.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ always: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8A784E] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search plants by name, scientific name, or care type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#AEC8A4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#AEC8A4] focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8A784E] w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 border border-[#AEC8A4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#AEC8A4] focus:border-transparent bg-white min-w-48"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ always: true }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mb-8"
          >
            <p className="text-[#8A784E]">
              {filteredPlants.length === plantsData.length
                ? `Showing all ${plantsData.length} plants`
                : `Found ${filteredPlants.length} plant${filteredPlants.length !== 1 ? 's' : ''}`
              }
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </motion.div>

          {filteredPlants.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlants.map((plant, index) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  index={index}
                  isFavorite={isPlantFavorite(plant.id)}
                  isInGarden={isPlantInGarden(plant.id)}
                  onToggleFavorite={() => toggleFavorite(plant)}
                  onAddToGarden={() => addToGarden(plant)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-xl font-medium text-[#3B3B1A] mb-2">
                No plants found
              </h3>
              <p className="text-[#8A784E] mb-6">
                Try adjusting your search terms or filters to find the perfect plant.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="bg-[#8A784E] text-white px-6 py-3 rounded-full font-medium hover:bg-[#3B3B1A] transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

// Plant Card Component
function PlantCard({ plant, index, isFavorite, isInGarden, onToggleFavorite, onAddToGarden }) {
  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ always: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
    >
      <div className="relative h-64">
        <Image
          src={plant.image}
          alt={plant.name}
          fill
          className="object-cover"
        />
        
        {/* Action Buttons Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault()
              onToggleFavorite()
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
              isFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {isInGarden ? (
            <div
              className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg"
              title="In your garden"
            >
              <Star className="w-5 h-5 fill-current" />
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault()
                onAddToGarden()
              }}
              className="w-10 h-10 bg-[#AEC8A4] text-white rounded-full flex items-center justify-center hover:bg-[#8A784E] transition-colors transform hover:scale-110 shadow-lg"
              title="Add to garden"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {plant.category.slice(0, 2).map(cat => (
            <span
              key={cat}
              className="bg-white/90 backdrop-blur-sm text-[#3B3B1A] px-2 py-1 rounded-full text-xs font-medium"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-display font-medium text-[#3B3B1A] mb-1">
              {plant.name}
            </h3>
            <p className="text-sm italic text-[#8A784E]">
              {plant.scientificName}
            </p>
          </div>
          <span className="bg-[#E7EFC7] text-[#8A784E] px-3 py-1 rounded-full text-sm font-medium">
            {plant.tagline}
          </span>
        </div>

        <p className="text-[#8A784E] mb-4 text-sm leading-relaxed">
          {plant.description.slice(0, 120)}...
        </p>

        <div className="flex items-center gap-4 mb-4 text-xs text-[#8A784E]">
          <span>💧 {plant.care.water.split(',')[0]}</span>
          <span>☀️ {plant.care.sunlight.split(',')[0]}</span>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {isFavorite && (
              <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                <Heart className="w-3 h-3 fill-current" />
                Favorite
              </span>
            )}
            {isInGarden && (
              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                In Garden
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/plants/${plant.id}`}
          className="inline-flex items-center text-[#3B3B1A] font-medium hover:text-[#8A784E] transition-colors group"
        >
          Learn More
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}