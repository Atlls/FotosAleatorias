/* Variables globales */

const elmOut   = document.querySelector('#out');
const btnRS    = document.querySelector('#research');
const btnFV    = document.querySelector('#favorites');
const btnVFV   = document.querySelector('#viewFV');
const API = new Api("20860275-67dba03bc593361fd043ec997");
const ui  = new Interface();

/* Event Listener's */

// Cargar las imagenes favoritas del LS
document.addEventListener('DOMContentLoaded', genFavoriteFromLS);

// Botón de Re-búsqueda.
btnRS.addEventListener('click',(evt) => {

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

	// Crear objeto de favoritos.
	objFavorite =
	{
		id:   document.querySelector('.card-image').getAttribute('imageId'),
		tags: document.querySelector('.card-image').getAttribute('imageTags')
	}

	// Procesar guardado en LS.
	saveFavoritesLS(objFavorite);

	// Cambiar Estilos del botón de Favoritos.
	ui.checkFV(objFavorite);

	genFavoriteFromLS();
});

//  Botón de vista de favoritos
btnVFV.addEventListener('click',(evt) => {

	// Desplazar hacia la pantalla de favoritos, cambiar el iconos de favoritos y ocultar botones de favoritos y busqueda.
	if(window.scrollY)
	{
		window.scrollTo(0,0);

		btnVFV.childNodes[1].classList.add('fa-bookmark');
		btnVFV.childNodes[1].classList.remove('fa-chevron-up');

		btnRS.classList.remove('hide');
		btnFV.classList.remove('hide');
	}
	else
	{
		window.scrollTo(0,131313);

		btnVFV.childNodes[1].classList.add('fa-chevron-up');
		btnVFV.childNodes[1].classList.remove('fa-bookmark');

		btnRS.classList.add('hide');
		btnFV.classList.add('hide');
	}
});

/* Funciones de LS */

function saveFavoritesLS(objFavorite)
{
	const favorites = getFavoritesFromLS();
	const index = searchFavorite(objFavorite,favorites);

	if(index === -1)
		favorites.push(objFavorite);
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

/* Funciones rutinarias */

function genFavoriteFromLS()
{
	console.log('_Cargar por LS');
}

// Busca el objeto favorito repetido en el arreglo "favorites". -1 si no entontró.
function searchFavorite(objFavorite,favorites)
{
	let index = -1;
	for([key,values] of Object.entries(favorites)) // O(n)
	{
		// console.log(` -> ${values.id} - ${objFavorite.id}, ${key}`);
		if(values.id == objFavorite.id)
		{
			index = Number(key); // XD
			break;	// XDDDDDDDDDDD
		}
	}
	// console.log(index);
	return index;
}