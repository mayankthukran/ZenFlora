'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { use, useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { ArrowLeft, Sun, Droplets, Mountain, Wind, Lightbulb, Heart, ArrowRight, Plus, Star, LogIn } from 'lucide-react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import plantsData from '@/data/plants.json'
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PlantDetailPage({ params }) {
  const { slug } = use(params);
  const plant = plantsData.find(p => p.id === slug)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isPlanted, setIsPlanted] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [showAddPlantModal, setShowAddPlantModal] = useState(false)

  if (!plant) notFound()

  const relatedPlants = plantsData
    .filter(p => p.id !== plant.id && p.category.some(cat => plant.category.includes(cat)))
    .slice(0, 3)

  const careIcons = {
    sunlight: Sun,
    water: Droplets,
    soil: Mountain,
    humidity: Wind
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        loadUserPlantStatus(currentUser)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [plant.id])

  const loadUserPlantStatus = (currentUser) => {
    const savedPlants = localStorage.getItem(`userPlants_${currentUser.uid}`)
    const savedFavorites = localStorage.getItem(`favoritePlants_${currentUser.uid}`)
    
    if (savedPlants) {
      const userPlants = JSON.parse(savedPlants)
      setIsPlanted(userPlants.some(p => p.originalId === plant.id))
    }
    
    if (savedFavorites) {
      const favoritePlants = JSON.parse(savedFavorites)
      setIsFavorite(favoritePlants.some(p => p.id === plant.id))
    }
  }

  const handleAuthRequired = () => {
    setShowLoginPrompt(true)
    setTimeout(() => setShowLoginPrompt(false), 3000)
  }

  const toggleFavorite = () => {
    if (!user) {
      handleAuthRequired()
      return
    }

    const savedFavorites = localStorage.getItem(`favoritePlants_${user.uid}`)
    let favoritePlants = savedFavorites ? JSON.parse(savedFavorites) : []
    
    if (isFavorite) {
      favoritePlants = favoritePlants.filter(p => p.id !== plant.id)
    } else {
      favoritePlants.push(plant)
    }
    
    localStorage.setItem(`favoritePlants_${user.uid}`, JSON.stringify(favoritePlants))
    setIsFavorite(!isFavorite)
  }

  const addPlantToCollection = (nickname = '', datePlanted = new Date().toISOString().split('T')[0]) => {
    if (!user) {
      handleAuthRequired()
      return
    }

    const savedPlants = localStorage.getItem(`userPlants_${user.uid}`)
    let userPlants = savedPlants ? JSON.parse(savedPlants) : []

    const newPlant = {
      ...plant,
      id: `${plant.id}_${Date.now()}`,
      originalId: plant.id,
      nickname: nickname || plant.name,
      datePlanted,
      careHistory: [],
      notes: ''
    }

    userPlants.push(newPlant)
    localStorage.setItem(`userPlants_${user.uid}`, JSON.stringify(userPlants))
    setIsPlanted(true)
    setShowAddPlantModal(false)
  }

  const removePlantFromCollection = () => {
    if (!user) return

    const savedPlants = localStorage.getItem(`userPlants_${user.uid}`)
    let userPlants = savedPlants ? JSON.parse(savedPlants) : []
    
    userPlants = userPlants.filter(p => p.originalId !== plant.id)
    localStorage.setItem(`userPlants_${user.uid}`, JSON.stringify(userPlants))
    setIsPlanted(false)
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

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-6"
      >
        <Link
          href="/plants"
          className="inline-flex items-center text-[#3B3B1A] hover:text-[#8A784E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Plants
        </Link>
      </motion.div>

      <section className="relative">
        <div className="container mx-auto px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ always: true }}
              transition={{ duration: 0.5 }}
              className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={plant.heroImage}
                alt={plant.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ x: -100, y:-100, opacity: 0 }}
              whileInView={{ opacity: 1, x: 0 ,y:0}}
              viewport={{ always: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:pl-8"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {plant.category.map(cat => (
                  <span
                    key={cat}
                    className="bg-[#AEC8A4] text-[#3B3B1A] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl lg:text-5xl font-display font-light mb-3 text-[#3B3B1A]">
                {plant.name}
              </h1>

              <p className="text-lg text-[#8A784E] italic mb-6">
                {plant.scientificName}
              </p>

              <p className="text-lg text-[#3B3B1A] leading-relaxed mb-8">
                {plant.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={toggleFavorite}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    isFavorite
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-[#E7EFC7] text-[#3B3B1A] hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>

                {isPlanted ? (
                  <button
                    onClick={removePlantFromCollection}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                  >
                    <Star className="w-5 h-5 fill-current" />
                    In My Garden
                  </button>
                ) : (
                  <button
                    onClick={() => user ? setShowAddPlantModal(true) : handleAuthRequired()}
                    className="flex items-center gap-2 px-6 py-3 bg-[#AEC8A4] text-white rounded-full font-medium hover:bg-[#8A784E] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add to My Garden
                  </button>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4 text-[#3B3B1A]">
                  Why You'll Love This Plant
                </h3>
                <ul className="space-y-2">
                  {plant.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: -100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ always: true }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                      className="flex items-center text-[#3B3B1A]"
                    >
                      <div className="w-2 h-2 bg-[#8A784E] rounded-full mr-3" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of the component remains the same... */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ always: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-light mb-4 text-[#3B3B1A]">
              Care Guide
            </h2>
            <p className="text-lg text-[#8A784E] max-w-2xl mx-auto">
              Simple, gentle guidance to help your {plant.name} thrive in your space.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Object.entries(plant.care).map(([key, value], index) => {
              const Icon = careIcons[key]
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -200, y:200 }}
                  whileInView={{ opacity: 1, x: 0,y:0 }}
                  viewport={{ always: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="rounded-2xl p-6 text-center bg-[#E7EFC7]"
                >
                  <div className="w-12 h-12 bg-[#AEC8A4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#3B3B1A]" />
                  </div>
                  <h3 className="font-medium mb-2 text-[#3B3B1A] capitalize">{key}</h3>
                  <p className="text-sm text-[#8A784E] leading-relaxed">{value}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: -200, x:-200 }}
            whileInView={{ opacity: 1, y: 0, x:0 }}
            viewport={{ always: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-[#F7F5DE] border border-[#F1EAB8] rounded-2xl p-6 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#F1EAB8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Lightbulb className="w-4 h-4 text-[#8A784E]" />
              </div>
              <div>
                <h3 className="font-medium mb-2 text-[#8A784E]">Pro Tip</h3>
                <p className="text-[#3B3B1A] leading-relaxed">{plant.proTip}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ always: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="rounded-3xl p-8 md:p-12 text-center bg-[#AEC8A4]">
              <div className="w-16 h-16 bg-[#E7EFC7] rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-[#3B3B1A]" />
              </div>
              <h2 className="text-3xl font-display font-light mb-6 text-[#3B3B1A]">
                Mindfulness Moment
              </h2>
              <p className="text-lg text-[#3B3B1A] leading-relaxed italic max-w-3xl mx-auto">
                "{plant.mindfulnessPrompt}"
              </p>
              <div className="mt-8 text-sm text-[#8A784E]">
                Take a moment to sit with your {plant.name} and reflect
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {relatedPlants.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ always: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-light mb-4 text-[#3B3B1A]">
                Similar Plants You Might Love
              </h2>
              <p className="text-lg text-[#8A784E]">
                Explore more plants with similar care needs and calming qualities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPlants.map((relatedPlant, index) => (
                <motion.div
                  key={relatedPlant.id}
                  initial={{ x: -300,y:200, opacity: 0 } }
                  whileInView={{ x: 0,y:0, opacity: 1 }}
                  viewport={{ always: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-[#E7EFC7] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedPlant.image}
                      alt={relatedPlant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-medium mb-2 text-[#3B3B1A]">
                      {relatedPlant.name}
                    </h3>
                    <p className="text-[#8A784E] text-sm mb-4">
                      {relatedPlant.description.slice(0, 100)}...
                    </p>
                    <Link
                      href={`/plants/${relatedPlant.id}`}
                      className="inline-flex items-center text-[#8A784E] font-medium hover:text-[#3B3B1A] transition-colors group"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Add Plant Modal */}
      {showAddPlantModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#3B3B1A]">Add {plant.name}</h2>
              <button onClick={() => setShowAddPlantModal(false)} className="text-[#8A784E] hover:text-[#3B3B1A]">
                ×
              </button>
            </div>

            <AddPlantForm
              plant={plant}
              onSubmit={addPlantToCollection}
              onCancel={() => setShowAddPlantModal(false)}
            />
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}

// Add Plant Form Component
function AddPlantForm({ plant, onSubmit, onCancel }) {
  const [nickname, setNickname] = useState('')
  const [datePlanted, setDatePlanted] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(nickname, datePlanted)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[#3B3B1A] font-medium mb-2">Nickname (optional)</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={`My ${plant.name}`}
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
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-[#AEC8A4] text-white py-3 rounded-lg hover:bg-[#8A784E] transition-colors"
        >
          Add to Garden
        </button>
      </div>
    </form>
  )
}