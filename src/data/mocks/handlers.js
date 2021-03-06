import { rest } from "msw";
import { pokemons } from "./data";

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon/:name", (req, res, ctx) => {
    const { name } = req.params;
    const pokemon = pokemons.find((p) => p.name === name);
    if (!pokemon) {
      return res(ctx.status(404), ctx.text("Not found"));
    }
    return res(ctx.json(pokemon));
  }),
];
