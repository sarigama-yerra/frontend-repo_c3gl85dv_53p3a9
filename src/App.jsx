import React from 'react'
import NexiloSlider from './components/Slider'

function App() {
  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <header className="absolute top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-white/90 font-semibold tracking-[0.12em] uppercase">
            NEXILO Digital
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
          >
            Start a Conversation
          </a>
        </div>
      </header>
      <main>
        <NexiloSlider />
        <section id="approach" className="bg-[#F5F3EF] text-[#1A2B3D] py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="font-serif text-3xl md:text-5xl tracking-wide leading-tight">Precision built from the floor up.</h3>
            <p className="mt-6 text-lg leading-relaxed text-[#2F5F5D]">
              We translate operational nuance into digital systems that protect brand equity and unlock revenue — without taxing your time.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
