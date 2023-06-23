const APIKEY = "ca2e25ff";

const seccionBuscador = document.getElementById("seccion-buscador");
const inputBusqueda = document.getElementById("inputBusqueda");
const botonBuscar = document.getElementById("buscar");
const resultadoBusqueda = document.getElementById("resultado");
const botonesFavorito = document.getElementsByClassName("btn-favorito");
const loadingElement = document.querySelector(
  ".loadingio-spinner-ball-kh985bd4vqb"
);
loadingElement.style.display = "none";
let resultadoHTML = "";
let favoritos = [];

//agregar a favoritos y guardarlo en localstorage
function agregarAFavoritos(idPelicula) {
  favoritos.push(idPelicula);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

//quitar de favoritos y actualizar localstorage
function quitarDeFavoritos(idPelicula) {
  favoritos = favoritos.filter((id) => id !== idPelicula);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function obtenerDatosPelis(idPelicula) {
  return fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${idPelicula}`)
    .then((respuestaDatos) => {
      console.log(`segunda respuesta ${respuestaDatos}`, respuestaDatos);
      return respuestaDatos.json();
    })
    .then((json) => {
      console.log("json crudo:", json);
      return json; // Devuelve los datos procesados
    });
}

botonBuscar.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log(`Buscaste ${inputBusqueda.value}`);
  loadingElement.style.display = "block";
  try {
    const respuesta = await fetch(
      `https://www.omdbapi.com/?apikey=${APIKEY}&s=${inputBusqueda.value}&plot=full`
    );
    console.log(`primer then responde ${respuesta}`, respuesta);
    const json = await respuesta.json();
    console.log("json crudo:", json);

    resultadoHTML = ""; // Reinicia el HTML de resultados antes de cada búsqueda

    for (const resultado of json.Search) {
      const idPelicula = resultado.imdbID;
      const datosPelicula = await obtenerDatosPelis(idPelicula);

      resultadoHTML += `
          <div class="col-lg-6 col-sm-12 buscador">
          <div class="container">
          <div class="container-fluid">
          <div class="row justify-content-center align-items-baseline">
           <h3 class="col-9 ">${resultado.Title}</h3>
           <button class="btn-favorito col-1 " data-imdbid="${resultado.imdbID}"></button></div>
          <div class="row">
          <div class="col-4 p-2"><img class="img-fluid" src="${resultado.Poster}" alt="Poster de ${resultado.Title}"></div>
          <div class="col-8">
           
            <p class="bordes-buscador pb-3 m-0">Descripción: ${datosPelicula.Plot}</p>
           <p class="bordes-buscador pt-2 pb-2 m-0">Género: ${datosPelicula.Genre}</p>
           <p class="bordes-buscador pt-2 pb-2 m-0">Director: ${datosPelicula.Director}</p>
           <p class="bordes-buscador pt-2 pb-2 m-0">Actores: ${datosPelicula.Actors}</p>
           <div class="row align-items-center m-1"> 
            <p class="col-4 bordes-datos">Año: ${resultado.Year}</p>
            <p class="col-4 bordes-datos">Tipo: ${resultado.Type}</p>
            <p class="col-4">Duración: ${datosPelicula.Runtime}</p>
            </div>  
            
            </div>
        </div></div></div></div></div>
        `;
    }

    resultadoBusqueda.innerHTML = resultadoHTML;
    loadingElement.style.display = "none";

    for (const boton of botonesFavorito) {
      boton.addEventListener("click", (event) => {
        const idPelicula = event.target.dataset.imdbid;
        if (favoritos.includes(idPelicula)) {
          quitarDeFavoritos(idPelicula);
          event.target.innerText = "";
          event.target.classList.remove("btn-favorito-selec");
          event.target.classList.add("btn-favorito");
          console.log("Se quito de favoritos");
        } else {
          agregarAFavoritos(idPelicula);
          event.target.innerText = "";
          event.target.classList.remove("btn-favorito");
          event.target.classList.add("btn-favorito-selec");
          console.log("Se agrego de favoritos");
        }
      });
    }
  } catch (error) {
    console.log(`Hubo un error: ${error}`);
  } finally {
    // Realiza cualquier acción adicional que desees después de la búsqueda
    console.log("Se ejecutó el finally");
  }
});
