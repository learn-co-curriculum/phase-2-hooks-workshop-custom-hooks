import React, { useEffect, useState } from "react";

export function usePokemon(query) {
  const [{ data, errors, status }, setState] = useState({
    data: null,
    errors: null,
    status: "idle",
  });

  useEffect(() => {
    setState((state) => ({ ...state, errors: null, status: "pending" }));
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          return r.text().then((err) => {
            throw err;
          });
        }
      })
      .then((data) => {
        setState({ data, errors: null, status: "fulfilled" });
      })
      .catch((err) => {
        setState({ data: null, errors: [err], status: "rejected" });
      });
  }, [query]);

  return { data, status, errors };
}

function PokeSearch() {
  const [query, setQuery] = useState("charmander");

  const { data: pokemon, status, errors } = usePokemon(query);

  function displayData() {
    switch (status) {
      case "fulfilled":
        return <Pokemon pokemon={pokemon} />;
      case "rejected":
        return errors.map((err) => <p key={err}>{err}</p>);
      default:
        return <h1>Loading...</h1>;
    }
  }

  return (
    <div>
      <PokeForm query={query} setQuery={setQuery} />
      {displayData()}
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
