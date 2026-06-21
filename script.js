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
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
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
