import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const supabase = createClient('https://ndmvweijowxkfextdhfc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbXZ3ZWlqb3d4a2ZleHRkaGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxNjY3NDUsImV4cCI6MjAwMjc0Mjc0NX0.PpVwOCmEciVqmHpUphOAroKaQ3sNUWiBgqnzChHWvvc')


var { data, err } = await supabase
  .from('list')
  .select('*')

console.table(data);
display(data)

function loadingCompletion() {
  const loadingDiv = document.getElementById('loading-div');
  loadingDiv.classList.add('hideLoading');

  setTimeout(function() {
      loadingDiv.classList.replace('hideLoading', 'hide');
      document.body.style.overflow = 'unset';
  }, 500);
};

function display(pokemons) {

  pokemons.forEach(pokemon => {
    let div = document.createElement("div");
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', pokemon.id_pok)
    div.style.background = `url(./src/pokemon${pokemon.id_pok}.avif)`
    div.innerHTML = `<p>${pokemon.nom_pok}</p>`;
  
    document.getElementById("list").appendChild(div);
  });

  loadingCompletion()
}

document.getElementById('search-input').addEventListener('input', search)


function search() {

  document.getElementById("list").innerHTML = '';

  let searchResults = [];

  data.forEach(pokemon => {
    if (pokemon.nom_pok.includes(document.getElementById('search-input').value.toLowerCase())) {
      searchResults.push(pokemon);
    };
  })

  console.log(searchResults);

  display(searchResults)
}


Array.from(document.getElementsByClassName('card')).forEach(pokemon => {
  pokemon.addEventListener('click', () => {
      console.log(pokemon.dataset.id)
      
      openInfo(pokemon.dataset.id)})
})

async function openInfo(id) {
  var { info , err } = await supabase
    .from('list')
    .select(`
        id_pok,
        type (
            *
        ),
        stats (
            *
        ),
        weaknesses (
            *
        )
    `)
    .eq('id_pok', id);

  var { evo1 , ror } = await supabase
    .from('evolution')
    .select('*')
    .or(`id_pok_base.eq.${id},id_pok_evol.eq.${id}`)
          
  console.info(info,evo1);
}

[{"id_pok":6,"type":[{"id":6,"id_pok":6,"type1":"fire","type2":"flying"}],"stats":[{"id":6,"id_pok":6,"hp":78,"attack":104,"defense":78,"sp_attack":159,"sp_defense":115,"speed":100}],"weaknesses":[{"id":6,"id_pok":6,"bug":0.25,"dragon":1,"electric":2,"fairy":0.5,"fight":0.5,"fire":0.5,"flying":1,"ghost":1,"grass":0.25,"ground":0,"ice":1,"normal":1,"poison":1,"psychic":1,"rock":4,"steel":0.5,"water":2}]}]