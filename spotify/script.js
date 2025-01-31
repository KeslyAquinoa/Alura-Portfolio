const searchInput = document.getElementById('search_input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    console.log("🔎 URL da API:", url);
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    // Limpa os resultados anteriores
    artistName.innerText = '';
    artistImage.src = '';

    // Verifica se há resultados
    if (result.length > 0) {
        result.forEach(element => {
            artistName.innerText += element.name + '\n'; // Adiciona o nome do artista
            artistImage.src = element.urlImg; // Se você quiser mostrar apenas a imagem do último artista
        });
        resultArtist.classList.remove('hidden');
    } else {
        resultArtist.classList.add('hidden'); // Se não houver resultados, esconde
    }
}
/* function displayResults(result) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
} */

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }
    
    requestApi(searchTerm);
})
 
