'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare, Leaf, Heart, Send, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-[#E7EFC7]">
      {/* Hero Section */}
      <section className="bg-[#AEC8A4] py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ always: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-display font-light mb-6 text-[#3B3B1A]">
              Get in Touch
            </h1>
            <p className="text-xl text-[#8A784E] leading-relaxed">
              Have questions about plant care? Want to share your plant journey? 
              We'd love to hear from you and help you cultivate your green sanctuary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ always: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-display font-light mb-4 text-[#3B3B1A]">
              Ways to Connect
            </h2>
            <p className="text-lg text-[#8A784E] max-w-2xl mx-auto">
              Choose the way that feels most comfortable for you to reach out.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Mail className="w-8 h-8 text-white" />,
                title: 'Email Us',
                desc: 'Drop us a line and we\'ll get back to you within 24 hours.',
                contact: 'hello@zenflora.com',
                delay: 0.1
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-white" />,
                title: 'Plant Questions',
                desc: 'Need help with plant care? Our community is here to help.',
                contact: 'plantcare@zenflora.com',
                delay: 0.2
              },
              {
                icon: <Heart className="w-8 h-8 text-white" />,
                title: 'Share Your Story',
                desc: 'Tell us about your plant journey and mindful moments.',
                contact: 'stories@zenflora.com',
                delay: 0.3
              }
            ].map(({ icon, title, desc, contact, delay }) => (
              <motion.div
                key={title}
                initial={{ x: -300, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ always: true }}
                transition={{ delay, duration: 0.6 }}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#AEC8A4] rounded-full flex items-center justify-center mx-auto mb-6">
                  {icon}
                </div>
                <h3 className="text-xl font-medium mb-4 text-[#3B3B1A]">{title}</h3>
                <p className="text-[#8A784E] leading-relaxed mb-4">{desc}</p>
                <a 
                  href={`mailto:${contact}`}
                  className="text-[#AEC8A4] hover:text-[#8A784E] transition-colors font-medium"
                >
                  {contact}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ always: true }}
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ always: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <label className="block text-[#3B3B1A] font-medium mb-2">
                      Your Name
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
                    viewport={{ always: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <label className="block text-[#3B3B1A] font-medium mb-2">
                      Email Address
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
                  viewport={{ always: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <label className="block text-[#3B3B1A] font-medium mb-2">
                    Subject
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
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ always: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label className="block text-[#3B3B1A] font-medium mb-2">
                    Message
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
                  viewport={{ always: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-center"
                >
                  <button
                    type="submit"
                    className="inline-flex items-center bg-[#AEC8A4] text-white px-8 py-4 rounded-full font-medium hover:bg-[#8A784E] transition-all duration-300 group transform hover:scale-105"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Response Time & Philosophy */}
      <section className="py-16 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ always: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#AEC8A4] bg-opacity-20 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#E7EFC7] rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-[#3B3B1A]" />
                  </div>
                  <h3 className="text-xl font-medium text-[#3B3B1A]">Response Time</h3>
                </div>
                <p className="text-[#8A784E] leading-relaxed mb-4">
                  Just like caring for plants, we believe in thoughtful, mindful responses. 
                  You can expect to hear back from us within 24 hours on weekdays.
                </p>
                <p className="text-sm text-[#8A784E]">
                  For urgent plant care questions, check our plant care guides or reach out 
                  to the plant community on social media for faster assistance.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#AEC8A4] rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-[#3B3B1A]">Our Approach</h3>
                </div>
                <p className="text-[#8A784E] leading-relaxed mb-4">
                  Every message matters to us. Whether you're sharing a plant success story, 
                  asking for care advice, or simply wanting to connect, we read and respond 
                  to each message personally.
                </p>
                <p className="text-sm text-[#8A784E]">
                  ZenFlora is more than a website—it's a community of plant lovers finding 
                  peace through nature.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ always: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center mt-12 p-8 bg-[#AEC8A4] bg-opacity-20 rounded-2xl"
            >
              <Leaf className="w-12 h-12 text-white mx-auto mb-4" />
              <p className="text-lg text-[#8A784E] font-medium mb-2">
                "In every plant, there's a story waiting to bloom."
              </p>
              <p className="text-[#8A784E]">
                We can't wait to hear yours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}