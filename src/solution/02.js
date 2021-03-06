import React, { useEffect, useState } from "react";

export function usePokemon(query) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(r => r.json())
      .then(setPokemon);
  }, [query]);

  return { data: pokemon };
}

function PokeSearch() {
  const [query, setQuery] = useState("charmander");

  const { data: pokemon } = usePokemon(query);

  return (
    <div>
      <PokeForm query={query} setQuery={setQuery} />
      <Pokemon pokemon={pokemon} />
    </div>
  );
}

function PokeForm({ query, setQuery }) {
  function handleSubmit(e) {
    e.preventDefault();
    setQuery(e.target.search.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" defaultValue={query} />
      <button type="submit">Search</button>
    </form>
  );
}

function Pokemon({ pokemon }) {
  if (!pokemon) return <h3>Loading...</h3>;
  return (
    <div>
      <h3>{pokemon.name}</h3>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name + " front sprite"}
      />
    </div>
  );
}

export default PokeSearch;
