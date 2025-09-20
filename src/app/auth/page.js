'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Leaf, Mail, Lock, User, ArrowRight, ArrowLeft, Heart, Droplets, Sun } from 'lucide-react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetMode, setResetMode] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setMessage({ type: '', text: '' })
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' })
      return false
    }
    
    if (!isLogin && !resetMode) {
      if (!formData.name) {
        setMessage({ type: 'error', text: 'Please enter your name' })
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match' })
        return false
      }
      if (formData.password.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters' })
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    
    try {
      if (resetMode) {
        await sendPasswordResetEmail(auth, formData.email)
        setMessage({ type: 'success', text: 'Password reset email sent! Check your inbox.' })
        setResetMode(false)
      } else if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
        setMessage({ type: 'success', text: 'Welcome back!' })
        setTimeout(() => router.push('/dashboard'), 1000)
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        
        if (formData.name) {
          await updateProfile(userCredential.user, {
            displayName: formData.name
          })
        }
        
        setMessage({ type: 'success', text: 'Account created successfully!' })
        setTimeout(() => router.push('/dashboard'), 1000)
      }
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.'
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.'
          break
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.'
          break
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.'
          break
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.'
          break
        case 'auth/invalid-credential':
          errorMessage = 'Invalid login credentials. Please try again.'
          break
      }
      
      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      setMessage({ type: 'success', text: 'Signed in successfully!' })
      setTimeout(() => router.push('/dashboard'), 1000)
    } catch (error) {
      let errorMessage = 'Google sign-in failed. Please try again.'
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled.'
      }
      
      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    setMessage({ type: '', text: '' })
    setResetMode(false)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    resetForm()
  }

  const getTitle = () => {
    if (resetMode) return 'Reset Your Password'
    return isLogin ? 'Welcome Back' : 'Join ZenFlora'
  }

  const getSubtitle = () => {
    if (resetMode) return 'Enter your email to receive a password reset link'
    return isLogin 
      ? 'Continue your mindful journey with plants'
      : 'Begin your journey toward mindful plant care'
  }

  return (
    <div className="lg:h-screen bg-[#E7EFC7] flex">
      {/* Left Side - Information Panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&auto=format&fit=crop"
            alt="Peaceful plant arrangement"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#AEC8A4]/80" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-display font-light">ZenFlora</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="mb-12">
              <h1 className="text-4xl xl:text-5xl font-display font-light mb-6 leading-tight">
                {resetMode ? 'Reconnect with Nature' : 
                 isLogin ? 'Welcome Back to Your Garden' : 'Cultivate Your Inner Garden'}
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                {resetMode ? 
                  'Every plant journey has moments of renewal. Let us help you find your way back to your zen garden.' :
                  isLogin ? 
                    'Your plants have been waiting. Continue nurturing your peaceful sanctuary and discover new moments of mindfulness.' :
                    'Join thousands of plant lovers who have found peace through the simple act of caring for nature. Your journey toward mindful living starts here.'
                }
              </p>

              {!resetMode && (
                <div className="space-y-6">
                  <h3 className="text-xl font-medium mb-4">What awaits you:</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Heart, text: 'Mindful plant care guidance' },
                      { icon: Leaf, text: 'Curated collection of zen plants' },
                      { icon: Sun, text: 'Daily moments of peace and reflection' },
                      { icon: Droplets, text: 'Simple routines for busy lives' }
                    ].map(({ icon: Icon, text }, idx) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <Icon className="w-5 h-5 text-white/80" />
                        <span className="text-white/90">{text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="border-l-4 border-white/30 pl-6"
            >
              <p className="text-lg italic text-white/90 mb-2">
                "In every seed lies the potential for transformation. In every moment of care, we find our own growth."
              </p>
              <p className="text-sm text-white/70">- ZenFlora Philosophy</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form Panel */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Mobile Header */}
            <div className="lg:hidden bg-[#AEC8A4] px-6 py-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-display font-light text-white mb-2">ZenFlora</h1>
              <p className="text-white/90 text-sm">Find peace through plants</p>
            </div>

            {/* Form Content */}
            <div className="p-6 lg:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-display font-light text-[#3B3B1A] mb-2">
                  {getTitle()}
                </h2>
                <p className="text-[#8A784E] text-sm lg:text-base">
                  {getSubtitle()}
                </p>
              </div>

              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg mb-6 text-center text-sm ${
                    message.type === 'error' 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-green-50 text-green-600 border border-green-200'
                  }`}
                >
                  {message.text}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && !resetMode && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-[#3B3B1A] font-medium mb-2 text-sm">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#AEC8A4]" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={!isLogin && !resetMode}
                        className="w-full pl-10 pr-4 py-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none transition-colors bg-[#E7EFC7]/30 text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-[#3B3B1A] font-medium mb-2 text-sm">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#AEC8A4]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none transition-colors bg-[#E7EFC7]/30 text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </motion.div>

                {!resetMode && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-[#3B3B1A] font-medium mb-2 text-sm">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#AEC8A4]" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-10 py-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none transition-colors bg-[#E7EFC7]/30 text-sm"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AEC8A4] hover:text-[#8A784E]"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </motion.div>

                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="block text-[#3B3B1A] font-medium mb-2 text-sm">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#AEC8A4]" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required={!isLogin}
                            className="w-full pl-10 pr-4 py-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none transition-colors bg-[#E7EFC7]/30 text-sm"
                            placeholder="Confirm your password"
                          />
                        </div>
                      </motion.div>
                    )}
                  </>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#AEC8A4] text-white py-3 rounded-lg font-medium hover:bg-[#8A784E] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 flex items-center justify-center text-sm"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <>
                        {resetMode ? 'Send Reset Email' : (isLogin ? 'Sign In' : 'Create Account')}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>

              {!resetMode && (
                <>
                  {/* Forgot Password */}
                  {isLogin && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="mt-4 text-center"
                    >
                      <button
                        type="button"
                        onClick={() => setResetMode(true)}
                        className="text-[#AEC8A4] hover:text-[#8A784E] transition-colors text-xs font-medium"
                      >
                        Forgot your password?
                      </button>
                    </motion.div>
                  )}
                </>
              )}

              {/* Toggle Mode */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-center border-t border-[#E7EFC7] pt-6"
              >
                {resetMode ? (
                  <button
                    type="button"
                    onClick={() => setResetMode(false)}
                    className="text-[#AEC8A4] hover:text-[#8A784E] transition-colors font-medium flex items-center justify-center mx-auto text-sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to sign in
                  </button>
                ) : (
                  <p className="text-[#8A784E] text-sm">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-[#AEC8A4] hover:text-[#8A784E] transition-colors font-medium"
                    >
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                )}
              </motion.div>

              {/* Back to Home */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-4 text-center"
              >
                <Link 
                  href="/"
                  className="text-[#8A784E] hover:text-[#3B3B1A] transition-colors text-xs"
                >
                  ← Back to ZenFlora
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}