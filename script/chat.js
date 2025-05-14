document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("comentario-box");
  const comentarioIcon = document.getElementById("comentario-icon");
  const fecharChat = document.getElementById("fechar-chat");
  const comentariosUl = document.getElementById("comentarios-ul");

  const curtirIcon = document.getElementById("curtir-icon");
  const contador = document.getElementById("curtidas-contador");
  let curtiu = false;
  let totalCurtidas = 0;

  // Abrir caixa de comentário
  comentarioIcon.addEventListener("click", () => {
    chatBox.style.display = "flex";
  });

  // Fechar caixa de comentário
  fecharChat.addEventListener("click", () => {
    chatBox.style.display = "none";
  });

  window.enviarComentario = function () {
    const texto = chatBox.querySelector("textarea").value.trim();
    const nomeUsuario = localStorage.getItem("usuarioNome") || "Anônimo";

    if (texto) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${nomeUsuario}:</strong> ${texto}`;
      comentariosUl.appendChild(li);
      chatBox.querySelector("textarea").value = "";
      chatBox.style.display = "none";
    }
  };

  window.alternarComentarios = function () {
    const lista = document.getElementById("lista-comentarios");
    lista.style.display = lista.style.display === "none" ? "block" : "none";
  };


  curtirIcon.addEventListener("click", () => {
    curtiu = !curtiu;

    if (curtiu) {
      curtirIcon.textContent = "❤️";
      curtirIcon.style.color = "red";
      totalCurtidas++;
    } else {
      curtirIcon.textContent = "🤍";
      curtirIcon.style.color = "black";
      totalCurtidas--;
    }

    contador.textContent = totalCurtidas;
  });
});
