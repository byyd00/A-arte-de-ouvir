// fase1.js

let tempoRestante = 60; // Tempo restante em segundos
let intervaloCronometro = null;

function iniciarCronometro() {
  const cronometro = document.getElementById("cronometro");
  tempoRestante = 60; // Reinicia o tempo para 60 segundos
  cronometro.textContent = tempoRestante;
  cronometro.style.display = "block"; // Exibe o cronômetro

  if (intervaloCronometro) clearInterval(intervaloCronometro); // Limpa o intervalo anterior
  intervaloCronometro = setInterval(() => {
    tempoRestante--;
    cronometro.textContent = tempoRestante;
    if (tempoRestante <= 0) {
      clearInterval(intervaloCronometro);
      pularPergunta(); // Chama a função para pular a pergunta quando o tempo acabar
    }
  }, 1000); // Atualiza a cada segundo
}

function pararCronometro() {
  const cronometro = document.getElementById("cronometro");
  cronometro.style.display = "none"; // Esconde o cronômetro
  if (intervaloCronometro) clearInterval(intervaloCronometro); // Limpa o intervalo do cronômetro
}

// Zera a pontuação no início do quiz
if (window.location.href.includes("P1F1.html")) {
  localStorage.setItem("pontuacaoFase1", 0);
}

// Adiciona o evento aos botões com data-pontos
// ...código existente...

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("button[data-pontos]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const pontos = parseInt(botao.dataset.pontos);
      salvarPontuacao(pontos);
      irParaProximaPergunta();
    });
  });
});

// ...código existente...

// Salva pontuação no localStorage
function salvarPontuacao(pontos) {
  let pontuacaoAtual = parseInt(localStorage.getItem("pontuacaoFase1")) || 0;
  pontuacaoAtual += pontos;
  localStorage.setItem("pontuacaoFase1", pontuacaoAtual);
}

// Vai para a próxima pergunta ou resultado
function irParaProximaPergunta() {
  const urlAtual = window.location.href;

  // Regex adaptada para minúsculo, com case-insensitive (i)
  const match = urlAtual.match(/P(\d+)F1\.html/i);

  if (match) {
    const numeroAtual = parseInt(match[1]);
    const proximaPergunta = numeroAtual + 1;
    const proximaURL = `P${proximaPergunta}F1.html`;

    // Redireciona para resultado se for a última pergunta
    if (numeroAtual >= 10) {
      window.location.href = "resultadof1.html";
    } else {
      window.location.href = proximaURL;
    }
  } else {
    // Se não reconhecer a URL, manda pro resultado
    window.location.href = "resultadof1.html";
  }
}
 if (numeroAtual >= 10) {
  // Antes de ir para o resultado, copia a pontuação para resultadoF1
  const pontuacaoFinal = parseInt(localStorage.getItem("pontuacaoFase1")) || 0;
  localStorage.setItem("resultadoF1", pontuacaoFinal);
  
  window.location.href = "resultadoF1.html";
} else {
  window.location.href = proximaURL;
}
