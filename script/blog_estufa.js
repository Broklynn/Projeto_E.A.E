async function carregarDicasEstufa() {
    try {
      const response = await fetch('http://localhost:3000/api/blog-estufa');
      const dados = await response.json();
  
      const container = document.getElementById('estufaContainer');
      container.innerHTML = '';
  
      dados.forEach(dica => {
        const div = document.createElement('div');
        div.classList.add('card-dica');
        div.innerHTML = `<h3>${dica.Titulo}</h3><p>${dica.Conteudo}</p>`;
        container.appendChild(div);
      });
    } catch (error) {
      console.error('Erro ao carregar dicas da estufa:', error);
      document.getElementById('estufaContainer').innerText = 'Erro ao carregar conteúdo.';
    }
  }
  
  window.onload = carregarDicasEstufa;
  