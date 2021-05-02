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

	// Cambia el estilo de un icono si existe o no la id de imagen en el LS
	checkFV(id)
	{
		let favorites = getFavoritesFromLS();

		// Verificar existencia previa...
		let index = favorites.indexOf(id);

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

	putSpinner()
	{

		// Colocar propiedad "valign-wrapper" y centrar spinner...
		document.querySelector('section').classList.add('valign-wrapper');

		elmOut.innerHTML = `
			<div class="lds-ring center"><div></div><div></div><div></div><div></div></div>
			<h6 class="white-text">
            	Buscando Imagen Aleatoria...
            </h6>
		`;
	}

	genImage()
	{
		API.getPhoto()
			.then( async data => 
			{

				//* Verificar visibilidad del botón de re-búsqueda
				if(btnRS.classList.contains('hide'))
					btnRS.classList.remove('hide');

				/* Preparar datos de salida */
				
				const imageUrl 	= data.hits[0].webformatURL;
				const userName 	= data.hits[0].user;
				const userImage = data.hits[0].userImageURL;
				const likes 	= data.hits[0].likes;
				const downloads = data.hits[0].downloads;
				const views 	= data.hits[0].views;
				const imageId 	= data.hits[0].id;

				// Cambiar Estilos del botón de Favoritos.
				ui.checkFV(`${imageId}`);

				// console.log(data);

				// Crear Estrcutura Html
				let out = '';

				out = `

				<!-- Carta con la data de la imagen -->
				
				<div class="card light-green darken-4">
					<div class="card-content">
						<div class="row">
							<div class="hr-r col s4">
								<i class="fas fa-thumbs-up small"></i><h5>${likes}</h5>
							</div>
							<div class="hr-r col s4">
								<i class="fas fa-eye small"></i><h5>${views}</h5>
							</div>
							<div class="col s4">
								<i class="fas fa-download small"></i><h5>${downloads}</h5>
							</div>
						</div>
					</div>
    				<div imageId="${imageId}" class="card-image">
        				<div id="spnImg" class="lds-ring center"><div></div><div></div><div></div><div></div></div>
        				<div class="btn-floating btn-large halfway-fab left">
        					<i id="spnUser" class="fas fa-user"></i>
        				</div>
        			</div>
        			<div class="card-content">
        				<div class="row">
							<div class="col s12">
								<div id="imageId" class="hide"></div>
								<span class="card-title grey-text text-darken-4 center">${userName}</span>
							</div>
						</div>
        			</div>
    			</div>
				`;

				// Inyectar Estructura de carta Html
				elmOut.innerHTML = out;

				/* Crear Imagenes e ir inyectando... */

				// Imagen de Usuario
				console.log('Cargando Imagen de Usuario...');
				const userImg = await imageLoaded(userImage);
				console.log('Imagen de Usuario Cargada!');

				let spinner = elmOut.querySelector('#spnUser');
				elmOut.querySelector('#spnUser').parentElement.replaceChild(userImg,spinner);

				// Imagen Principal
				console.log('Cargando Imagen Principal...');
				const img = await imageLoaded(imageUrl);
				console.log('Imagen Principal Cargada!');

				spinner = elmOut.querySelector('#spnImg');
				elmOut.querySelector('#spnImg').parentElement.replaceChild(img,spinner);

				/* Cambiar estética */

				// Habilitar botón de re-busqueda
				btnRS.classList.remove('disabled');
				btnRS.classList.remove('pulse');

				// Quitar propiedad "valign-wrapper" cuando la carta es mas grande que la pantalla.
				// console.log(`${elmOut.offsetHeight} vs ${document.querySelector('section').offsetHeight}`);
				if(elmOut.offsetHeight > document.querySelector('section').offsetHeight)
					document.querySelector('section').classList.remove('valign-wrapper');
			});
	}
}

// Funciones para precargar imagenes
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

//ranNumber = (max,min) => Math.floor(Math.random() * ((max+min)-min)+min);

// <div class="card-content">
// 						<nav>
// 							<div class="nav-wrapper blue darken-4">
// 						      <a href="#" class="brand-logo center"><img width="50" src="${userImage}"></a>
// 						      <ul id="nav-mobile" class="right">
// 						        <div class="card-title">${userName}</div>
// 						      </ul>
// 						    </div>
// 						</nav>
// 					</div>

// <img id="spinner" alt="" width="50" heigth="500" class="circle responsive-img valign" src="spinner.gif"><div class="lds-ring center">
// <img id="spinner2" width="50" src="spinner.gif"> <span class="card-title brown-text text-darken-4 center"><i class="fas fa-user"></i><h6>${userName}</h6></span>

// <!-- Botón de re-búsqueda -->

// 				<div class="container">
// 					<div class="row">
// 						<button class="btn-floating btn-large pulse waves-effect waves-light" type="submit" name="action">
//     						<i class="fas fa-search"></i>
//   						</button>
// 					</div>
// 				</div>