function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let estado = "inicio"; // "inicio", "jogo", "fim"
let animais = [];
let pontos = 0;
let tempoInicial;
let tempoLimite = 15; // 15 segundos

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  textSize(32);
  criarAnimais();
}

function draw() {
  background(135, 206, 235); // Céu azul

  if (estado === "inicio") {
    telaInicial();
  } else if (estado === "jogo") {
    desenharCenario();
    desenharAnimais();
    moverAnimais();
    mostrarPontuacao();
    mostrarTempo();
    verificarFimDeJogo();
  } else if (estado === "fim") {
    telaFinal();
  }
}

function telaInicial() {
  // Fundo
  background(135, 206, 235);
  fill(34, 139, 34);
  rect(0, 300, width, 100);

  // Título
  fill(0);
  textSize(40);
  text("🐄 Colheita Animal 🐑", width / 2, 70);

  // Objetivo
  textSize(22);
  text("OBJETIVO:", width / 2, 130);
  textSize(18);
  text("Capture todos os animais 🐄 🐑 🐓 antes que o tempo acabe!", width / 2, 160);

  // Instruções
  textSize(22);
  text("COMO JOGAR:", width / 2, 200);
  textSize(18);
  text("Clique nos animais com o mouse para capturá-los.", width / 2, 230);
  text("Você tem 15 segundos!", width / 2, 255);

  // Botão JOGAR
  fill(0, 180, 0);
  rect(width / 2 - 70, 290, 140, 50, 12);
  fill(255);
  textSize(24);
  text("JOGAR", width / 2, 315);
}

function mousePressed() {
  if (estado === "inicio") {
    if (mouseX > width / 2 - 70 && mouseX < width / 2 + 70 &&
        mouseY > 290 && mouseY < 340) {
      estado = "jogo";
      tempoInicial = millis();
    }
  } else if (estado === "jogo") {
    for (let a of animais) {
      if (!a.capturado) {
        let d = dist(mouseX, mouseY, a.x, a.y);
        if (d < 40) {
          a.capturado = true;
          pontos++;
        }
      }
    }
  } else if (estado === "fim") {
    resetarJogo();
  }
}

function desenharCenario() {
  fill(135, 206, 235);
  rect(0, 0, width, 300);
  fill(34, 139, 34);
  rect(0, 300, width, 100);
}

function criarAnimais() {
  animais = [];
  pontos = 0;
  let emojis = ["🐄", "🐑", "🐓"];
  for (let i = 0; i < 6; i++) {
    let animal = {
      x: random(100, 700),
      y: random(150, 270),
      emoji: random(emojis),
      capturado: false,
      velocidadeX: random(1, 2),
      velocidadeY: random(1, 2)
    };
    animais.push(animal);
  }
}

function desenharAnimais() {
  textSize(40);
  for (let a of animais) {
    if (!a.capturado) {
      text(a.emoji, a.x, a.y);
    }
  }
}

function moverAnimais() {
  for (let a of animais) {
    if (!a.capturado) {
      a.x += a.velocidadeX;
      a.y += a.velocidadeY;

      if (a.x < 40 || a.x > width - 40) a.velocidadeX *= -1;
      if (a.y < 120 || a.y > 280) a.velocidadeY *= -1;
    }
  }
}

function mostrarPontuacao() {
  fill(0);
  textSize(20);
  text("Capturados: " + pontos + " / " + animais.length, width - 160, 30);
}

function mostrarTempo() {
  let tempoRestante = tempoLimite - int((millis() - tempoInicial) / 1000);
  fill(0);
  text("Tempo: " + tempoRestante + "s", 100, 30);
}

function verificarFimDeJogo() {
  let tempoAtual = (millis() - tempoInicial) / 1000;
  let todosCapturados = animais.every(a => a.capturado);

  if (todosCapturados || tempoAtual > tempoLimite) {
    estado = "fim";
  }
}

function telaFinal() {
  background(135, 206, 235);
  fill(0);
  textSize(32);

  if (animais.every(a => a.capturado)) {
    text("🎉 Parabéns! Você capturou todos os animais!", width / 2, height / 2 - 20);
  } else {
    text("⏱️ Tempo esgotado! GAME OVER!", width / 2, height / 2 - 20);
  }

  textSize(20);
  text("Clique para jogar novamente", width / 2, height / 2 + 40);
}

function resetarJogo() {
  criarAnimais();
  estado = "inicio";
}
