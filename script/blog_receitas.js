async function carregarReceitas() {
    try {
      const response = await fetch('http://localhost:3000/api/blog-receitas');
      const dados = await response.json();
  
      const container = document.getElementById('receitasContainer');
      container.innerHTML = '';
  
      dados.forEach(receita => {
        const div = document.createElement('div');
        div.classList.add('card-dica');
        div.innerHTML = `<h3>${receita.Titulo}</h3><p>${receita.Conteudo}</p>`;
        container.appendChild(div);
      });
    } catch (error) {
      console.error('Erro ao carregar receitas:', error);
      document.getElementById('receitasContainer').innerText = 'Erro ao carregar conteúdo.';
    }
  }
  
  window.onload = carregarReceitas;
  