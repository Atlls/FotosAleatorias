/* Variables globales */

const elmOut   = document.querySelector('#out');
const btnRS    = document.querySelector('#research');
const btnFV    = document.querySelector('#favorites');
const btnVFV   = document.querySelector('#viewFV');
const API = new Api("20860275-67dba03bc593361fd043ec997");
const ui  = new Interface();

/* Event Listener's */

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

	// Extraer id de imagen
	const id = document.querySelector('.card-image').getAttribute('imageId');

	// Procesar guardado en LS.
	saveFavoritesLS(id);

	// Cambiar Estilos del botón de Favoritos.
	ui.checkFV(id);
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