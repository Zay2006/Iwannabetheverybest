$(document).ready(function() {
    const totalPokemons = 898; // Total number of Pokémon available in the PokeAPI
    const pokemonDisplay = $('#pokemon-display');
    const pokemons = []; // Array to hold all Pokémon data

    // Fetch all Pokémon
    for (let id = 1; id <= totalPokemons; id++) {
        fetchPokemon(id);
    }

    function fetchPokemon(id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const pokemon = {
                    name: data.name,
                    image: data.sprites.front_default,
                    types: data.types.map(typeInfo => typeInfo.type.name).join(', '),
                    id: data.id,
                    speciesUrl: data.species.url // URL to get species details including evolution
                };
                pokemons.push(pokemon); // Add Pokémon to the array
                // If we have fetched all Pokémon, display them
                if (pokemons.length === totalPokemons) {
                    displayPokemons();
                }
            })
            .catch(error => console.error('Error fetching Pokémon:', error));
    }

    function displayPokemons() {
        // Sort the Pokémon array by their ID
        pokemons.sort((a, b) => a.id - b.id);
        
        // Clear the existing display
        pokemonDisplay.empty();

        // Create and append cards for each Pokémon
        pokemons.forEach(pokemon => {
            const typeClasses = pokemon.types.split(', ').map(type => `type-${type}`).join(' ');
            const pokemonHTML = `
                <div class="card ${typeClasses} text-center mb-3 col-6 col-md-3">
                    <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.id}. ${pokemon.name}</h5>
                        <p class="card-text">Type: ${pokemon.types}</p>
                    </div>
                </div>`;
            
            pokemonDisplay.append(pokemonHTML); // Append each card to the display
        });
    }
});
