const $container = document.querySelector('.container')
const $btn = document.querySelector('.btn')

let api = {
  main: 'https://pokeapi.co/api/v2/pokemon'
};



window.addEventListener('load', () => {
  setData(api.main).then((data) => {
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
          <h2>height: <span>${info.height}</span></h2>
          <h2>base_experience: <span>${info.base_experience}</span></h2>
          <h2> color: <span>${info.moves[0].move.name}</span></h2>
        </div>
        <div class="btnBack">
          <h1 onClick="reloadWindowFunc()">Back</h1>
        </div>
      </div>
      <div class="rightBlock ${info.name}"></div>
    `
}

      //<img src="${info.sprites.other.dream_world.font_deaful}"> 

function reloadWindowFunc() {
  window.location.reload()
}