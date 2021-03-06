import React, { useEffect, useState } from "react";

/* ✅ modify this usePokemon custom hook to take in a query as an argument */
export function usePokemon() {
  /* ✅ this hook should only return one thing: an object with the pokemon data */
}

export default function PokeSearch() {
  const [query, setQuery] = useState("charmander");

  /* 
   ✅ move the code from the useState and useEffect hook into the usePokemon hook
   then, call the usePokemon hook to access the pokemon data in this component
  */
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(r => r.json())
      .then(setPokemon);
  }, [query]);

  return (
    <div>
      <PokeForm query={query} setQuery={setQuery} />
      <Pokemon pokemon={pokemon} />
    </div>
  );
}

// 🚫 don't worry about the code down here, these components will be used by PokeSearch
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
