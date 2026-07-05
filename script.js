// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  // Modal logic
  const modal = document.getElementById('modal');
  if (modal) {
    const modalContentContainer = document.getElementById('modal-content-container');
    const closeBtn = document.querySelector('.modal-close');
    const cards = document.querySelectorAll('.card');

    const albums = {
      artwork: [
        "images/IMG-20260417-WA0005.jpg.jpeg",
        "images/WhatsApp Image 2026-05-12 at 1.20.43 PM.jpeg",
        "images/communiti artwork 2.5ft(w) 4ft(h).jpg",
        "images/Womens day  Calander standee 2ft 3ft VNH RR march.jpg",
        "images/Candle Light dinner menu (A4)/1.jpg",
        "images/Candle Light dinner menu (A4)/2.jpg",
        "images/Candle Light/1.jpg",
        "images/calendar  standee JUNE 2ft 3ft/1.jpg",
        "images/calendar  standee JUNE 2ft 3ft/2.jpg",
        "images/calendar  standee JUNE 2ft 3ft/3.jpg",
        "images/calendar  standee JUNE 2ft 3ft/4.jpg",
        "images/calendar  standee may 2ft 3ft/3.jpg",
        "images/calendar  standee may 2ft 3ft/4.jpg",
        "images/calendar  standee may 2ft 3ft/Communiti.jpg",
        "images/calendar  standee may 2ft 3ft/VRH.jpg",
        "images/lunch and brunch standee 2.5ft(w) 4ft (h).jpg.jpeg"
      ]
    };

    const multiCarousels = {
      carousels: [
        [
          "images/Orange White Bold Minimal Financial Tips Instagram Carousel/1.jpg",
          "images/Orange White Bold Minimal Financial Tips Instagram Carousel/2.jpg",
          "images/Orange White Bold Minimal Financial Tips Instagram Carousel/3.jpg",
          "images/Orange White Bold Minimal Financial Tips Instagram Carousel/Nutrition Tips.jpg",
          "images/Orange White Bold Minimal Financial Tips Instagram Carousel/Travel Destinations.jpg"
        ],
        [
          "images/Navy White Modern Maximize Your Savings Instagram Carousel Post/1.jpg",
          "images/Navy White Modern Maximize Your Savings Instagram Carousel Post/2.jpg",
          "images/Navy White Modern Maximize Your Savings Instagram Carousel Post/3.jpg",
          "images/Navy White Modern Maximize Your Savings Instagram Carousel Post/4.jpg",
          "images/Navy White Modern Maximize Your Savings Instagram Carousel Post/5.jpg",
          "images/Navy White Modern Maximize Your Savings Instagram Carousel Post/6.jpg",
          "images/Navy White Modern Maximize Your Savings Instagram Carousel Post/7.jpg",
          "images/Navy White Modern Maximize Your Savings Instagram Carousel Post/8.jpg",
          "images/Navy White Modern Maximize Your Savings Instagram Carousel Post/9.jpg",
          "images/Navy White Modern Maximize Your Savings Instagram Carousel Post/10.jpg"
        ]
      ]
    };

    function createSlideshowElement(images, onBack) {
      let currentIndex = 0;
      
      const container = document.createElement('div');
      container.className = 'slideshow-container';
      
      const img = document.createElement('img');
      img.src = images[currentIndex];
      img.className = 'slideshow-image';
      
      const prevBtn = document.createElement('button');
      prevBtn.className = 'slideshow-btn prev-btn';
      prevBtn.innerHTML = '&#10094;';
      prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        img.src = images[currentIndex];
        updateCounter();
      };

      const nextBtn = document.createElement('button');
      nextBtn.className = 'slideshow-btn next-btn';
      nextBtn.innerHTML = '&#10095;';
      nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % images.length;
        img.src = images[currentIndex];
        updateCounter();
      };
      
      const counter = document.createElement('div');
      counter.className = 'slideshow-counter';
      const updateCounter = () => {
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
      };
      updateCounter();
      
      container.appendChild(prevBtn);
      container.appendChild(img);
      container.appendChild(nextBtn);
      container.appendChild(counter);
      
      if (onBack) {
        const backBtn = document.createElement('button');
        backBtn.className = 'fullscreen-back-btn';
        backBtn.innerHTML = '&larr; Back';
        backBtn.onclick = onBack;
        container.appendChild(backBtn);
      }
      
      return container;
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const type = card.dataset.type; // 'image', 'iframe', or 'link'
        
        if (type === 'link') return; // Skip modal for external links

        const label = card.querySelector('.card-label').textContent;

        modalContentContainer.innerHTML = ''; // Clear previous

        if (type === 'image') {
          // Display actual image in modal
          const imgSrc = card.dataset.src;
          if (imgSrc) {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = label;
            img.style.maxWidth = '90vw';
            img.style.maxHeight = '80vh';
            img.style.objectFit = 'contain';
            img.style.borderRadius = 'var(--border-radius)';
            modalContentContainer.appendChild(img);
          } else {
            // Fallback for placeholder cards
            const img = document.createElement('div');
            img.style.width = '80vw';
            img.style.height = '80vh';
            img.style.backgroundColor = 'var(--card-bg)';
            img.style.display = 'flex';
            img.style.justifyContent = 'center';
            img.style.alignItems = 'center';
            img.style.color = 'var(--text-primary)';
            img.style.fontSize = '2rem';
            img.style.fontWeight = '900';
            img.style.borderRadius = 'var(--border-radius)';
            img.textContent = label;
            modalContentContainer.appendChild(img);
          }
        } else if (type === 'iframe') {
          // Placeholder logic for iframe modal
          const iframeSrc = card.dataset.src || '';
          const iframe = document.createElement('iframe');
          iframe.src = iframeSrc;
          
          const liveLink = document.createElement('a');
          liveLink.href = iframeSrc || '#';
          liveLink.className = 'live-link';
          liveLink.target = '_blank';
          liveLink.innerHTML = 'Open Live Site &nearr;';
          
          modalContentContainer.appendChild(iframe);
          modalContentContainer.appendChild(liveLink);
        } else if (type === 'book') {
          const bookImages = [];
          for (let i = 1; i <= 20; i++) {
            bookImages.push(`images/Communiti  180mm(w) 235mm(h)/${i}.jpg`);
          }
          modalContentContainer.appendChild(createSlideshowElement(bookImages, null));
        } else if (type === 'album') {
          const albumId = card.dataset.album;
          const images = albums[albumId] || [];
          
          const albumGrid = document.createElement('div');
          albumGrid.className = 'modal-album-grid';
          
          images.forEach(src => {
            const wrapper = document.createElement('div');
            wrapper.className = 'album-thumbnail';
            const img = document.createElement('img');
            img.src = src;
            wrapper.appendChild(img);
            
            wrapper.addEventListener('click', () => {
              const fsContainer = document.createElement('div');
              fsContainer.className = 'fullscreen-viewer';
              
              const fsImg = document.createElement('img');
              fsImg.src = src;
              
              const backBtn = document.createElement('button');
              backBtn.className = 'fullscreen-back-btn';
              backBtn.innerHTML = '&larr; Back to Album';
              backBtn.onclick = () => fsContainer.remove();
              
              fsContainer.appendChild(backBtn);
              fsContainer.appendChild(fsImg);
              
              modal.appendChild(fsContainer);
            });
            
            albumGrid.appendChild(wrapper);
          });
          
          modalContentContainer.appendChild(albumGrid);
          
        } else if (type === 'multi-carousel') {
          const carouselsId = card.dataset.id;
          const carouselList = multiCarousels[carouselsId] || [];
          
          const grid = document.createElement('div');
          grid.className = 'modal-album-grid';
          
          carouselList.forEach(images => {
            const wrapper = document.createElement('div');
            wrapper.className = 'album-thumbnail';
            const coverImg = document.createElement('img');
            coverImg.src = images[0];
            wrapper.appendChild(coverImg);
            
            wrapper.addEventListener('click', () => {
              const fsContainer = document.createElement('div');
              fsContainer.className = 'fullscreen-viewer';
              
              const slideshow = createSlideshowElement(images, () => fsContainer.remove());
              fsContainer.appendChild(slideshow);
              
              modal.appendChild(fsContainer);
            });
            
            grid.appendChild(wrapper);
          });
          
          modalContentContainer.appendChild(grid);
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      const activeFullscreen = modal.querySelector('.fullscreen-viewer');
      if (activeFullscreen) activeFullscreen.remove();
      
      setTimeout(() => {
        modalContentContainer.innerHTML = ''; // Clean up after transition
      }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
});
