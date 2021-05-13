'use strict';

/* Variables globales */

const photoOut   = document.querySelector('#photoOut');
const fvOut    	 = document.querySelector('#fvOut');

const btnRS    	 = document.querySelector('#research');
const btnFV      = document.querySelector('#favorites');
const btnVFV     = document.querySelector('#viewFV');
const btnTR		 = document.querySelector('#trash');

const API = new Api("20860275-67dba03bc593361fd043ec997");
const ui  = new Interface();

/* Event Listener's */

// Cargar las imagenes favoritas del LS
document.addEventListener('DOMContentLoaded', () => 
{
	genFavoriteFromLS();
	ui.scroll('top');
});

// Botón de Re-búsqueda.
btnRS.addEventListener('click', (evt) => 
{

	// Agregar Clases de estilo.
	btnRS.classList.add('disabled');
	btnRS.classList.add('pulse');

	// Eliminar Elemento de Imagen actual.
	photoOut.childNodes[3].remove();

	// Reinicar busqueda de imagen.
	ui.init();
});

// Botón de Favoritos.
btnFV.addEventListener('click', (evt) => 
{

	// Crear objeto de favoritos.
	const objFavorite =
	{
		id:   document.querySelector('.card-image').getAttribute('imageId'),
		tag:  document.querySelector('.card-image').getAttribute('imageTag'),
		prev: document.querySelector('.card-image').getAttribute('imagePrev')
	}

	// Procesar guardado en LS.
	saveFavoritesLS(objFavorite);

	// Cambiar Estilos del botón de Favoritos.
	ui.checkFV(objFavorite);

	genFavoriteFromLS();
});

//  Botón de vista de favoritos
btnVFV.addEventListener('click',(evt) => 
{

	/* Mover scroll */

	if(window.scrollY)
		ui.scroll('top');
	else
		ui.scroll('bottom');

	/* Verificar existencia de favoritos */

	// Crear objeto de favoritos.
	const objFavorite =
	{
		id:   document.querySelector('.card-image').getAttribute('imageId'),
		tag:  document.querySelector('.card-image').getAttribute('imageTag'),
		prev: document.querySelector('.card-image').getAttribute('imagePrev')
	}

	// Cambiar Estilos del botón de Favoritos.
	ui.checkFV(objFavorite);
});

// Botón de eliminar todos los favoritos
btnTR.addEventListener('click', (evt) => 
{
	localStorage.removeItem('fav');
	genFavoriteFromLS();
});

document.querySelector("#fvOut").addEventListener('click', (evt) => 
{
	let id;

	// Extraer id de imagen a cargar...
	if(evt.target.tagName === 'DIV')
		id = evt.target.querySelector('img').getAttribute('imageId');
	else if(evt.target.tagName != 'P')
		id = evt.target.getAttribute('imageId');

	// Cargar imagen...
	ui.putSpinner();
	ui.genImage(id);

	ui.scroll('top');
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

function genFavoriteFromLS()
{
	const favorites = getFavoritesFromLS();

	// Eliminar los div's favoritos anteriores.
	fvOut.querySelectorAll('.fv').forEach((div) => div.remove());

	if(favorites.length) 
	{
		ui.msgSecionFv(false);
		favorites.forEach((objFav) => ui.putFavorite(objFav));
	}
	else
	{
		ui.msgSecionFv(true);
	}
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

// Busca el objeto favorito repetido en el arreglo "favorites". -1 si no entontró.
function searchFavorite(objFavorite,favorites)
{
	let index = -1, key, values;
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