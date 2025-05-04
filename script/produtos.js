function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinho.find(p => p.nome === nome);
  
    if (produtoExistente) {
      produtoExistente.quantidade += 1;
    } else {
      carrinho.push({ nome, preco, quantidade: 1 });
    }
  
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert('Produto adicionado ao carrinho!');
  }
  