let countries = [];
let displayedCountries = [];
let container = document.getElementById('container');
let search = document.querySelector(".search");
let category = document.querySelector('.category');
let favoriteSection = document.getElementsByClassName('favourite-container')[0];
let favoriteCountries = JSON.parse(localStorage.getItem('favoriteCountries')) || [];
const favorite = document.getElementById('favorite-section');
const card=document.getElementById('card');
displayFavoriteCountries();
////////////////////
search.addEventListener('keyup', displayCountries);
category.addEventListener('change', displayCountries);
///////////////////
function displayCountries() {
  let result = '';
  let searchValue = search.value.toLowerCase();
  let categoryValue = category.value.toLowerCase();
  let matchingCountries = [];
  if (window.innerWidth <= 768 && categoryValue === 'favorites') {
    matchingCountries = favoriteCountries.filter(favorite => favorite.isFav).map(favorite => {
      const foundCountry = countries.find(country =>
        country.name.common.toLowerCase() === favorite.name.toLowerCase()
      );
      return { ...foundCountry };
    });
  }
  else {
    matchingCountries = countries.filter(country => {
      return (!searchValue || country.name.common.toLowerCase().includes(searchValue)) &&
        (categoryValue === 'no filter' || categoryValue === 'filter by region' || country.region.toLowerCase().includes(categoryValue));
    });
  }
  if (matchingCountries.length === 0) {
    result = '<div class="col-12 text-center">No results found</div>';
  } else {
    matchingCountries.forEach(country => {
      let c = ''
      if (favoriteCountries.find(f => f.isFav === true && f.name.toLowerCase() === country.name.common.toLowerCase())) c = 'orange-star';
      result += `
        <div class="col-lg-4 col-md-4 col-sm-6 f-sm-2 mb-3">
          <div class="card rounded-3 mb-3 me-3 ms-3 shadow-sm" id="card">
            <img src='${country.flags.png}' class="card-img-top" alt="...">
            <div class="card-body mb-3">
              <h5 class="card-">${country.name.common}</h5>
              <p class="card-text">
                <span class="country-detail">Population</span>: <span class="country-detail-2">${country.population}</span> <br>
                <span class="country-detail">Region</span>: <span class="country-detail-2">${country.region}</span> <br>
                <span class="country-detail">Capital</span>:<span class="country-detail-2"> ${country.capital[0]}</span>
              </p>
              <button class="favorite-button" onclick="toggleFavorite(this,'${country.name.common}','${country.flags.png}')">
              <i class="fa-solid fa-star favorite-icon ${c}"></i>
          </button>
            </div>
          </div>
        </div>
      `;
    });
  }
  container.innerHTML = result;
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.draggable = true;
    card.addEventListener('dragstart', handleDragStart);
    
  })
  cards.forEach(card => {
    card.addEventListener('dragstart', ()=>
    {
      favorite.classList.add("draggable");
      card.classList.add("card-opicty");
    });
    
  })
  cards.forEach(card => {
    card.addEventListener('dragend', ()=>
    {
      card.classList.remove("card-opicty");
      favorite.classList.remove("draggable");

    });
    
  })
  // ///////////////////////
}
// Load favorite countries from local storage
function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.outerHTML);
}

favoriteSection.addEventListener('dragover', function (event) {
  event.preventDefault();
});

favoriteSection.addEventListener('drop', function (event) {
  event.preventDefault();
  const cardHTML = event.dataTransfer.getData('text/plain');
  const cardElement = document.createElement('div');
  cardElement.innerHTML = cardHTML;

  // Check if the country is already in favorites
  const countryName = cardElement.querySelector('.card-').textContent.trim();
  const imgSrc = cardElement.querySelector('img').getAttribute('src');
  if (!favoriteCountries.find(country => country.name === countryName)) {
    favoriteCountries.push({ name: countryName, imgSrc, isFav: true });
    localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountries));
    displayFavoriteCountries();
  }
});
///////////////////////
function displayFavoriteCountries() {
  let result = '';
  favoriteCountries.forEach(c => {
    if (c.isFav) {
      result += `
    <div class="d-flex mb-2 justify-content-between">
    <img src="${c.imgSrc}" class="favourite-item-img" >
      <p class="favourite-item-name ">${c.name} </p>
      <button class="border-0 cancel-button">
        <i class="fa-solid fa-circle-xmark" style="color: #bcbec2;"></i>  </button>

    </div>`}
  })
  favoriteSection.innerHTML =  result;
}

////////////////////////

// function for favorite button
function toggleFavorite(button, name, flag) {
  var card = button.parentElement;
  card.classList.toggle('favorite');
  if (card.classList.contains('favorite')) {
    button.innerHTML = '<i class="fas fa-star favorite-icon orange-star"></i> ';
    if (!favoriteCountries.find(country => country.name === name)) {
      favoriteCountries.push({ name, imgSrc: flag, isFav: true });
    }
    else {
      favoriteCountries = favoriteCountries.map(c => {
        if (c.name === name) return { ...c, isFav: true }
        return c;
      })
      localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountries));
    }
    localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountries));
  } else {
    button.innerHTML = '<i class="fas fa-star gray-star"></i>';
    favoriteCountries = favoriteCountries.map(c => {
      if (c.name === name) return { ...c, isFav: false }
      return c;
    })
    localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountries));
  }
}
///////////////////
//function for add favorite option in small screen
function toggleOptions() {
  var select = document.querySelector('.region-selector');
  var options = select.querySelectorAll('option');

  if (window.innerWidth <= 768) {
    options[1].style.display = 'block';
  } else {
    options[1].style.display = 'none';

  }
}
toggleOptions();
window.addEventListener('resize', toggleOptions);
////////////////////
// function for chang filter by region to filter by in small screen
function updateOptionText() {
  var select = document.querySelector('.region-selector');
  var option = select.querySelector('option');

  if (window.innerWidth <= 768) {
    option.textContent = 'Filter by';
  } else {
    option.textContent = 'Filter by Region';
  }
}

updateOptionText();
window.addEventListener('resize', updateOptionText);