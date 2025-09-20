'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Heart, Droplets } from 'lucide-react'
import plantsData from '@/data/plants.json'

export default function HomePage() {
  const featuredPlants = plantsData.slice(0, 2)

  return (
    <div className="min-h-screen">
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
                className="bg-[#E7EFC7] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={plant.image}
                    alt={plant.name}
                    fill
                    className="object-cover"
                  />
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
    </div>
  )
}
