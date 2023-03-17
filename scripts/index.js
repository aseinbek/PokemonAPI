const $container = document.querySelector('.container')
const $url = document.querySelector('.url')

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
      <h1>${pokemon.name}</h1>
    </div>
  `
}

function CardPokemon(info) {
  return`
    <div>
      <h1>${info.name}</h1>
      <h3>${info.height}</h3>
      <p>${info.base_experience}</p>
      <p> color: ${info.moves[0].move.name}</p>
    </div>
  `
}