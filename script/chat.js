const chatBox = document.getElementById("comentario-box");

document.getElementById("comentario-icon").addEventListener("click", () => {
  chatBox.style.display = "flex";
});

document.getElementById("fechar-chat").addEventListener("click", () => {
  chatBox.style.display = "none";
});

function enviarComentario() {
  const texto = chatBox.querySelector("textarea").value.trim();
  if (texto) {
    const ul = document.getElementById("comentarios-ul");
    const li = document.createElement("li");
    li.textContent = texto;
    ul.appendChild(li);
    chatBox.querySelector("textarea").value = "";
    chatBox.style.display = "none";
  }
}

function alternarComentarios() {
  const div = document.getElementById("lista-comentarios");
  div.style.display = div.style.display === "none" ? "block" : "none";
}
