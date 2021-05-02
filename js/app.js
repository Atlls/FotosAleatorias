/* Variables globales */

const elmOut = document.querySelector('#out');
const btnRS    = document.querySelector('#research');
const btnFV    = document.querySelector('#favorites');
const API = new Api("20860275-67dba03bc593361fd043ec997");
const ui = new Interface();

/* Event Listener's */

// Botón de Re-búsqueda.
btnRS.addEventListener('click',(evt) => {
	evt.preventDefault();

	// Agregar Clases de estilo.
	btnRS.classList.add('disabled');
	btnRS.classList.add('pulse');

	// Eliminar Elemento de Imagen actual.
	elmOut.childNodes[3].remove();

	// Reinicar busqueda de imagen.
	ui.init();
});

// Botón de Favoritos.
btnFV.addEventListener('click',(evt) => {
	evt.preventDefault();

	// Extraer id de imagen
	const id = document.querySelector('.card-image').getAttribute('imageId');

	// Procesar guardado en LS.
	saveFavoritesLS(id);

	// Cambiar Estilos del botón de Favoritos.
	ui.checkFV(id);
});

/* Funciones de LS */

function saveFavoritesLS(id)
{
	let favorites = getFavoritesFromLS();

	// Verificar existencia previa...
	let index = favorites.indexOf(id);

	if(index === -1)
		favorites.push(id);
	else
		favorites.splice(index,1);

	localStorage.setItem('fav',JSON.stringify(favorites));
}

function getFavoritesFromLS()
{
	let favorites;

	// Extraer los valores del LS...
	if(localStorage.getItem('fav') === null)
		favorites = [];
	else
		favorites = JSON.parse(localStorage.getItem('fav'));

	return favorites;
}