'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Heart, Droplets, Plus, Star, LogIn } from 'lucide-react'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import plantsData from '@/data/plants.json'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [userPlants, setUserPlants] = useState([])
  const [favoritePlants, setFavoritePlants] = useState([])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const featuredPlants = plantsData.slice(0, 2)

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
    <div className="min-h-screen">
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

      <motion.section 
        initial={{x:-2000, opacity: 0 }}
        animate={{x:0, opacity: 1 }}
        viewport={{ always: true  }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&auto=format&fit=crop"
            alt="Beautiful plant arrangement"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-[#E7EFC7] px-6">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ always: true }}
            transition={{ delay: 1, duration: 1.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-light mb-6">
              ZenFlora
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
              Cultivate Calm Through Nature
            </p>
            <p className="text-lg mb-10 max-w-xl mx-auto opacity-90">
              Discover the serene world of houseplants and find mindfulness in the simple act of nurturing life.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ always: true }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Link 
              href="/plants"
              className="inline-flex items-center bg-[#E7EFC7] text-[#3B3B1A] px-8 py-4 rounded-full font-medium hover:bg-[#AEC8A4] transition-all duration-300 group"
            >
              Explore Plants
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-20 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ always: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-display font-light mb-8 text-[#3B3B1A]">
              Where Plants Meet Mindfulness
            </h2>
            <p className="text-lg text-[#8A784E] leading-relaxed mb-12">
              In our fast-paced world, plants offer us a gentle reminder to slow down, breathe deeply, 
              and connect with the natural rhythms of life.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[Leaf, Heart, Droplets].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -300, opacity: 0 } }
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ always: true }}
                  transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-[#AEC8A4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#3B3B1A]">
                    {["Curated Selection", "Mindful Moments", "Simple Care"][i]}
                  </h3>
                  <p className="text-[#8A784E]">
                    {
                      [
                        "Carefully chosen plants known for their calming properties and beginner-friendly care.",
                        "Each plant comes with thoughtful prompts to help you find presence and peace.",
                        "Clear, gentle guidance to help your plants thrive without overwhelming complexity.",
                      ][i]
                    }
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ x: -200, y: 200, opacity: 0 }}
            whileInView={{ x: 0,y:0, opacity: 1 }}
            viewport={{ always: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-light mb-4 text-[#3B3B1A]">
              Featured Plant Companions
            </h2>
            <p className="text-lg text-[#8A784E] max-w-2xl mx-auto">
              Start your journey with these gentle, forgiving plants that bring both beauty and tranquility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {featuredPlants.map((plant, index) => (
              <motion.div
                key={plant.id}
                initial={{ x: -300, y:-200, opacity: 0 } }
                whileInView={{ x: 0,y:0, opacity: 1 }}
                viewport={{ always: true }}
                transition={{ delay: index * 0.5, duration: 0.8 }}
                className="bg-[#E7EFC7] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group relative"
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
                        toggleFavorite(plant)
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
                        isPlantFavorite(plant.id)
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                      title={isPlantFavorite(plant.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-5 h-5 ${isPlantFavorite(plant.id) ? 'fill-current' : ''}`} />
                    </button>

                    {isPlantInGarden(plant.id) ? (
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
                          addToGarden(plant)
                        }}
                        className="w-10 h-10 bg-[#AEC8A4] text-white rounded-full flex items-center justify-center hover:bg-[#8A784E] transition-colors transform hover:scale-110 shadow-lg"
                        title="Add to garden"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-display font-medium text-[#3B3B1A]">
                      {plant.name}
                    </h3>
                    <span className="bg-[#AEC8A4] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {plant.tagline}
                    </span>
                  </div>

                  {/* Status Indicators */}
                  <div className="flex gap-2 mb-4">
                    {isPlantFavorite(plant.id) && (
                      <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                        <Heart className="w-3 h-3 fill-current" />
                        Favorite
                      </span>
                    )}
                    {isPlantInGarden(plant.id) && (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-current" />
                        In Garden
                      </span>
                    )}
                  </div>

                  <p className="text-[#8A784E] mb-6 leading-relaxed">
                    {plant.description.slice(0, 150)}...
                  </p>
                  <Link
                    href={`/plants/${plant.id}`}
                    className="inline-flex items-center text-[#8A784E] font-medium hover:text-[#3B3B1A] transition-colors group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ always: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/plants"
              className="inline-flex items-center bg-[#AEC8A4] text-white px-8 py-4 rounded-full font-medium hover:bg-[#8A784E] transition-colors group"
            >
              Discover All Plants
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}