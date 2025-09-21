'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { Leaf, Send, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [openFAQ, setOpenFAQ] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqData = [
    {
      question: "How do I know which plant is right for me?",
      answer: "Our plant directory includes detailed care information and difficulty levels for each plant. Start with beginner-friendly plants like Snake Plants or Pothos if you're new to plant care. Consider your living space's light conditions and how much time you can dedicate to plant care."
    },
    {
      question: "Can I save plants to view later?",
      answer: "Yes! When you create an account, you can favorite plants and add them to your personal garden collection. This helps you keep track of plants you're interested in and those you already own."
    },
    {
      question: "Do I need to create an account to browse plants?",
      answer: "No, you can browse all our plant information without an account. However, creating an account allows you to save favorites, track your plant collection, and personalize your ZenFlora experience."
    },
    {
      question: "How accurate is the plant care information?",
      answer: "Our plant care information is curated from reputable horticultural sources and verified by plant care experts. However, care needs can vary based on your specific environment, so we recommend observing your plants and adjusting care accordingly."
    },
    {
      question: "Can I contribute plant information or corrections?",
      answer: "We welcome community input! If you notice any inaccuracies or have suggestions for improvement, please use the contact form above or email us directly. We review all submissions carefully."
    },
    {
      question: "Is ZenFlora free to use?",
      answer: "Yes, ZenFlora is completely free to use. Our mission is to make plant care knowledge accessible to everyone who wants to bring more peace and nature into their lives."
    },
    {
      question: "How do I reset my password?",
      answer: "On the login page, click 'Forgot your password?' and enter your email address. You'll receive a password reset link via email. If you don't receive it, check your spam folder or contact us for assistance."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account and all associated data by contacting us through this form. We'll process your request within 48 hours and confirm when your data has been removed."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-[#E7EFC7]">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#AEC8A4] py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-display font-light mb-6 text-[#3B3B1A]">
              Get in Touch
            </h1>
            <p className="text-xl text-[#8A784E] leading-relaxed">
              Have questions about plant care or ZenFlora? We're here to help you on your mindful plant journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-[#AEC8A4] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-display font-light mb-4 text-[#3B3B1A]">
                  Send Us a Message
                </h2>
                <p className="text-lg text-[#8A784E]">
                  We'd love to hear about your plant journey or help answer any questions.
                </p>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center"
                >
                  Thank you for your message! We'll get back to you within 24 hours.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center"
                >
                  Sorry, there was an error sending your message. Please try again or email us directly.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <label className="block text-[#3B3B1A] font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none transition-colors bg-[#E7EFC7] bg-opacity-30"
                      placeholder="Enter your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <label className="block text-[#3B3B1A] font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none transition-colors bg-[#E7EFC7] bg-opacity-30"
                      placeholder="Enter your email"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <label className="block text-[#3B3B1A] font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none transition-colors bg-[#E7EFC7] bg-opacity-30"
                  >
                    <option value="">Select a subject</option>
                    <option value="plant-care">Plant Care Question</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="sharing-story">Sharing My Plant Story</option>
                    <option value="website-feedback">Website Feedback</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label className="block text-[#3B3B1A] font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-[#E7EFC7] rounded-lg focus:border-[#AEC8A4] focus:outline-none transition-colors bg-[#E7EFC7] bg-opacity-30 resize-none"
                    placeholder="Tell us about your plants, questions, or just say hello..."
                  ></textarea>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-center"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center bg-[#AEC8A4] text-white px-8 py-4 rounded-full font-medium hover:bg-[#8A784E] transition-all duration-300 group transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-[#AEC8A4] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-display font-light mb-4 text-[#3B3B1A]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#8A784E] max-w-2xl mx-auto">
              Find quick answers to common questions about ZenFlora and plant care.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-[#E7EFC7] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#AEC8A4] hover:bg-opacity-20 transition-colors"
                >
                  <h3 className="font-medium text-[#3B3B1A] pr-4">
                    {faq.question}
                  </h3>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-[#8A784E] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#8A784E] flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-[#8A784E] leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Philosophy */}
      <section className="py-16 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-[#AEC8A4] bg-opacity-20 rounded-3xl p-8 md:p-12">
              <Leaf className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-2xl font-display font-light mb-4 text-[#3B3B1A]">
                Our Commitment to You
              </h3>
              <p className="text-lg text-[#8A784E] leading-relaxed mb-4">
                Just like caring for plants requires patience and attention, we believe in thoughtful, mindful responses. 
                Every message is important to us, and we'll get back to you within 24 hours.
              </p>
              <p className="text-[#8A784E] italic">
                "In every question, there's an opportunity to grow together."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}