'use strict';

class Interface 
{
	constructor()
	{
		this.init();
	}

	init()
	{	
		this.putSpinner();
		this.genImage();
	}

	putSpinner()
	{
		document.querySelector('section').classList.add('valign-wrapper');

		photoOut.innerHTML = `
			<div class="lds-ring center grey-text"><div></div><div></div><div></div><div></div></div>
			<h6 class="grey-text">
            	Buscando Imagen Aleatoria...
            </h6>
		`;
	}

	genImage(id)
	{
		API.getPhoto(id)
			.then( async data => 
			{

				/* Preparar datos de salida */
				
				const imageUrl 	= data.hits[0].webformatURL;
				const userName 	= data.hits[0].user;
				const userImage = data.hits[0].userImageURL;
				const likes 	= data.hits[0].likes;
				const downloads = data.hits[0].downloads;
				const views 	= data.hits[0].views;
				const imageId 	= data.hits[0].id;
				const tag    	= formatTag(data.hits[0].tags);
				const prev  	= data.hits[0].previewURL;

				// Cambiar Estilos del botón de Favoritos.
				ui.checkFV(
					{
						id: imageId,
						user: userName,
						tag: tag,
						prev: prev
					}
				);

				// console.log(data.hits[0]);

				// Crear Estrcutura Html
				let out = '';
				out = `

				<!-- Carta con la data de la imagen -->
				
				<div class="card grey darken-3">
					<div class="card-content">
        				<div class="row">
							<div class="col s12">
								<div class="hide"></div>
								<span class="card-title grey-text center">por: <b class="grey-text text-lighten-2">${userName}</b></span>
							</div>
						</div>
        			</div>
    				<div imageId="${imageId}" imageTag="${tag}" imagePrev="${prev}" class="card-image">
        				<div id="spnImg" class="lds-ring center"><div></div><div></div><div></div><div></div></div>
        				<div class="btn-floating btn-large halfway-fab left">
        					<i id="spnUser" class="fas fa-user"></i>
        				</div>
        			</div>
        			<div class="card-content">
						<div class="row">
							<div class="col s9 offset-s3 m6 offset-m6">
								<div class="row">
									<div class="hr-r col s4">
										<h5 class="center"><i class="fas fa-eye small"></i>  ${views}</h5>
									</div>
									<div class="hr-r col s4">
										<h5 class="center"><i class="fas fa-download small"></i>  ${downloads}</h5>
									</div>
									<div class="col s4">
										<h5 class="center"><i class="fas fa-grin-hearts small"></i>  ${likes}</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
    			</div>
				`;

				// Inyectar Estructura de carta Html
				photoOut.innerHTML = out;

				/* Crear Imagenes e ir inyectando... */

				// Imagen de Usuario
				console.log('Cargando Imagen de Usuario...');
				const userImg = await imageLoaded(userImage);
				console.log('Imagen de Usuario Cargada!');

				let spinner = photoOut.querySelector('#spnUser');
				photoOut.querySelector('#spnUser').parentElement.replaceChild(userImg,spinner);

				// Imagen Principal
				console.log('Cargando Imagen Principal...');
				const img = await imageLoaded(imageUrl);
				console.log('Imagen Principal Cargada!');

				spinner = photoOut.querySelector('#spnImg');
				photoOut.querySelector('#spnImg').parentElement.replaceChild(img,spinner);

				/* Cambiar estética */

				// Habilitar botón de re-busqueda
				btnRS.classList.remove('disabled');
				btnRS.classList.remove('pulse');

				// Quitar propiedad "valign-wrapper" cuando la carta es mas grande que la pantalla.
				// console.log(`${photoOut.offsetHeight} vs ${document.querySelector('section').offsetHeight}`);
				if(photoOut.offsetHeight > document.querySelector('section').offsetHeight)
					document.querySelector('section').classList.remove('valign-wrapper');
			});
	}

	// Inyecta una caja de favoritos en su seccion correspondiente.
	putFavorite(objFavorite)
	{
		let out = '';
		out = `
			<div class="col m6 s12 z-depth-1 fv">
        		<p class="left pink-text text-lighten-4">
        			<b>[</b> Autor: <b>${objFavorite.user} ]</b> 
        			<br>
            		"<b>${objFavorite.tag}</b>"
        		</p>
        		<img imageId="${objFavorite.id}" class="right" src="${objFavorite.prev}" alt="">
    		</div>
		`;

		fvOut.innerHTML += out;
	}

	// Cambia el estilo de un icono si existe o no la id de imagen en el LS
	checkFV(objFavorite)
	{
		let favorites = getFavoritesFromLS();

		// Verificar existencia previa...
		let index = searchFavorite(objFavorite,favorites);

		if(index === -1)
		{

			// Colocar sin contorno.
			btnFV.childNodes[1].classList.remove('fas');
			btnFV.childNodes[1].classList.add('far');
		}
		else
		{

			// Colocar con contorno.
			btnFV.childNodes[1].classList.remove('far');
			btnFV.childNodes[1].classList.add('fas');
		}
	}

	// Desplazar hacia la pantalla de favoritos, cambiar el iconos de favoritos y ocultar botones de favoritos y busqueda.
	scroll(dir)
	{
		if(dir == 'top')
		{
			window.scrollTo(0,0);

			btnVFV.childNodes[1].classList.add('fa-bookmark');
			btnVFV.childNodes[1].classList.remove('fa-chevron-up');

			btnRS.classList.remove('hide');
			btnFV.classList.remove('hide');
			btnTR.classList.add('hide');
		}
		else if(dir == 'bottom')
		{
			window.scrollTo(0,131313);

			btnVFV.childNodes[1].classList.add('fa-chevron-up');
			btnVFV.childNodes[1].classList.remove('fa-bookmark');

			btnRS.classList.add('hide');
			btnFV.classList.add('hide');
			btnTR.classList.remove('hide');
		}
	}

	msgSecionFv(enable)
	{
		if(enable)
		{
			fvOut.parentElement.parentElement.classList.add('valign-wrapper');
			fvOut.parentElement.classList.add('center-align');
			fvOut.querySelector('#msgFv').classList.remove('hide');
		}
		else
		{
			fvOut.parentElement.parentElement.classList.remove('valign-wrapper');
			fvOut.parentElement.classList.remove('center-align');
			fvOut.querySelector('#msgFv').classList.add('hide');
		}	
	}
}

/* Funciones Rutinarias */

// Funcion para precargar imagenes.
function imageLoaded(src, alt = '')
{
    return new Promise ( resolve => 
    {
        const image = document.createElement('img');

        image.setAttribute('alt', alt);
        image.setAttribute('src', src);

        image.addEventListener('load', function()
        {
            resolve(image);
        });
    });
}

// Funciones para el formatear el Tag del la imagen.
function formatTag(text)
{
	let index = text.indexOf(',');
	text = text.substring(0,index);
	text = `${text.substring(0,1).toUpperCase()}${text.substring(1,index)}`;

	return text;
}