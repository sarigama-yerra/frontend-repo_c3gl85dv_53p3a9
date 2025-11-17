import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const palette = {
  oceanMidnight: '#1A2B3D',
  warmBronze: '#8C6F47',
  forestTeal: '#2F5F5D',
  luxuryCream: '#F5F3EF',
}

const slides = [
  {
    key: 'hero',
    type: 'image',
    bg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2060&auto=format&fit=crop',
    overlay: 0.4,
    headline: 'Where Craft Meets Code',
    sub: 'Former luxury operators who built digital intelligence through practice, not theory',
    cta: { label: 'Explore Our Approach', href: '#approach' },
  },
  {
    key: 'operators',
    type: 'image',
    bg: 'https://images.unsplash.com/photo-1501117716987-c8e2aeea9ed0?q=80&w=2069&auto=format&fit=crop',
    overlay: 0.45,
    headline: 'Operators, Not Observers',
    sub: "We're practitioners from Ritz-Carlton, St. Regis, and LUX* Collective who understand luxury hospitality at the operational level. Our digital expertise comes from solving real problems in real properties.",
    layout: 'split',
  },
  {
    key: 'services',
    type: 'color',
    color: palette.luxuryCream,
    headline: 'Transformation Without the Time Tax',
    features: [
      'Revenue Architecture',
      'Guest Journey Design',
      'Brand & Digital Presence',
      'Marketing Intelligence',
    ],
    cta: { label: 'View Services', href: '#services' },
  },
  {
    key: 'proof',
    type: 'image',
    bg: 'https://images.unsplash.com/photo-1542315192-1f61a1792f35?q=80&w=1974&auto=format&fit=crop',
    overlay: 0.35,
    headline: 'Trusted by Operators',
    testimonials: [
      {
        quote:
          'NEXILO translated operational nuance into a digital system that actually moved revenue. Zero fluff.',
        author: 'Area VP, Luxury Portfolio',
      },
      {
        quote:
          'The only partner who understood our guest rhythms and built tech around them.',
        author: 'General Manager, Iconic Urban Hotel',
      },
      {
        quote:
          'Clarity, speed, measurable uplift. Minimal time from our team.',
        author: 'Private Equity Operating Partner',
      },
    ],
  },
]

