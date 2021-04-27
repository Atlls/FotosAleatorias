class Api 
{
	constructor(apiKey)
	{
		this.apiKey = apiKey;
	}

	async getPhoto()
	{
		let convertir = true;

		let id = ranNumber(70000,0);
		// id = 1; // Testeo
		// 39884 -> id de error por no existir dicha petición.
		// 7642 -> id de error pore status "400".

		console.log('Esperando respuesta de la API...');
		const res = await fetch(`https://pixabay.com/api/?key=${this.apiKey}&id=${id}`)

			// No existe dicha id
			.catch(error =>
			{
				console.log(`ID "${id}" Inexitente...`);
				console.log('Volviendo a buscar...');
				convertir = false;
			});
			
		// No existe la imagen o existe un error en la respuesta.
		if(!convertir || res.status == 400)
		{
			return this.getPhoto();
		}
		else
		{
			console.log('Convirtiendo en JSON...');
			const data = await res.json();
			const type = data.hits[0].type;
			
			// La imagen encontrada no es una Foto...
			if(type != 'photo')
			{
				console.log(`ID ${id} no es una foto...`);
				console.log('Volviendo a buscar...');

				return this.getPhoto();
			}
			else
			{
				return data;
			}
		}
	}
}

ranNumber = (max,min) => Math.floor(Math.random() * ((max+min)-min)+min);