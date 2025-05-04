fetch('/api/dicas')
  .then(res => res.json())
  .then(dicas => {
    const wrapper = document.getElementById('dicas-wrapper');
    dicas.forEach(dica => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <div class="dica">
          <strong>${dica.planta}</strong><br>${dica.dica}
        </div>
      `;
      wrapper.appendChild(slide);
    });

    new Swiper('.swiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      }
    });
  });
