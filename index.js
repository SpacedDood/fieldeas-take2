import './style.css';

// La prueba técnica consistirá en crear una aplicación para buscar películas utilizando la siguiente API (utilizando el parámetro que devuelve un listado de //// películas):

// https://www.omdbapi.com/

// Requerimientos:
//  •	Se mostrará un input de texto para introducir el nombre de la película y un botón para buscar
//  •	Lista las películas encontradas y muestra el título, año y poster
//  •	Las películas se mostrarán en un grid responsive
//  •	Evitar que se haga la misma búsqueda dos veces seguidas

// Requerimientos adicionales:
//  •	Haz otra versión de la aplicación en la que la búsqueda se haga automáticamente al escribir en el input de texto
//  •	Evita que se haga la búsqueda continuamente al escribir

// La API Key de omdbAPI es la siguiente:
const OMDB_API_KEY = '612fbaad';
const apiString = 'https://www.omdbapi.com/?apikey=' + OMDB_API_KEY + '&';

document.getElementById('searchSubmit').addEventListener('click', searchFilm);
var lastSearch = 'AAA';

function searchFilm(event) {
  event.preventDefault();
  var searchFilmText = document.getElementById('searchInput').value;
  getFilmData(searchFilmText);
}

async function getFilmData(filmQuery) {
  if (filmQuery == lastSearch) {
    alert('Please search for something else');
    return;
  }
  lastSearch = filmQuery;

  console.log(encodeURI(apiString + 's=' + filmQuery));

  fetch(
    'https://api.allorigins.win/raw?url=' +
      encodeURIComponent(apiString + 's=' + filmQuery),
    {
      method: 'GET',
      mode: 'cors',
      headers: {},
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.Response == 'False') {
        alert('Error - ' + data.Error);
        return;
      }
      console.log(data);
      console.log(data.Search);
      populateResultsArea(data.Search);
    });
}

function populateResultsArea(results) {
  var resultArea = document.getElementById('resultsArea');
  resultArea.innerHTML = '';

  results.forEach((item) => {
    createResultAndAppend(item, resultArea);
  });
}

function createResultAndAppend(item, resultsArea) {
  var newItem = document.createElement('div');
  newItem.innerHTML = `
      <a href="${item.Poster}" target="_blank">
      <img class="imgCont" src="${item.Poster}" />
      </a>
      <p class="title">${item.Title}</p>
      <p class="year">${item.Year}</p>
    `;
  newItem.classList.add('result', 'container');
  resultsArea.append(newItem);
}
