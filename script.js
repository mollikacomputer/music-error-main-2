
const handleSearch = ()=>{
  const inputField = document.getElementById('keyword');
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${inputField.value}`;
  fetch(url)
  .then(response => response.json())
  .then(data=> displayArtist(data.artists));
  inputField.value ='';
  document.getElementById('artists').textContent = '';
}

const displayArtist=(artists)=>{
  const artistsField = document.getElementById('artists');
  artists.forEach(artists =>{
    const url = `https://thumbs.dreamstime.com/z/person-gray-photo-placeholder-man-person-gray-photo-placeholder-man-t-shirt-white-background-134696022.jpg`;
    // console.log(artist);
    const div = document.createElement('div');
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
      <div class="image-container-inner">
        <img
          src="${artists.strArtistThumb ? artists.strArtistThumb : url }"
          alt=""
        />
      </div>
      </div>
      <div class="info-container">
        <h1>${artists.strArtist}</h1>
        <p>Country: ${artists.strCountry ? artists.strCountry : 'have no info'}</p>
        <p>Style: ${artists.strGenre ? artists.strGenre : 'Have no info'}</p>
      </div>
      <button class="album-button">
        <i class="fa-solid fa-compact-disc"></i>
        <p onclick="fetchAlbums('${artists.idArtist}')" class="button-title">Albums</p>
      </button>`;
      artistsField.appendChild(div);
  })
  
}

const fetchAlbums =(id)=>{
  
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  // console.log(url);
  fetch(url)
  .then(response=>response.json())
  // .then(data=>console.log(data.album));
  .then(data=>showAlbum(data.album.slice(0,10)));
  document.getElementById('albums').textContent = '';
}

const showAlbum=(albums)=>{
  
  albums.forEach(album=>{
    const albumsContainer = document.getElementById('albums');
    const div = document.createElement('div');
    div.classList.add('album');
    const url = `https://thumbs.dreamstime.com/z/person-gray-photo-placeholder-man-person-gray-photo-placeholder-man-t-shirt-white-background-134696022.jpg`;
    div.innerHTML = `
    <div class="album-image-container">
      <img
        src="${album.strAlbumThumb ? album.strAlbumThumb : url }"
        alt=""
      />
    </div>
    <div class="album-name">
      <h3>${album.strAlbum ? album.strAlbum : 'No info'}</h3>
      <p> ${album.strArtist ? album.strArtist : 'No artist name'} </p>
    </div>
    `;
    
    albumsContainer.appendChild(div);
  });
}

