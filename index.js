 // Scroll header hide/show
    let lastScroll = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hide');
      } else if (currentScroll < lastScroll) {
        header.classList.remove('hide');
      }
      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Animate on scroll
    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });
    animatedSections.forEach(section => observer.observe(section));

    // Carousel logic
    const carousel = document.getElementById('carousel');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    let current = 0;

    function updateCarousel() {
      const offset = -current * (items[0].offsetWidth + 20); // width + margin (10 left + 10 right)
      carousel.style.transform = `translateX(${offset}px)`;

      items.forEach((el, i) => {
        if (i === current) {
          el.classList.add('active');
          el.classList.remove('inactive');
        } else {
          el.classList.add('inactive');
          el.classList.remove('active');
        }
      });
    }

    updateCarousel();

    // Swipe support
    let startX = 0;
    carousel.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (diff > 50) {
        current = (current + 1) % items.length;
      } else if (diff < -50) {
        current = (current - 1 + items.length) % items.length;
      }
      updateCarousel();
    });

    // Optional: mouse drag (desktop)
    let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0, animationID = 0;

    carousel.addEventListener('mousedown', e => {
      isDragging = true;
      startPos = e.pageX;
      carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseup', e => {
      isDragging = false;
      carousel.style.cursor = 'grab';
      const movedBy = startPos - e.pageX;
      if (movedBy > 50) current = (current + 1) % items.length;
      else if (movedBy < -50) current = (current - 1 + items.length) % items.length;
      updateCarousel();
    });

    carousel.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        carousel.style.cursor = 'grab';
        updateCarousel();
      }
    });

    carousel.addEventListener('mousemove', e => {
      if (!isDragging) return;
      // Could add drag effect here if needed
    });