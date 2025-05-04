function toggleSearchBar(event) {
    const searchBar = document.querySelector('.barra-pesquisa');
    const pesquisaIcon = document.querySelector('.pesquisa');

    // Impede que o clique no ícone de pesquisa ou na barra de pesquisa feche a barra
    event.stopPropagation();

    // Alterna a visibilidade da barra de pesquisa
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'block';
    } else {
        searchBar.style.display = 'none';
    }
}

// Fecha a barra de pesquisa se o clique for fora do ícone ou da barra
document.addEventListener('click', function(event) {
    const searchBar = document.querySelector('.barra-pesquisa');
    const pesquisaIcon = document.querySelector('.pesquisa');

    if (!pesquisaIcon.contains(event.target)) {
        searchBar.style.display = 'none';
    }
});