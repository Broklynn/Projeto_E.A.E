document.addEventListener('DOMContentLoaded', () => {
    const logado = localStorage.getItem('usuarioLogado');
    if (logado !== 'true') {
      window.location.href = '/html/usuario.html';
      return;
    }
  
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = '/html/usuario.html';
      });
    }
  
    function gerarDados() {
      const umidadeSolo = Math.floor(Math.random() * 101);
      const umidadeAr = Math.floor(Math.random() * 101);
      const temperaturaAgua = (Math.random() * 30 + 10).toFixed(2);
  
      atualizarDashboard(umidadeSolo, umidadeAr, parseFloat(temperaturaAgua));
    }
  
    const umidadeSolo = document.getElementById('umidade-solo');
  const umidadeAr = document.getElementById('umidade-ar');
  const temperaturaAgua = document.getElementById('temperatura-agua');
  let atual = {
    solo: 0,
    ar: 0,
    agua: 0,
  };

  function gerarValor(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }

  function animateValue(element, start, end, suffix = '', duration = 1000) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (end - start) * progress;
      element.textContent = value.toFixed(2) + ' ' + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = end.toFixed(2) + ' ' + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function atualizarDashboard() {
    const novoSolo = gerarValor(20, 80);
    const novoAr = gerarValor(30, 70);
    const novaTemp = gerarValor(18, 35);

    animateValue(umidadeSolo, atual.solo, novoSolo, '%');
    animateValue(umidadeAr, atual.ar, novoAr, '%');
    animateValue(temperaturaAgua, atual.agua, novaTemp, 'ºC');

    aplicarAnimacao(umidadeSolo);
    aplicarAnimacao(umidadeAr);
    aplicarAnimacao(temperaturaAgua);

    atual = {
      solo: novoSolo,
      ar: novoAr,
      agua: novaTemp,
    };
  }

  function aplicarAnimacao(elemento) {
    const grafico = elemento.closest('.grafico');
    if (grafico) {
      grafico.classList.add('animate');
      setTimeout(() => grafico.classList.remove('animate'), 600); 
    }
  }

  
  atualizarDashboard();
  setInterval(atualizarDashboard, 5000);
  });
  