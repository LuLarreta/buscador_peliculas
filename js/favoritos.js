document.addEventListener("DOMContentLoaded", mostrarPeliculasFavoritas);
async function mostrarPeliculasFavoritas() {
  const favoritosContainer = document.getElementById("seccion-favoritos");
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  console.log("Películas favoritas:", favoritos);
  if (favoritos.length === 0) {
    favoritosContainer.innerHTML = "<p>No tienes películas favoritas</p>";
    return;
  }

  let resultadoHTML = "";

  for (const idPelicula of favoritos) {
    const datosPelicula = await obtenerDatosPelis(idPelicula);

    resultadoHTML += `
        <div class="col-lg-6 col-sm-12 buscador">
          <div class="container">
            <div class="container-fluid">
            <div class="row justify-content-center align-items-baseline">
              <h3 class="col-9 ">${datosPelicula.Title}</h3>
              <button class="btn-favorito-selec  col-1" data-imdbid="${datosPelicula.imdbID}"></button></div>
              <div class="row">
                <div class="col-4 p-2">
                  <img class="img-fluid" src="${datosPelicula.Poster}" alt="Poster de ${datosPelicula.Title}">
                  <a href="../seccion/trailer.html"><button class="trailer m-2" >Ver Trailer</button></a>
                </div>
                <div class="col-8">
                  <p class="bordes-buscador pb-3 m-0">Descripción: ${datosPelicula.Plot}</p>
                  <p class="bordes-buscador pt-2 pb-2 m-0" >Género: ${datosPelicula.Genre}</p>
                  <p class="bordes-buscador pt-2 pb-2 m-0">Director: ${datosPelicula.Director}</p>
                  <p class="bordes-buscador pt-2 pb-2 m-0">Actores: ${datosPelicula.Actors}</p>
                  <div class="row align-items-center m-1"> 
                    <p class="col-4 bordes-datos">Año: ${datosPelicula.Year}</p>
                    <p class="col-4 bordes-datos">Tipo: ${datosPelicula.Type}</p>
                    <p class="col-4 ">Duración: ${datosPelicula.Runtime}</p>
                  </div>  
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
  }

  favoritosContainer.innerHTML = resultadoHTML;

  const botonesQuitarFavorito =
    document.getElementsByClassName("btn-favorito-selec");
  for (const boton of botonesQuitarFavorito) {
    boton.addEventListener("click", quitarDeFavoritos);
  }
}

function quitarDeFavoritos(event) {
  const imdbID = event.target.getAttribute("data-imdbid");
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  favoritos = favoritos.filter((id) => id !== imdbID);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  // Vuelve a mostrar las películas favoritas actualizadas
  mostrarPeliculasFavoritas();
}
