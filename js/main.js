/**
 * Malak Refat Portfolio - Main JavaScript
 * Core functionality: Navigation, Cursor, Preloader, Particles, Theme Toggle, Back to Top, Magnetic Buttons, ScrollSpy, Counters, Form
 */

;(function () {
  'use strict'

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  function init () {
    setupPreloader()
    setupCursor()
    setupNavigation()
    setupThemeToggle()
    setupBackToTop()
    setupMagneticButtons()
    setupScrollSpy()
    setupCounters()
    setupForm()
    setupFooterYear()
    setupParticles()
    setupThreeBackground()
    initAOS()
    dispatchReady()
  }

  /* ------------------------------------------
     Preloader
     ------------------------------------------ */
  function setupPreloader () {
    const preloader = document.getElementById('preloader')
    if (!preloader) return

    window.addEventListener('load', () => {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => preloader.classList.add('hidden')
      })
    })

    // Fallback: hide after 3s
    setTimeout(() => {
      if (!preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden')
      }
    }, 3000)
  }

  /* ------------------------------------------
     Custom Cursor
     ------------------------------------------ */
  function setupCursor () {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    const cursor = document.getElementById('cursor')
    if (!dot || !ring || !cursor) return

    cursor.style.display = 'block'
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let dotX = 0, dotY = 0

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    })

    function animateRing () {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animateRing)
    }
    animateRing()

    // Hover targets
    const hoverTargets = document.querySelectorAll(
      'a, button, .btn, .cert-image-wrap, .gallery-item, .social-link, .tilt-card, .nav-link'
    )
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover-target'))
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover-target'))
    })

    // Glow effect
    const glow = document.getElementById('mouseGlow')
    if (glow) {
      document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px'
        glow.style.top = e.clientY + 'px'
      })
    }
  }

  /* ------------------------------------------
     Navigation
     ------------------------------------------ */
  function setupNavigation () {
    const header = document.getElementById('header')
    const navToggle = document.getElementById('navToggle')
    const navClose = document.getElementById('navClose')
    const navMenu = document.getElementById('navMenu')
    const navLinks = document.querySelectorAll('.nav-link')

    if (!navToggle || !navMenu) return

    // Mobile toggle
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active')
      navToggle.setAttribute('aria-expanded', isOpen)
      document.body.style.overflow = isOpen ? 'hidden' : ''
    })

    if (navClose) {
      navClose.addEventListener('click', closeNav)
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', closeNav)
    })

    function closeNav () {
      navMenu.classList.remove('active')
      navToggle.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
    }

    // Header scroll effect
    let lastScroll = 0
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY
      if (scrollY > 80) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
      lastScroll = scrollY
    }, { passive: true })
  }

  /* ------------------------------------------
     Theme Toggle
     ------------------------------------------ */
  function setupThemeToggle () {
    const toggle = document.getElementById('themeToggle')
    if (!toggle) return

    const icon = toggle.querySelector('i')

    // Check saved preference
    const saved = localStorage.getItem('malak-theme')
    if (saved === 'light') {
      document.body.classList.add('light-mode')
      icon.className = 'fas fa-sun'
    }

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode')
      const isLight = document.body.classList.contains('light-mode')
      icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon'
      localStorage.setItem('malak-theme', isLight ? 'light' : 'dark')
    })
  }

  /* ------------------------------------------
     Back to Top Button
     ------------------------------------------ */
  function setupBackToTop () {
    const btn = document.getElementById('backToTop')
    if (!btn) return

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible')
      } else {
        btn.classList.remove('visible')
      }
    }, { passive: true })

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  /* ------------------------------------------
     Magnetic Buttons
     ------------------------------------------ */
  function setupMagneticButtons () {
    const magnets = document.querySelectorAll('.magnetic-btn')
    magnets.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
      })

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = ''
      })
    })
  }

  /* ------------------------------------------
     ScrollSpy for Navigation
     ------------------------------------------ */
  function setupScrollSpy () {
    const sections = document.querySelectorAll('.section[id]')
    const navLinks = document.querySelectorAll('.nav-link')

    if (!sections.length || !navLinks.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            navLinks.forEach((link) => {
              link.classList.remove('active')
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active')
              }
            })
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
  }

  /* ------------------------------------------
     Animated Counters
     ------------------------------------------ */
  function setupCounters () {
    const counters = document.querySelectorAll('.counter-num, .about-stat-num')
    if (!counters.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const target = parseInt(el.getAttribute('data-target'), 10)
            animateCounter(el, target)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )

    counters.forEach((el) => observer.observe(el))
  }

  function animateCounter (el, target) {
    let current = 0
    const duration = 2000
    const stepTime = Math.max(16, duration / target)
    const increment = Math.max(1, Math.floor(target / (duration / 16)))

    function tick () {
      current += increment
      if (current >= target) {
        el.textContent = target
        return
      }
      el.textContent = current
      requestAnimationFrame(tick)
    }
    tick()
  }

  /* ------------------------------------------
     Hero Stats Counters
     ------------------------------------------ */
  // Re-use for hero stats
  document.addEventListener('DOMContentLoaded', () => {
    const heroNums = document.querySelectorAll('.hero-stat-number[data-count]')
    heroNums.forEach((el) => {
      const target = parseInt(el.getAttribute('data-count'), 10)
      // Start counting when hero is in view
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animateCounter(el, target)
            observer.unobserve(el)
          }
        },
        { threshold: 0.5 }
      )
      observer.observe(el)
    })
  })

  /* ------------------------------------------
     Contact Form
     ------------------------------------------ */
  function setupForm () {
    const form = document.getElementById('contactForm')
    if (!form) return

    form.addEventListener('submit', (e) => {
      e.preventDefault()

      const name = form.querySelector('#formName').value.trim()
      const email = form.querySelector('#formEmail').value.trim()
      const subject = form.querySelector('#formSubject').value.trim()
      const message = form.querySelector('#formMessage').value.trim()

      if (!name || !email || !subject || !message) {
        showFormMessage('يرجى ملء جميع الحقول.', 'error')
        return
      }

      if (!isValidEmail(email)) {
        showFormMessage('يرجى إدخال بريد إلكتروني صحيح.', 'error')
        return
      }

      const btn = form.querySelector('button[type="submit"]')
      const originalText = btn.innerHTML
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      btn.disabled = true

  // Simulate send (replace with actual service)
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح!'
        btn.style.background = 'linear-gradient(135deg, #2ecc71, #1a9c54)'

        setTimeout(() => {
          btn.innerHTML = originalText
          btn.style.background = ''
          btn.disabled = false
          form.reset()
        }, 3000)

        showFormMessage('شكراً! تم إرسال رسالتك بنجاح.', 'success')
      }, 1500)
    })
  }

  function isValidEmail (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function showFormMessage (text, type) {
    const existing = document.querySelector('.form-message')
    if (existing) existing.remove()

    const msg = document.createElement('div')
    msg.className = `form-message form-message--${type}`
    msg.textContent = text
    msg.style.cssText = `
      padding: 12px 16px;
      border-radius: 8px;
      margin-top: 16px;
      font-size: 0.85rem;
      background: ${type === 'error' ? 'rgba(231, 76, 60, 0.1)' : 'rgba(46, 204, 113, 0.1)'};
      border: 1px solid ${type === 'error' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(46, 204, 113, 0.2)'};
      color: ${type === 'error' ? '#e74c3c' : '#2ecc71'};
    `

    const form = document.getElementById('contactForm')
    form.appendChild(msg)

    setTimeout(() => msg.remove(), 5000)
  }

  /* ------------------------------------------
     Footer Year
     ------------------------------------------ */
  function setupFooterYear () {
    const el = document.getElementById('footerYear')
    if (el) el.textContent = new Date().getFullYear()
  }

  /* ------------------------------------------
     Particle Background
     ------------------------------------------ */
  function setupParticles () {
    const canvas = document.getElementById('particleCanvas')
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let particles = []
    let animId
    let mouseX = -1000, mouseY = -1000
    let w, h

    function resize () {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Track mouse for interaction
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    class Particle {
      constructor () {
        this.reset()
      }

      reset () {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.opacity = Math.random() * 0.4 + 0.1
        this.hue = Math.random() > 0.5 ? 42 : 150 // Gold or Emerald
      }

      update () {
        this.x += this.speedX
        this.y += this.speedY

        // Mouse repulsion
        const dx = this.x - mouseX
        const dy = this.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          this.x += dx * force * 0.02
          this.y += dy * force * 0.02
        }

        if (this.x < -10 || this.x > w + 10 || this.y < -10 || this.y > h + 10) {
          this.reset()
        }
      }

      draw () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.hue === 42
          ? `rgba(201, 168, 76, ${this.opacity})`
          : `rgba(46, 204, 113, ${this.opacity})`
        ctx.fill()
      }
    }

    const particleCount = Math.min(80, Math.floor((w * h) / 15000))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function connectParticles () {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.04 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    function animateParticles () {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      connectParticles()
      animId = requestAnimationFrame(animateParticles)
    }

    animateParticles()

    // Cleanup
    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(animId)
    })
  }

  /* ------------------------------------------
     Three.js Background (Light Effects)
     ------------------------------------------ */
  function setupThreeBackground () {
    if (typeof THREE === 'undefined') return

    const container = document.createElement('div')
    container.id = 'threeBg'
    document.body.prepend(container)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Create floating light orbs
    const geometry = new THREE.SphereGeometry(1, 16, 16)
    const lights = []

    const positions = [
      { x: -3, y: 2, z: -5, color: 0xc9a84c, size: 0.8 },
      { x: 4, y: -1, z: -6, color: 0x2ecc71, size: 0.6 },
      { x: -2, y: -3, z: -4, color: 0x7ec8e3, size: 0.5 },
      { x: 3, y: 3, z: -7, color: 0xc9a84c, size: 0.4 }
    ]

    positions.forEach((pos) => {
      const material = new THREE.MeshBasicMaterial({
        color: pos.color,
        transparent: true,
        opacity: 0.08,
      })
      const sphere = new THREE.Mesh(geometry.clone(), material)
      sphere.position.set(pos.x, pos.y, pos.z)
      sphere.scale.set(pos.size, pos.size, pos.size)
      scene.add(sphere)
      lights.push({ mesh: sphere, speed: 0.2 + Math.random() * 0.3, offset: Math.random() * Math.PI * 2 })
    })

    camera.position.z = 8

    let mouseX3d = 0, mouseY3d = 0
    document.addEventListener('mousemove', (e) => {
      mouseX3d = (e.clientX / window.innerWidth) * 2 - 1
      mouseY3d = -(e.clientY / window.innerHeight) * 2 + 1
    })

    function animate3d () {
      requestAnimationFrame(animate3d)

      const time = Date.now() * 0.0005

      lights.forEach((light, i) => {
        light.mesh.position.x += Math.sin(time * light.speed + light.offset) * 0.002
        light.mesh.position.y += Math.cos(time * light.speed * 0.7 + light.offset) * 0.002
      })

      camera.position.x += (mouseX3d * 1.5 - camera.position.x) * 0.02
      camera.position.y += (mouseY3d * 1.5 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate3d()

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  /* ------------------------------------------
     AOS Initialization
     ------------------------------------------ */
  function initAOS () {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
      })
    }
  }

  /* ------------------------------------------
     Custom Ready Event
     ------------------------------------------ */
  function dispatchReady () {
    document.dispatchEvent(new CustomEvent('malak:ready'))
  }
})()
