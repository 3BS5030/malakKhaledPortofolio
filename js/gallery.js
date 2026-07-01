;(function () {
  'use strict'

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  let currentIndex = 0
  let certItems = []
  const overlay = document.getElementById('certLightbox')
  const image = document.getElementById('lightboxImage')
  const counter = document.getElementById('lightboxCounter')
  const closeBtn = document.getElementById('lightboxClose')
  const prevBtn = document.getElementById('lightboxPrev')
  const nextBtn = document.getElementById('lightboxNext')

  function init () {
    setupCertFilters()
    setupLightbox()
    setupCertReveals()
    setupCertParallax()
  }

  /* ------------------------------------------
     Certificate Filtering
     ------------------------------------------ */
  function setupCertFilters () {
    const filters = document.querySelectorAll('.cert-filter')
    const items = document.querySelectorAll('.cert-item')

    if (!filters.length || !items.length) return

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        filters.forEach((b) => b.classList.remove('active'))
        btn.classList.add('active')

        const filter = btn.getAttribute('data-filter')

        items.forEach((item) => {
          const category = item.getAttribute('data-category')

          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden')
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(item, { opacity: 0, y: 20, scale: 0.95 }, {
                opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out',
              })
            }
          } else {
            if (typeof gsap !== 'undefined') {
              gsap.to(item, {
                opacity: 0, y: -20, scale: 0.95, duration: 0.3, ease: 'power2.in',
                onComplete: () => item.classList.add('hidden'),
              })
            } else {
              item.classList.add('hidden')
            }
          }
        })
      })
    })
  }

  /* ------------------------------------------
     Custom Lightbox
     ------------------------------------------ */
  function setupLightbox () {
    certItems = document.querySelectorAll('.cert-item')

    document.addEventListener('click', function (e) {
      const link = e.target.closest('.cert-link')
      if (!link) return

      e.preventDefault()

      const href = link.getAttribute('href')
      if (!href) return

      const parent = link.closest('.cert-item')
      if (parent) {
        currentIndex = Array.from(certItems).indexOf(parent)
      }

      openLightbox(href)
    })

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox)
    if (prevBtn) prevBtn.addEventListener('click', showPrev)
    if (nextBtn) nextBtn.addEventListener('click', showNext)

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    })

    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox()
      })
    }
  }

  function openLightbox (src) {
    if (!overlay || !image) return
    image.src = src
    image.alt = 'شهادة'
    overlay.classList.add('active')
    document.body.style.overflow = 'hidden'
    updateCounter()
  }

  function closeLightbox () {
    if (!overlay) return
    overlay.classList.remove('active')
    document.body.style.overflow = ''
  }

  function getVisibleItems () {
    return Array.from(certItems).filter(function (item) {
      return !item.classList.contains('hidden')
    })
  }

  function showPrev () {
    const visible = getVisibleItems()
    if (!visible.length) return
    currentIndex = (currentIndex - 1 + visible.length) % visible.length
    const link = visible[currentIndex].querySelector('.cert-link')
    if (link) {
      const href = link.getAttribute('href')
      if (href) {
        image.src = href
        image.alt = visible[currentIndex].querySelector('.cert-info h3')?.textContent || 'شهادة'
        updateCounter()
      }
    }
  }

  function showNext () {
    const visible = getVisibleItems()
    if (!visible.length) return
    currentIndex = (currentIndex + 1) % visible.length
    const link = visible[currentIndex].querySelector('.cert-link')
    if (link) {
      const href = link.getAttribute('href')
      if (href) {
        image.src = href
        image.alt = visible[currentIndex].querySelector('.cert-info h3')?.textContent || 'شهادة'
        updateCounter()
      }
    }
  }

  function updateCounter () {
    if (!counter) return
    const visible = getVisibleItems()
    const total = visible.length
    const idx = visible.indexOf(certItems[currentIndex])
    counter.textContent = (idx + 1) + ' / ' + total
  }

  /* ------------------------------------------
     GSAP Scroll Reveal for Certificates
     ------------------------------------------ */
  function setupCertReveals () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return

    const items = document.querySelectorAll('.cert-item')

    items.forEach(function (item, index) {
      gsap.set(item, { opacity: 0, y: 40, rotateX: 10 })

      ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        toggleActions: 'play none none none',
        once: true,
        onEnter: function () {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.08,
          })

          gsap.fromTo(
            item.querySelector('.cert-image-wrap'),
            { scale: 0.95 },
            {
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
              delay: index * 0.08 + 0.3,
            }
          )
        },
      })
    })

    // Stack effect
    items.forEach(function (item, index) {
      const wrap = item.querySelector('.cert-image-wrap')
      if (!wrap) return

      const rotation = index % 2 === 0 ? -1 : 1
      const zOffset = index * 2

      gsap.set(wrap, {
        rotateZ: rotation,
        z: zOffset,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      })

      wrap.addEventListener('mouseenter', function () {
        gsap.to(wrap, {
          rotateZ: 0,
          z: 20,
          duration: 0.4,
          ease: 'power3.out',
        })
      })

      wrap.addEventListener('mouseleave', function () {
        gsap.to(wrap, {
          rotateZ: rotation,
          z: zOffset,
          duration: 0.4,
          ease: 'power3.out',
        })
      })
    })
  }

  /* ------------------------------------------
     Mouse Parallax
     ------------------------------------------ */
  function setupCertParallax () {
    if (typeof gsap === 'undefined') return

    const wrappers = document.querySelectorAll('.cert-image-wrap')

    wrappers.forEach(function (wrap) {
      wrap.addEventListener('mousemove', function (e) {
        const rect = wrap.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5

        gsap.to(wrap, {
          x: x * 8,
          y: y * 8,
          rotateX: y * -4,
          rotateY: x * 4,
          duration: 0.6,
          ease: 'power2.out',
        })
      })

      wrap.addEventListener('mouseleave', function () {
        gsap.to(wrap, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out',
        })
      })
    })
  }
})()
