  //---CRÉATOIN DU LIEN AVEC SUPABASE
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const url = process.env.SUPABASE_URL
const anonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(url, anonKey)

//---REQUETTE POUR OBTENIR TOUS LES NOM DES POKÉMONS
var { data, err } = await supabase
  .from('list')
  .select('*')

console.table(data);
display(data)

//---ANIMATION DU LE LOADER
function loadingCompletion() {
  const loadingDiv = document.getElementById('loading-div');
  loadingDiv.classList.add('hideLoading');

  setTimeout(function() {
      loadingDiv.classList.replace('hideLoading', 'hide');
      document.body.style.overflow = 'unset';
  }, 500);
};

//---AFFICHE UNE CARD POUR CHAQUE POKEMON
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

//---BARRE DE RECHERCHE
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

//---CHECK SI UNE CARD EST CLICKER
Array.from(document.getElementsByClassName('card')).forEach(pokemon => {
  pokemon.addEventListener('click', () => {
      console.log(pokemon.dataset.id)
      
      openInfo(pokemon.dataset.id)})
})

//---REQUETTE POUR OBTENIR LES INFOS D'UN POKEMON
async function openInfo(id) {
  var list = await supabase
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
    .eq('id_pok', id)

    console.log(list);
    console.log(list.data);

  var evo1 = await supabase
    .from('evolution')
    .select('*')
    .or(`id_pok_base.eq.${id},id_pok_evol.eq.${id}`)

    console.log(evo1.data);
}

//---AFFICHE LES DONNÉ D'UN POKEMON
function precise(info, evolution) {
  
}

//---AUTHENTIFICATION
async function signInWithEmail(mail, mdp) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: mail,
    password: mdp,
  })
}
async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  })
}
async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })
}



async function signout() {
  const { error } = await supabase.auth.signOut()
}