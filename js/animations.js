/**
 * Malak Refat Portfolio - GSAP Animations
 * Handles: Lenis, ScrollTrigger, SplitType, Parallax, Reveal, Typed.js, Marquee, Swiper, Tilt
 */

;(function () {
  'use strict'

  // Wait for main.js to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  function init () {
    if (typeof gsap === 'undefined') return

    registerScrollTrigger()
    setupLenis()
    setupTypedJS()
    setupHeroAnimations()
    setupSplitText()
    setupScrollReveals()
    setupParallax()
    setupTimelineAnimations()
    setupExpSkillsAnimations()
    setupDisabilityBars()
    setupSwiper()
    setupVanillaTilt()
    setupMarquee()
    // Gallery is handled by gallery.js
  }

  /* ------------------------------------------
     Register ScrollTrigger Plugin
     ------------------------------------------ */
  function registerScrollTrigger () {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
    }
  }

  /* ------------------------------------------
     Lenis Smooth Scroll
     ------------------------------------------ */
  function setupLenis () {
    if (typeof Lenis === 'undefined') return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Expose for debugging
    window.__lenis = lenis
  }

  /* ------------------------------------------
     Typed.js Initialization
     ------------------------------------------ */
  function setupTypedJS () {
    const el = document.getElementById('typedText')
    if (!el || typeof Typed === 'undefined') return

    new Typed(el, {
      strings: [
        'التربية الخاصة ^200',
        'العلاج الوظيفي ^200',
        'التكامل الحسي ^200',
        'الدعم التعليمي ^200',
        'التدخل المبكر للتوحد ^200',
        'تعديل السلوك ^200',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    })
  }

  /* ------------------------------------------
     Hero Animations
     ------------------------------------------ */
  function setupHeroAnimations () {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-badge', { opacity: 0, y: 30, duration: 0.8 })
      .from('.hero-name', { opacity: 0, y: 60, duration: 0.8 }, '-=0.4')
      .from('.hero-name-last', { opacity: 0, y: 60, duration: 0.8 }, '-=0.5')
      .from('.hero-headline', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
      .from('.hero-typed-container', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero-description', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero-cta .btn', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, '-=0.3')
      .from('.hero-stats', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
      .from('.hero-shape-wrap', { opacity: 0, scale: 0, duration: 1 }, '-=0.8')
      .from('.orbit-icon', { opacity: 0, scale: 0, duration: 0.4, stagger: 0.08 }, '-=0.6')
      .from('.scroll-indicator', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
  }

  /* ------------------------------------------
     Split Text (SplitType)
     ------------------------------------------ */
  function setupSplitText () {
    if (typeof SplitType === 'undefined') return

    const splitElements = document.querySelectorAll('.split-text')

    splitElements.forEach((el) => {
      const split = new SplitType(el, { types: 'lines,words' })

      split.words.forEach((word) => {
        gsap.set(word, { opacity: 0, y: 40, rotateX: -20 })
      })

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'power3.out',
          })
        },
      })
    })
  }

  /* ------------------------------------------
     Scroll Reveal Animations
     ------------------------------------------ */
  function setupScrollReveals () {
    // Fade up for expertise cards
    gsap.utils.toArray('.expertise-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.04,
      })
    })

    // Creative cards
    gsap.utils.toArray('.creative-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.04,
      })
    })

    // Service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.05,
      })
    })

    // Disability cards
    gsap.utils.toArray('.disability-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.04,
      })
    })

    // Achievement counter cards
    gsap.utils.toArray('.achievement-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.08,
      })
    })

    // Section headers
    gsap.utils.toArray('.section-header').forEach((header) => {
      gsap.from(header, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })

    // About content
    gsap.from('.about-content', {
      opacity: 0,
      x: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.about-image-wrap', {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-image-wrap',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.about-floating-card', {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: '.about-floating-card',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      stagger: 0.15,
    })

    // Contact form
    gsap.from('.contact-info', {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.contact-form-wrap', {
      opacity: 0,
      x: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Gallery items
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.06,
      })
    })

    // Footer content
    gsap.from('.footer-content > *', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      stagger: 0.1,
    })
  }

  /* ------------------------------------------
     Parallax Effects
     ------------------------------------------ */
  function setupParallax () {
    // Hero parallax
    gsap.to('.hero-bg-overlay', {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to('.hero-gradient', {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to('.hero-shape-wrap', {
      y: -40,
      scale: 0.95,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  /* ------------------------------------------
     Timeline Animations
     ------------------------------------------ */
  function setupTimelineAnimations () {
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      const direction = item.classList.contains('tl-right') ? 40 : -40

      gsap.from(item, {
        opacity: 0,
        x: direction,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.1,
      })
    })
  }

  /* ------------------------------------------
     Expertise & Skills Animations
     ------------------------------------------ */
  function setupExpSkillsAnimations () {
    // Stagger entry for expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card')
    if (expertiseCards.length) {
      ScrollTrigger.batch(expertiseCards, {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        },
      })
    }
  }

  /* ------------------------------------------
     Disability Bars Animation
     ------------------------------------------ */
  function setupDisabilityBars () {
    const bars = document.querySelectorAll('.disability-bar span')
    bars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = '0%'

      ScrollTrigger.create({
        trigger: bar.closest('.disability-card'),
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(bar, {
            width: width,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2,
          })
        },
      })
    })
  }

  /* ------------------------------------------
     Swiper Testimonials
     ------------------------------------------ */
  function setupSwiper () {
    if (typeof Swiper === 'undefined') return

    const swiperEl = document.getElementById('testimonialSwiper')
    if (!swiperEl) return

    new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '#testimonialPagination',
        clickable: true,
      },
      speed: 800,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    })
  }

  /* ------------------------------------------
     Vanilla Tilt for Cards
     ------------------------------------------ */
  function setupVanillaTilt () {
    if (typeof VanillaTilt === 'undefined') return

    const tiltElements = document.querySelectorAll('[data-tilt]')
    if (!tiltElements.length) return

    VanillaTilt.init(tiltElements, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      gyroscope: false,
    })
  }

  /* ------------------------------------------
     Infinite Marquee
     ------------------------------------------ */
  function setupMarquee () {
    const marquee = document.getElementById('creativeMarquee')
    if (!marquee) return

    const contents = marquee.querySelectorAll('.marquee-content')
    if (contents.length < 2) return

    let speed = 0.5 // pixels per frame
    let animId

    function animateMarquee () {
      contents.forEach((content) => {
        const x = parseFloat(content.dataset.x || 0) - speed
        content.dataset.x = x
        content.style.transform = `translateX(${x}px)`

        // Reset when first content is fully out of view
        const firstWidth = content.scrollWidth / 2
        if (x <= -firstWidth) {
          content.dataset.x = 0
        }
      })

      animId = requestAnimationFrame(animateMarquee)
    }

    animateMarquee()

    // Pause on hover
    marquee.addEventListener('mouseenter', () => { speed = 0 })
    marquee.addEventListener('mouseleave', () => { speed = 0.5 })

    // Cleanup
    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(animId)
    })
  }
})()
