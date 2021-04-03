class Interface 
{
	constructor()
	{
		this.init();
	}

	init()
	{
		this.genImage();
	}

	genImage()
	{
		API.getPhoto()
			.then( async data => {

				// Preparar imagenes
				const imageUrl 	= data.hits[0].webformatURL;
				const userName 	= data.hits[0].user;
				const userImage = data.hits[0].userImageURL;

				// Crear Estrcutura Html
				let out = '';

				out = `
					<div class="card-image">
        				<img width="50" src="spinner.gif">
        				<a class="btn-floating btn-large halfway-fab">
        					<i class="material-icons">
        						<img class="" src="spinner.gif">
        					</i>
        				</a>
        			</div>
        			<div class="card-content">
						<span class="card-title brown-text text-darken-4 center"><h4>${userName}</h4></span>
					</div>
				`;

				// Inyectar Estructura de carta Html
				cardOut.innerHTML = out;

				/* Crear Imagenes e ir inyectando... */

				// Imagen de Usuario
				console.log('Cargando Imagen de Usuario...');
				const userImg = await imageLoaded(userImage);
				console.log('Imagen Imagen de Usuario Cargada!');

				let spinner = cardOut.querySelector('i').childNodes[1];
				//cardOut.querySelector('i').replaceChild(userImg,spinner);

				// Imagen Principal
				console.log('Cargando Imagen Principal...');
				const img = await imageLoaded(imageUrl);
				console.log('Imagen Principal Cargada!');

				spinner = cardOut.querySelector('.card-image').childNodes[1];
				cardOut.querySelector('.card-image').replaceChild(img,spinner);
			});
	}
}

// Funciones para precargar imagenes
function imageLoaded(src, alt = '') {

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