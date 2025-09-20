'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Leaf, Users, Star, ExternalLink } from 'lucide-react'

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-[#E7EFC7]">
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
              About ZenFlora
            </h1>
            <p className="text-xl text-[#8A784E] leading-relaxed">
              Where the ancient wisdom of plants meets modern mindfulness, 
              creating spaces of serenity in our busy digital world.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ always: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&auto=format&fit=crop"
                  alt="Peaceful plant arrangement"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -100, y:-100, opacity: 0 }}
              whileInView={{ opacity: 1, x: 0 ,y:0}}
              viewport={{ always: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:pl-8"
            >
              <h2 className="text-3xl font-display font-light mb-6 text-[#3B3B1A]">
                Our Vision
              </h2>
              <p className="text-lg text-[#8A784E] leading-relaxed mb-6">
                In our increasingly fast-paced world, we believe that connecting with nature—even 
                in small ways—can be profoundly transformative. ZenFlora was born from the simple 
                idea that houseplants offer us more than just beauty; they provide opportunities 
                for mindfulness, presence, and gentle daily rituals.
              </p>
              <p className="text-lg text-[#8A784E] leading-relaxed mb-8">
                Each plant in our collection has been thoughtfully chosen not just for its 
                aesthetic appeal or ease of care, but for its ability to invite moments of 
                calm reflection into your daily routine.
              </p>
              
              <div className="flex items-center gap-4 text-[#AEC8A4]">
                <Heart className="w-6 h-6" />
                <span className="font-medium">Cultivating calm, one plant at a time</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ always: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-display font-light mb-4 text-[#3B3B1A]">
              What We Believe
            </h2>
            <p className="text-lg text-[#8A784E] max-w-2xl mx-auto">
              Our core values shape every aspect of the ZenFlora experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
              icon: <Leaf className="w-8 h-8 text-white" />,
              title: 'Simplicity',
              desc: 'Plant care doesn\'t need to be complicated. We focus on simple, gentle guidance that helps you succeed without overwhelming complexity.'
            }, {
              icon: <Heart className="w-8 h-8 text-white" />,
              title: 'Mindfulness',
              desc: 'Every plant offers an opportunity for mindful presence. We weave gentle contemplative practices into the plant care journey.'
            }, {
              icon: <Users className="w-8 h-8 text-white" />,
              title: 'Accessibility',
              desc: 'Everyone deserves to experience the joy of plants. We focus on beginner-friendly varieties and clear, supportive guidance.'
            }].map(({ icon, title, desc }, idx) => (
              <motion.div
                key={title}
                initial={{ x: -300, opacity: 0 } }
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ always: true }}
                transition={{ delay: 0.1 * (idx + 1), duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#AEC8A4] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  {icon}
                </div>
                <h3 className="text-xl font-medium mb-4 text-[#3B3B1A]">{title}</h3>
                <p className="text-[#8A784E] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ always: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-light mb-6 text-[#3B3B1A]">
                About the Creator
              </h2>
              <div className="bg-[#AEC8A4] bg-opacity-20 rounded-3xl p-8 md:p-12">
                <p className="text-lg text-[#8A784E] leading-relaxed mb-6">
                  ZenFlora is a passion project that combines my love for web development with 
                  my deep appreciation for the calming presence of plants...
                </p>
                <p className="text-lg text-[#8A784E] leading-relaxed m6-8">
                  Having experienced firsthand how caring for plants can provide moments of 
                  peace in a hectic day, I designed ZenFlora to share that tranquility...
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#E7EFC7]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ always: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-display font-light mb-8 text-[#3B3B1A] text-center">
              Acknowledgments
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Leaf className="w-6 h-6 text-[#AEC8A4]" />,
                  title: 'Plant Information',
                  desc: 'Plant care information curated from reputable horticultural sources and personal experience.',
                  note: 'Always consult with local gardening experts for specific growing conditions in your area.'
                },
                {
                  icon: <Star className="w-6 h-6 text-[#AEC8A4]" />,
                  title: 'Inspiration',
                  desc: 'Inspired by the intersection of technology and nature, and the growing movement toward mindful living.',
                  note: 'Special thanks to the plant parent community for sharing their wisdom and experiences.'
                }
              ].map(({ icon, title, desc, link, details, note }) => (
                <div key={title} className="bg-white rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {icon}
                    <h3 className="text-xl font-medium text-[#3B3B1A]">{title}</h3>
                  </div>
                  <p className="text-[#8A784E] mb-4">{desc}</p>
                  {link && (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#AEC8A4] hover:text-[#8A784E] transition-colors"
                    >
                      {link.text}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {details && (
                    <div className="space-y-2 text-sm text-[#8A784E]">
                      {details.map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                  )}
                  {note && (
                    <p className="text-sm text-[#8A784E] mt-2">{note}</p>
                  )}
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: -200 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ always: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center mt-12 p-8 bg-[#AEC8A4] bg-opacity-20 rounded-2xl"
            >
              <p className="text-lg text-[#8A784E] font-medium mb-2">
                Thank you for visiting ZenFlora
              </p>
              <p className="text-[#8A784E]">
                May your journey with plants bring you moments of peace and joy.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
