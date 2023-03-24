const $container = document.querySelector('.container')
const $btnPrev = document.querySelector('.btn-prev')
const $btnNext = document.querySelector('.btn-next')
const $page = document.querySelector('.counter')

const LIMIT = 20
const TOTAL_POKEMONS = 1118
const TOTAL_PAGES = Math.floor(TOTAL_POKEMONS/LIMIT)

let pageCounter = 1

let offsetCounter = 0


let api = {
  main: 'https://pokeapi.co/api/v2/pokemon'
};



window.addEventListener('load', () => {
  setData(`${api.main}?offset=${offsetCounter}&limit=${LIMIT}`).then((data) => {
    console.log(data);
    let temp = data.results
    .map((pokemon) => TitlePokemonCard(pokemon))
    .join('')

    $container.innerHTML = temp
  })
})

const setData = (url) => fetch(url).then((res) => res.json())

const setInfoPokemon = (url) => {
  setData(url).then(data => $container.innerHTML = CardPokemon(data))
} 


function TitlePokemonCard(pokemon) {
  return`
    <div class="title-card" onClick="setInfoPokemon('${pokemon.url}')">
      <h1 class="cards">${pokemon.name}</h1>
      <div class="cards-img ${pokemon.name}"></div>
    </div>
  `
}

function CardPokemon(info) {
  console.log(info);
  return`
      <div class="leftBlock">
        <div class="infoBlock">
          <h1 class ="cardTitleName">name: <span>${info.name}</span></h1>
          <h2>id: <span>${info.id}</span></h2>
          <h2>Type: <span>${info.types[0].type.name}</span></h2>
          <h2>height: <span>${info.height}</span></h2>
          <h2>base_experience: <span>${info.base_experience}</span></h2>
          <h2> color: <span>${info.moves[0].move.name}</span></h2>
        </div>
        <div class="btnBack">
          <h1 onClick="reloadWindowFunc()">Back</h1>
        </div>
      </div>
      <div class="rightBlock ">
        <img src=${info.sprites.front_default} class="img-block">
        <img src=${info.sprites.back_default} class="img-block">
      </div>
    `
}

function reloadWindowFunc() {
  window.location.reload()
}

//-----------------------pagination-------------------------


window.addEventListener('load', () => {
  $page.innerHTML = pageCounter
  $btnPrev.setAttribute('disabbled', true)
})

$btnNext.addEventListener('click', e => {
  e.preventDefault()
  $btnPrev.removeAttribute('disabled')

  if(pageCounter >= 1 && pageCounter <= TOTAL_PAGES) {
    if(pageCounter === TOTAL_PAGES) {
      
      setData(
        `${api.main}?offset=${offsetCounter += LIMIT}&limit=${LIMIT}`).then((data) => {
        pageCounter++
        $page.innerHTML = pageCounter
        let temp = data.results
        .map((pokemon) => TitlePokemonCard(pokemon))
        .join('')    
        $container.innerHTML = temp
      })
    } else {
      setData(
        `${api.main}?offset=${offsetCounter += LIMIT}&limit=${LIMIT}`).then((data) => {
        pageCounter++
        $page.innerHTML = pageCounter
        let temp = data.results
        .map((pokemon) => TitlePokemonCard(pokemon))
        .join('')    
        $container.innerHTML = temp
      })  
    }
  }
})

$btnPrev.addEventListener("click", (e) => { 
  e.preventDefault(); 
  if ((pageCounter) => 1) { 
    pageCounter--; 
 
    if (pageCounter === 1) { 
      $btnPrev.setAttribute("disabled", true); 
      offsetCounter = 0; 
      setData(`${api.main}?offset=${offsetCounter}&limit=${LIMIT}`).then( 
        (data) => { 
          $page.innerHTML = pageCounter; 
          let temp = data.results 
            .map((pokemon) => TitlePokemonCard(pokemon)) 
            .join(""); 
          $container.innerHTML = temp; 
        } 
      ); 
    } else { 
      setData(`${api.main}?offset=${offsetCounter -= LIMIT}&limit=${LIMIT}`).then( 
        (data) => { 
          $btnNext.removeAttribute('disabled') 
          $page.innerHTML = pageCounter; 
          let temp = data.results 
            .map((pokemon) => TitlePokemonCard(pokemon)) 
            .join(""); 
          $container.innerHTML = temp; 
        } 
      ); 
    } 
  } 
});
