'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react';
import { motion } from 'framer-motion'
import { ArrowLeft, Sun, Droplets, Mountain, Wind, Lightbulb, Heart, ArrowRight } from 'lucide-react'
import plantsData from '@/data/plants.json'

export default function PlantDetailPage({ params }) {
  const { slug } = use(params);
  const plant = plantsData.find(p => p.id === slug)

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

  return (
    <div className="min-h-screen bg-[#E7EFC7]">
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
    </div>
  )
}
