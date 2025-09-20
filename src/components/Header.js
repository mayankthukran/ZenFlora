'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf, Menu, X, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setMenuOpen(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Navigation items based on authentication status

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/plants', label: 'Plants' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]


  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[#E7EFC7]/80 backdrop-blur-sm border-b border-[#AEC8A4] sticky top-0 z-50"
    >
      <div className="container mx-auto px-8 md:px-0 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Leaf className="w-8 h-8 text-[#3B3B1A]" />
            </motion.div>
            <span className="text-2xl font-display font-semibold text-[#3B3B1A] group-hover:text-[#8A784E] transition-colors">
              ZenFlora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium text-[18px] transition-colors relative ${
                  pathname === item.href
                    ? 'text-[#8A784E]'
                    : 'text-[#3B3B1A] hover:text-[#8A784E]'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#8A784E]"
                  />
                )}
              </Link>
            ))}
            {!user && (
              <div className="flex items-center space-x-8 pl-8 border-l border-[#AEC8A4]">
                <Link
                  key={'/auth'}
                  href={'/auth'}
                  // className="   hover:bg-[#AEC8A4] transition-all duration-300 group"
                  className={`font-medium transition-colors relative flex items-center gap-2 bg-[#3B3B1A] hover:bg-[#AEC8A4] px-8 py-2 rounded-full ${
                    pathname === '/auth'
                      ? 'text-[#8A784E]'
                      : 'text-[#E7EFC7] hover:text-[#3B3B1A]'
                  }`}
                >
                  <span >Login</span>
                  {pathname === '/auth' && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#8A784E]"
                    />
                  )}
                </Link>
              </div>
            )}

            {/* User Profile & Sign Out (Desktop) */}
            {user && !loading && (
              <div className="flex items-center space-x-8 pl-8 border-l border-[#AEC8A4]">
                <Link
                  key={'/dashboard'}
                  href={'/dashboard'}
                  className={`font-medium transition-colors relative flex items-center gap-2 bg-[#3B3B1A] px-2 py-2 rounded-full ${
                    pathname === '/dashboard'
                      ? 'text-white bg-[#8A784E]'  
                      : 'text-[#E7EFC7] hover:text-[#3B3B1A] hover:bg-[#AEC8A4]'
                  }`}
                >
                  <User className="w-5 h-5" />
                  {/* <span>{user.displayName || 'Dashboard'}</span>  */}
                  {pathname === '/dashboard' && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#8A784E]"
                    />
                  )}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-[#3B3B1A] hover:text-red-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                  <span >Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
              {menuOpen ? (
                <X className="w-6 h-6 text-[#3B3B1A]" />
              ) : (
                <Menu className="w-6 h-6 text-[#3B3B1A]" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-[#AEC8A4] pt-4"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-medium px-2 py-1 transition-colors ${
                    pathname === item.href
                      ? 'text-[#8A784E]'
                      : 'text-[#3B3B1A] hover:text-[#8A784E]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {!user && (
                <div className="flex flex-col gap-3 w-16 items-center">
                  <Link
                    key={'/auth'}
                    href={'/auth'}
                    onClick={() => setMenuOpen(false)}
                    className={`font-medium px-2 py-1 transition-colors flex items-center space-x-2 bg-[#3B3B1A] hover:bg-[#AEC8A4] rounded-full ${
                    pathname === '/auth'
                      ? 'text-[#8A784E]'
                      : 'text-[#E7EFC7] hover:text-[#3B3B1A]'
                  }`}
                  >
                    <span>Login</span> 
                  </Link>
                </div>
              )}

              {/* User Profile & Sign Out (Mobile) */}
              {user && !loading && (
                <div className="flex flex-col gap-3">
                  <Link
                    key={'/dashboard'}
                    href={'/dashboard'}
                    onClick={() => setMenuOpen(false)}
                    className={`font-medium px-2 py-1 transition-colors flex items-center space-x-2 ${
                      pathname === '/dashboard'
                        ? 'text-[#8A784E]'
                        : 'text-[#3B3B1A] hover:text-[#8A784E]'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>{user.displayName || 'Dashboard'}</span> 
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-2 py-1 text-[#3B3B1A] hover:text-red-600 transition-colors text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              )}

              {/* Loading state for mobile */}
              {loading && (
                <div className="px-2 py-1 text-[#8A784E] text-sm">
                  Loading...
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}