const useInterval = (callback, delay) => {
  const savedRef = useRef()
  useEffect(() => {
    savedRef.current = callback
  })
  useEffect(() => {
    if (delay == null) return
    const id = setInterval(() => savedRef.current && savedRef.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

const ProgressDots = ({ count, active, onSelect }) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            i === active ? 'w-8 bg-[#8C6F47]' : 'w-2.5 bg-white/40 hover:bg-white/70'
          }`}
        />
      ))}
    </div>
  )
}

const Arrow = ({ dir = 'left', onClick }) => (
  <button
    onClick={onClick}
    aria-label={dir === 'left' ? 'Previous slide' : 'Next slide'}
    className="group absolute z-30 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
    style={{ [dir === 'left' ? 'left' : 'right']: '24px' }}
  >
    {dir === 'left' ? (
      <ChevronLeft className="w-5 h-5 group-hover:scale-105 transition-transform" />
    ) : (
      <ChevronRight className="w-5 h-5 group-hover:scale-105 transition-transform" />
    )}
  </button>
)

const SlideContent = ({ slide, isActive }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!isActive) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(
        '.el-head',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      )
        .fromTo(
          '.el-sub',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.el-cta',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        )
    }, ref)
    return () => ctx.revert()
  }, [isActive])

  if (slide.layout === 'split') {
    return (
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
        <div
          className="h-[40vh] md:h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,${slide.overlay ?? 0.45}), rgba(0,0,0,${slide.overlay ?? 0.45})), url(${slide.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="flex items-center">
          <div className="px-8 md:px-16 lg:px-24 py-16 text-[--cream]">
            <h2 className="el-head font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-white tracking-wide">
              {slide.headline}
            </h2>
            <p className="el-sub mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-xl">
              {slide.sub}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (slide.key === 'services') {
    return (
      <div ref={ref} className="h-full flex items-center justify-center">
        <div className="px-8 md:px-16 lg:px-24 py-16 w-full">
          <h2 className="el-head font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-[#1A2B3D] tracking-wide">
            {slide.headline}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-10">
            {slide.features.map((f, i) => (
              <div key={i} className="group border border-[#8C6F47]/30 bg-white/60 backdrop-blur-sm rounded-xl p-6 md:p-8 hover:bg-white/80 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#8C6F47]/15 border border-[#8C6F47]/30 mb-4" />
                <p className="text-xl md:text-2xl font-medium tracking-wide text-[#2F5F5D]">
                  {f}
                </p>
              </div>
            ))}
          </div>
          <div className="el-cta mt-10">
            <a
              href={slide.cta.href}
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#1A2B3D] text-white tracking-wide hover:bg-[#8C6F47] transition-colors"
            >
              {slide.cta.label}
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (slide.key === 'proof') {
    return (
      <div ref={ref} className="h-full flex items-center justify-center text-center">
        <div className="px-6 md:px-12 lg:px-24 py-16 max-w-5xl mx-auto">
          <h2 className="el-head font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-white tracking-wide">
            {slide.headline}
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {slide.testimonials.map((t, i) => (
              <div key={i} className="border border-white/20 rounded-xl p-6 bg-white/5 backdrop-blur">
                <p className="text-white/90 leading-relaxed">“{t.quote}”</p>
                <p className="mt-4 text-white/70 text-sm tracking-wide">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // default hero
  return (
    <div ref={ref} className="h-full flex items-end">
      <div className="px-8 md:px-16 lg:px-24 pb-24">
        <h1 className="el-head font-serif text-5xl md:text-7xl lg:text-[88px] leading-[0.95] text-white tracking-wide">
          {slide.headline}
        </h1>
        <p className="el-sub mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
          {slide.sub}
        </p>
        {slide.cta && (
          <div className="el-cta mt-8">
            <a
              href={slide.cta.href}
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#1A2B3D] text-white tracking-wide hover:bg-[#8C6F47] transition-colors"
            >
              {slide.cta.label}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

const NexiloSlider = () => {
  const [active, setActive] = useState(0)
  const containerRef = useRef(null)
  const slideRefs = useRef([])

  const go = (dir) => {
    setActive((prev) => {
      const next = (prev + dir + slides.length) % slides.length
      return next
    })
  }

  useInterval(() => {
    go(1)
  }, 7000)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Parallax background movement on slide change
    const bg = container.querySelectorAll('.bg-layer')
    const tl = gsap.timeline()
    tl.to(bg, { scale: 1.05, duration: 1.0, ease: 'power2.out' })
      .to(bg, { scale: 1.0, duration: 1.0, ease: 'power2.out' }, '+=0.2')

    return () => tl.kill()
  }, [active])

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] md:min-h-[90vh] overflow-hidden"
      style={{ backgroundColor: palette.oceanMidnight }}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => {
          const isActive = i === active
          return (
            <div
              key={s.key}
              ref={(el) => (slideRefs.current[i] = el)}
              className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background */}
              {s.type === 'image' ? (
                <div
                  className="bg-layer absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,${s.overlay ?? 0.4}), rgba(0,0,0,${s.overlay ?? 0.4})), url(${s.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    willChange: 'transform',
                  }}
                />
              ) : (
                <div className="absolute inset-0" style={{ background: s.color }} />
              )}

              {/* Content */}
              <div className="relative z-10 h-full">
                <SlideContent slide={s} isActive={isActive} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <Arrow dir="left" onClick={() => go(-1)} />
      <Arrow dir="right" onClick={() => go(1)} />

      <ProgressDots count={slides.length} active={active} onSelect={setActive} />
    </section>
  )
}

export default NexiloSlider
