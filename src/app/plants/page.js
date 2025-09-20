'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, Filter, ArrowRight } from 'lucide-react'
import plantsData from '@/data/plants.json'
import Header from '@/components/Header'

export default function PlantsPage() {

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

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

  return (
    <div className="min-h-screen bg-[#E7EFC7]">
      <Header />
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
                <motion.div
                  key={plant.id}
                  initial={{ x: -300, opacity: 0 } }
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ always: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl"
                >
                  <div className="relative h-64">
                    <Image
                      src={plant.image}
                      alt={plant.name}
                      fill
                      className="object-cover"
                    />
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

                    <Link
                      href={`/plants/${plant.id}`}
                      className="inline-flex items-center text-[#3B3B1A] font-medium hover:text-[#8A784E] transition-colors group"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
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
    </div>
  )
}
