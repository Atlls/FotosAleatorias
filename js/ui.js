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
			.then( data => {

				// Preparar imagen
				const imageUrl 	= data.hits[0].webformatURL;
				const userName 	= data.hits[0].user;
				const userImage = data.hits[0].userImageURL;

				// Crear Imagen
				const img = document.createElement('img');
				img.src = `${imageUrl}`;

				// Crear Salida
				let out = '';

				out = `
					<div class="card-image">
        				<img id="image" src="${imageUrl}">
        				<a class="btn-floating btn-large halfway-fab">
        					<i class="material-icons">
        						<img width="50" src="${userImage}">
        					</i>
        				</a>
        			</div>
        			<div class="card-content">
						<span class="card-title brown-text text-darken-4 center"><h4>${userName}</h4></span>
					</div>
				`;

				// Inyectar Html
				cardOut.innerHTML = out;
			});
	}
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