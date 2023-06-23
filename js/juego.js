const tablero = document.getElementById("tablero");
const jugador_X = "X";
const jugador_O = "O";
let gameOver = false;

//control del turno
let jugadorActual = jugador_X;

//almacenar tablero
let tableroStatus = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

//Crear tablero
function crearTablero() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", handleCellClick);
      tablero.appendChild(cell);
    }
  }
}

//Manejar el Click
function handleCellClick(event) {
  if (gameOver) return;
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  //Saber si la celda esta vacia
  if (tableroStatus[row][col] === "") {
    tableroStatus[row][col] = jugadorActual;
    event.target.textContent = jugadorActual;
  }
  //Saber si alguien gano
  if (checkGanador(jugadorActual)) {
    alert("Ganaste!!");
    gameOver = true;
  } else if (checkEmpate()) {
    alert("Empatamos");
    gameOver = true;
  } else jugadorActual = jugadorActual === jugador_X ? jugador_O : jugador_X;

  if (jugadorActual === jugador_O) {
    setTimeout(movimientoCompu, 500);
  }
}

//hacer que la compu se mueva sola
function movimientoCompu() {
  let celdaVacia = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tableroStatus[i][j] === "") {
        celdaVacia.push({ row: i, col: j });
      }
    }
  }

  if (celdaVacia.length > 0) {
    const random = Math.floor(Math.random() * celdaVacia.length);
    const randomCell = celdaVacia[random];

    tableroStatus[randomCell.row][randomCell.col] = jugadorActual;
    const cellElement = document.querySelector(
      `.cell[data-row="${randomCell.row}"][data-col="${randomCell.col}"]`
    );

    cellElement.textContent = jugadorActual;
    if (checkGanador(jugadorActual)) {
      alert("Gane!! Perdiste jeje =C");
      gameOver = true;
    } else if (checkEmpate()) {
      alert("Empatamos! >=C");
      gameOver = true;
    }

    jugadorActual = jugadorActual === jugador_X ? jugador_O : jugador_X;
  }
}

//funcion de posibilidades de ganar
function checkGanador(jugador) {
  //Verificar filas
  for (let i = 0; i < 3; i++) {
    if (
      tableroStatus[i][0] === jugador &&
      tableroStatus[i][1] === jugador &&
      tableroStatus[i][2] === jugador
    ) {
      return true;
    }
  }

  //Verifica columnas

  for (let j = 0; j < 3; j++) {
    if (
      tableroStatus[0][j] === jugador &&
      tableroStatus[1][j] === jugador &&
      tableroStatus[2][j] === jugador
    ) {
      return true;
    }
  }

  //Verificar diagonales
  if (
    tableroStatus[0][0] === jugador &&
    tableroStatus[1][1] === jugador &&
    tableroStatus[2][2] === jugador
  ) {
    return true;
  }

  if (
    tableroStatus[0][2] === jugador &&
    tableroStatus[1][1] === jugador &&
    tableroStatus[2][0] === jugador
  ) {
    return true;
  }

  return false;
}

//Saber si quedo en empate

function checkEmpate() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tableroStatus[i][j] === "") {
        return false;
      }
    }
  }
  return true;
}

//reiniciar juego

function reiniciar() {
  jugadorActual = jugador_X;
  tableroStatus = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  gameOver = false;

  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
}

window.addEventListener("load", crearTablero);
