'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Leaf, LogOut, User, Home, Settings, Heart } from 'lucide-react'
import Header from '@/components/Header'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        router.push('/auth')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-light text-[#3B3B1A] mb-4">
              Welcome to Your Zen Garden
            </h1>
            <p className="text-xl text-[#8A784E] mb-2">
              Hello, {user.displayName || 'Plant Lover'}! 🌱
            </p>
            <p className="text-[#8A784E]">
              Your mindful plant journey continues here.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Leaf className="w-8 h-8 text-[#AEC8A4]" />,
                title: 'Plant Collection',
                description: 'Manage your plants and track their growth journey.',
                link: '/plants',
                color: 'bg-green-50'
              },
              {
                icon: <Heart className="w-8 h-8 text-[#AEC8A4]" />,
                title: 'Care Guides',
                description: 'Learn mindful plant care techniques and tips.',
                link: '/guides',
                color: 'bg-rose-50'
              },
              {
                icon: <Settings className="w-8 h-8 text-[#AEC8A4]" />,
                title: 'Profile Settings',
                description: 'Customize your ZenFlora experience.',
                link: '/profile',
                color: 'bg-blue-50'
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={card.link}>
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className={`w-16 h-16 ${card.color} rounded-full flex items-center justify-center mb-4`}>
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-medium text-[#3B3B1A] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[#8A784E] text-sm">
                      {card.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-[#AEC8A4] bg-opacity-20 rounded-3xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-[#AEC8A4] rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-display font-light text-[#3B3B1A] mb-4">
              Your Journey Begins Now
            </h2>
            <p className="text-[#8A784E] leading-relaxed max-w-2xl mx-auto mb-6">
              Welcome to ZenFlora! You're now part of a community that finds peace and mindfulness 
              through the simple act of caring for plants. Every leaf, every drop of water, 
              every moment of care is a step toward inner tranquility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/plants"
                className="bg-[#AEC8A4] text-white px-6 py-3 rounded-full font-medium hover:bg-[#8A784E] transition-colors"
              >
                Explore Plants
              </Link>
              <Link 
                href="/about"
                className="bg-white text-[#3B3B1A] px-6 py-3 rounded-full font-medium hover:bg-[#E7EFC7] transition-colors border border-[#E7EFC7]"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { label: 'Days as Plant Parent', value: '1', color: 'text-green-600' },
              { label: 'Plants in Collection', value: '0', color: 'text-blue-600' },
              { label: 'Mindful Moments', value: '∞', color: 'text-purple-600' }
            ].map((stat, index) => (
              <div key={stat.label} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-[#8A784E] text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Daily Inspiration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 bg-white rounded-2xl p-8 shadow-md text-center"
          >
            <h3 className="text-xl font-medium text-[#3B3B1A] mb-4">
              Today's Plant Wisdom
            </h3>
            <blockquote className="text-lg italic text-[#8A784E] mb-4">
              "The best time to plant a tree was 20 years ago. The second best time is now."
            </blockquote>
            <cite className="text-sm text-[#8A784E] opacity-70">
              - Chinese Proverb
            </cite>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}