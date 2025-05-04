let currentIndex = 0;
let dicas = [];

async function carregarDicas() {
  try {
    const response = await fetch('http://localhost:3000/api/dicas');
    dicas = await response.json();

    const container = document.getElementById('dicasContainer');
    container.innerHTML = '';  

    
    displayDicas();

    setInterval(() => {
      avancarDica(); 
    }, 5000);

  } catch (error) {
    console.error('Erro ao carregar dicas:', error);
    document.getElementById('dicasContainer').innerText = 'Não foi possível carregar as dicas.';
  }
}

function displayDicas() {
  const container = document.getElementById('dicasContainer');
  container.innerHTML = ''; 

  for (let i = 0; i < 3 && currentIndex < dicas.length; i++) {
    const dica = dicas[currentIndex++];
    const div = document.createElement('div');
    div.classList.add('dica');
    div.innerHTML = `<strong>${dica.planta}:</strong>\n${dica.dica}`;
    container.appendChild(div);
  }
}

function avancarDica() {
  if (currentIndex < dicas.length) {
    displayDicas();
  } else {
    currentIndex = 0; 
    displayDicas();
  }
}

function voltarDica() {
  if (currentIndex > 3) {
    currentIndex -= 6; 
    displayDicas();
  }
}

window.onload = carregarDicas;
