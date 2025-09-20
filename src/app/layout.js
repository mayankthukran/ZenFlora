import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata = {
  title: 'ZenFlora - Cultivate Calm',
  description: 'An interactive plant and mindfulness guide for creating serenity in your space',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#E7EFC7] text-[#3B3B1A] font-sans antialiased">
        {/* <Header /> */}
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-[#AEC8A4] border-t border-[#8A784E] py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-[#8A784E]">
              Made with 💚
            </p>
            <p className="text-[#3B3B1A] mb-4">
              © 2025 ZenFlora. Cultivating calm through nature.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
