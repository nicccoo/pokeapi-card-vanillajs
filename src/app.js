const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const domLoad = document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151);
    fetchData(random);
})



const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            exp: data.base_experience,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            especial: data.stats[3].base_stat
        }
        // console.log(data);
        renderCard(pokemon);
    } catch (err) {
        console.log(err)
    }
}



const renderCard = (pokemon) => {
    const flex = document.getElementById('flex');
    const template = document.getElementById('template-card').content; //Al utilizar un template, es necesario colocar .content
    const fragment = document.createDocumentFragment();
    const clone = template.cloneNode(true);

    clone.querySelector('.card-pokemon-img').setAttribute('src', pokemon.img);
    clone.querySelector('.card-pokemon-name').textContent = pokemon.nombre;
    clone.querySelector('.card-pokemon-hp').textContent = `HP: ${pokemon.hp}`;
    clone.querySelector('.card-pokemon-exp').textContent = `EXP: ${pokemon.exp}`;
    clone.querySelectorAll('.card-pokemon-stats h3')[0].textContent = `Attack: ${pokemon.ataque}`
    clone.querySelectorAll('.card-pokemon-stats h3')[1].textContent = `Defense: ${pokemon.defensa}`
    clone.querySelectorAll('.card-pokemon-stats h3')[2].textContent = `Special: ${pokemon.especial}`
    
    fragment.appendChild(clone);
    flex.appendChild(fragment);
}
