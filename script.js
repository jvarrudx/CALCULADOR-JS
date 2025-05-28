const visor = document.getElementById("visor");
const historico = document.getElementById("historico");

let ultResultado = null;
let ultOperacao = null;
let ultNumero = null;
let repetindo = false;
let ultInput = "";


let contTeclas = {
  '0': 0, '1': 0, '2': 0, '3': 0, '4': 0,
  '5': 0, '6': 0, '7': 0, '8': 0, '9': 0,
  '+': 0, '-': 0, '*': 0, '/': 0,
  '=': 0, 'CE': 0, 'C': 0, '←': 0, ',': 0, 'H': 0
};

function digitar(tecla) {
  if (tecla === ",") {
    visor.value += ".";
    contTeclas[","]++;
  } else {
    visor.value += tecla;
    if (contTeclas.hasOwnProperty(tecla)) {
      contTeclas[tecla]++;
    }
  }
  repetindo = false;
  ultInput = visor.value;
}

function limparVisor() {
  visor.value = "";
  contTeclas["CE"]++;
  repetindo = false;
  ultInput = "";
}

function limparTudo() {
  visor.value = "";
  historico.innerHTML = "";
  ultResultado = null;
  ultOperacao = null;
  ultNumero = null;
  ultInput = "";
  repetindo = false;

  // Zera o contador de teclas
  for (let tecla in contadorTeclas) {
    contTeclas[tecla] = 0;
  }
  contTeclas["C"]++;
}

function backspace() {
  visor.value = visor.value.slice(0, -1);
  contTeclas["←"]++;
  repetindo = false;
  ultInput = visor.value;
}

function calcular() {
  contTeclas["="]++;
  let conta = visor.value.trim();

  if (conta === "" && ultResultado !== null && ultOperacao !== null && ultNumero !== null) {
    conta = ultResultado + ultOperacao + ultNumero;
    repetindo = true;
  }

  try {
    let resultado = eval(conta);

    visor.value = resultado;
    if (!repetindo) {
      historico.innerHTML += `<div>${conta} = ${resultado}</div>`;
    } else {
      historico.innerHTML += `<div>${resultado} = ${resultado}</div>`;
    }

    if (!repetindo) {
      let match = conta.match(/([-+]?[0-9.]+)([+\-*/])([-+]?[0-9.]+)/);
      if (match) {
        ultResultado = Number(resultado);
        ultOperacao = match[2];
        ultNumero = Number(match[3]);
      }
    } else {
      ultResultado = resultado;
    }

    repetindo = true;
    ultInput = visor.value;
  } catch (e) {
    visor.value = "Erro";
    repetindo = false;
  }
}

function mostrarHistorico() {
  contTeclas["H"]++;

  let relatorioHTML = "<div><strong>Relatório:</strong><br>";
  for (const tecla in contTeclas) {
    if (contTeclas[tecla] > 0) {
      relatorioHTML += `${tecla}: ${contTeclas[tecla]}<br>`;
    }
  }
  relatorioHTML += "</div><hr>";

  historico.innerHTML += relatorioHTML;
}


document.addEventListener("keydown", function(event) {
  if(event.key === "Enter") {
    event.preventDefault();
    calcular();
  }
});
