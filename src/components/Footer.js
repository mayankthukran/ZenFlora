'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = {
    explore: [
      { label: 'All Plants', href: '/plants' },
      { label: 'Plant Care Guide', href: '/care-guide' },
      { label: 'Plant Quiz', href: '/quiz' },
      { label: 'Seasonal Tips', href: '/seasonal-tips' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/story' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' }
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Plant Emergency', href: '/emergency' },
      { label: 'Community Forum', href: '/forum' },
      { label: 'FAQs', href: '/faq' }
    ]
  }

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' }
  ]

  return (
    <footer className="bg-[#3B3B1A] text-[#E7EFC7] pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-[#AEC8A4] rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-display font-light">ZenFlora</span>
              </div>
              
              <p className="text-[#E7EFC7]/80 leading-relaxed mb-6 max-w-md">
                Cultivating calm through the ancient wisdom of plants. Find your moment of zen 
                in the simple, mindful act of nurturing life.
              </p>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Stay Rooted with Us</h4>
                <div className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-[#E7EFC7]/10 border border-[#AEC8A4]/30 focus:border-[#AEC8A4] focus:outline-none text-[#E7EFC7] placeholder-[#E7EFC7]/60"
                  />
                  <button className="bg-[#AEC8A4] text-white px-4 py-2 rounded-lg hover:bg-[#8A784E] transition-colors">
                    Join
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-[#E7EFC7]/10 rounded-full flex items-center justify-center hover:bg-[#AEC8A4] transition-colors group"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-[#E7EFC7]/70 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation Sections */}
          {Object.entries(footerSections).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="font-medium mb-4 text-[#AEC8A4] capitalize">
                {title === 'explore' ? 'Explore' : title === 'company' ? 'Company' : 'Support'}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#E7EFC7]/70 hover:text-[#AEC8A4] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#E7EFC7]/20 text-sm text-[#E7EFC7]/60"
        >
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p>&copy; {currentYear} ZenFlora. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-[#AEC8A4] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-[#AEC8A4] transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-[#AEC8A4] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-[#AEC8A4] fill-current" />
            <span>for plant lovers</span>
          </div>
        </motion.div>

        {/* Zen Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8 pt-6 border-t border-[#E7EFC7]/10"
        >
          <p className="text-xs text-[#E7EFC7]/50 italic">
            "Every moment spent with plants is a moment of peace discovered."
          </p>
        </motion.div>
      </div>
    </footer>
  )
}