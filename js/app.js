/* Variables globales */

const elmOut = document.querySelector('#out');
const btn    = document.querySelector('button');
const API = new Api("20860275-67dba03bc593361fd043ec997");
const ui = new Interface();

// Botón de Re-búsqueda.
btn.addEventListener('click',(evt) => {
	evt.preventDefault();

	// Agregar Clases de estilo.
	btn.classList.add('disabled');
	btn.classList.add('pulse');

	// Eliminar Elemento de Imagen actual.
	elmOut.childNodes[3].remove();

	// Reinicar busqueda de imagen.
	ui.init();
});