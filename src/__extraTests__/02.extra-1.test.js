import { renderHook } from "@testing-library/react-hooks/pure";
import { server } from "../data/mocks/server";
import { usePokemon } from "../exercise/02";
// import { usePokemon } from "../solution/02.extra-1";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Exercise 02 - Extra Credit 1", () => {
  test("returns a pending state while waiting for the response", () => {
    const { result } = renderHook(() => usePokemon("charmander"));
    expect(result.current).toMatchObject({
      data: null,
      errors: null,
      status: "pending",
    });
  });

  test("returns a pokemon based on the search result after fetching data", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePokemon("charmander")
    );

    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      data: {
        id: 4,
        name: "charmander",
      },
      status: "fulfilled",
      errors: null,
    });
  });

  test("returns an error state if the API responds with an error", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePokemon("not_a_pokemon")
    );

    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      data: null,
      errors: ["Not found"],
      status: "rejected",
    });
  });
});
