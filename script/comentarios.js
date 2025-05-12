function enviarComentario() {
  const comentario = document.getElementById('inputComentario').value;
  const usuarioId = localStorage.getItem('usuarioId');

  fetch('/api/comentarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto: comentario, usuarioId })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.mensagem || 'Comentário enviado!');
    document.getElementById('inputComentario').value = '';
  })
  .catch(error => console.error('Erro ao enviar comentário:', error));
}
