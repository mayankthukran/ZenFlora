'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Leaf } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#E7EFC7] flex items-center justify-center px-6 p-16">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative w-64 h-64 mx-auto mb-8">
            <motion.div
              animate={{ rotate: [0, 30, -30, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&auto=format&fit=crop"
                alt="Peaceful potted plant"
                fill
                className="object-cover rounded-full shadow-xl"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-6xl font-display font-light text-[#3B3B1A] mb-4">
              404
            </h1>
            <h2 className="text-3xl font-display font-light text-[#8A784E] mb-6">
              Page Not Found
            </h2>
            <p className="text-lg text-[#3B3B1A]/80 leading-relaxed mb-8 max-w-md mx-auto">
              Like a plant that has wandered from its pot, this page seems to have 
              found its way to an unexpected place. Let's help you get back to where 
              you need to be.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[#AEC8A4] text-[#3B3B1A] px-8 py-4 rounded-full font-medium text-lg hover:bg-[#8A784E] hover:text-white transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>

          <div className="text-[#3B3B1A]/70">
            <span>or</span>
          </div>

          <Link
            href="/plants"
            className="inline-flex items-center gap-3 bg-white text-[#8A784E] px-8 py-4 rounded-full font-medium text-lg hover:bg-[#E7EFC7] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 border border-[#AEC8A4]"
          >
            <Leaf className="w-5 h-5" />
            Explore Plants
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#AEC8A4]"
        >
          <div className="flex items-center justify-center gap-2 text-[#8A784E] mb-2">
            <Leaf className="w-5 h-5" />
            <span className="font-medium">Mindful Moment</span>
          </div>
          <p className="text-[#3B3B1A] italic">
            "Sometimes the most beautiful discoveries happen when we lose our way. 
            Take a deep breath and embrace this unexpected pause in your journey."
          </p>
        </motion.div>
      </div>
    </div>
  )
}
