class Interface 
{
	constructor()
	{
		// 7642
		this.init();
	}

	init()
	{
		this.genImage();
	}

	genImage()
	{
		API.getPhoto()
			.then( async data => 
			{

				// Preparar datos de salida
				const imageUrl 	= data.hits[0].webformatURL;
				const userName 	= data.hits[0].user;
				const userImage = data.hits[0].userImageURL;
				const likes 	= data.hits[0].likes;
				const downloads = data.hits[0].downloads;
				const views 	= data.hits[0].views;

				// Crear Estrcutura Html
				let out = '';

				out = `
				<div class="container">
					<div class="card deep-orange darken-4">
        				<div class="card-image">
	        				<div id="spnImg" class="lds-ring center"><div></div><div></div><div></div><div></div></div>
	        				<div class="btn-floating btn-large halfway-fab">
	        					<i id="spnUser" class="fas fa-user"></i>
	        				</div>
	        			</div>
	        			<div class="card-content">
							<div class="row">
								<div class="hr-h col s12">
									<span class="card-title brown-text text-darken-4 center">${userName}</span>
								</div>
							</div>
							<div class="row">
								<div class="hr-v col s4">
									<i class="fas fa-thumbs-up small"></i><h6>${likes}</h6>
								</div>
								<div class="hr-v col s4">
									<i class="fas fa-eye small"></i><h6>${views}</h6>
								</div>
								<div class="col s4">
									<i class="fas fa-download small"></i><h6>${downloads}</h6>
								</div>
							</div>
						</div>
        			</div>
				</div>
						
					
				`;

				// Inyectar Estructura de carta Html
				cardOut.innerHTML = out;

				/* Crear Imagenes e ir inyectando... */

				// Imagen de Usuario
				console.log('Cargando Imagen de Usuario...');
				const userImg = await imageLoaded(userImage);
				console.log('Imagen de Usuario Cargada!');

				let spinner = cardOut.querySelector('#spnUser');
				cardOut.querySelector('#spnUser').parentElement.replaceChild(userImg,spinner);

				// Imagen Principal
				console.log('Cargando Imagen Principal...');
				const img = await imageLoaded(imageUrl);
				console.log('Imagen Principal Cargada!');

				spinner = cardOut.querySelector('#spnImg');
				cardOut.querySelector('#spnImg').parentElement.replaceChild(img,spinner);
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