function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const tabela = document.querySelector('#tabelaCarrinho tbody');
    const valorTotalEl = document.getElementById('valorTotal');
    let total = 0;
    tabela.innerHTML = '';
  
    carrinho.forEach((item, index) => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;
  
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${item.nome}</td>
        <td>R$ ${item.preco.toFixed(2)}</td>
        <td>${item.quantidade}</td>
        <td>R$ ${subtotal.toFixed(2)}</td>
        <td><button class="btn-remover" onclick="removerItem(${index})">X</button></td>
      `;
      tabela.appendChild(linha);
    });
  
    valorTotalEl.textContent = total.toFixed(2);
  }
  
  function removerItem(index) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
  }
  
  window.onload = carregarCarrinho;
  