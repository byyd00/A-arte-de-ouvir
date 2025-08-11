let tempoRestante = 60;
let intervaloCronometro = null;

function iniciarCronometro() {
  const cronometro = document.getElementById("cronometro");
  tempoRestante = 60;
  cronometro.textContent = tempoRestante;
  cronometro.style.display = "block";

  if (intervaloCronometro) clearInterval(intervaloCronometro);
  intervaloCronometro = setInterval(() => {
    tempoRestante--;
    cronometro.textContent = tempoRestante;
    if (tempoRestante <= 0) {
      clearInterval(intervaloCronometro);
      irParaProximaPergunta();
    }
  }, 1000);
}

function pararCronometro() {
  const cronometro = document.getElementById("cronometro");
  cronometro.style.display = "none";
  if (intervaloCronometro) clearInterval(intervaloCronometro);
}

// Zera a pontuação no início do quiz
if (window.location.href.includes("P1F2.html")) {
    localStorage.setItem('pontuacaoFase1', 0);
  }
  
  // Adiciona o evento aos botões com data-pontos
  document.querySelectorAll('button[data-pontos]').forEach(botao => {
    botao.addEventListener('click', () => {
      const pontos = parseInt(botao.dataset.pontos);
      salvarPontuacao(pontos);
      irParaProximaPergunta();
    });
  });
  
  // Salva pontuação no localStorage
  function salvarPontuacao(pontos) {
    let pontuacaoAtual = parseInt(localStorage.getItem('pontuacaoFase1')) || 0;
    pontuacaoAtual += pontos;
    localStorage.setItem('pontuacaoFase1', pontuacaoAtual);
  }
  
  // Vai para a próxima pergunta ou resultado
  function irParaProximaPergunta() {
    const urlAtual = window.location.href;
  
    // Regex adaptada para minúsculo, com case-insensitive (i)
    const match = urlAtual.match(/P(\d+)F2\.html/i);
  
    if (match) {
      const numeroAtual = parseInt(match[1]);
      const proximaPergunta = numeroAtual + 1;
      const proximaURL = `P${proximaPergunta}F2.html`;
  
      // Redireciona para resultado se for a última pergunta
      if (numeroAtual >= 10) {
        window.location.href = 'resultadof2.html';
      } else {
        window.location.href = proximaURL;
      }
    } else {
      // Se não reconhecer a URL, manda pro resultado
      window.location.href = 'resultadof2.html';
    }
  }
  localStorage.setItem('resultadoF2', pontuacaoFase1);
  window.location.href = "resultadof2.html";