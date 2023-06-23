const status_element = document.getElementById("status");
const box = document.getElementById("status-box");
const img = document.getElementById("img-conexion");
const juego = document.getElementById("juego");

// browser no tiene conexion = estado offline
window.addEventListener("offline", (event) => {
  status_element.innerHTML = "Oh no! Perdiste la conexion!";

  box.style.display = "block";
  img.style.display = "block";
  juego.style.display = "block";
});

// browser esta conectado nuevamente = estado online
window.addEventListener("online", (event) => {
  status_element.innerHTML = "Ya Volvio Jeje";
  box.style.display = "block";
  img.style.display = "none";
  juego.style.display = "none";
});

//
if (!navigator.onLine) {
  status_element.innerHTML =
    "Estoy sin conexion en el momento de carga! horror!";
  box.style.display = "block";
  console.log("Estoy sin conexion en el momento de carga! horror!");
}
