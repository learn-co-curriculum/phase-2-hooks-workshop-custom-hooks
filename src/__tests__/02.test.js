import { renderHook } from "@testing-library/react-hooks/pure";
import { server } from "../data/mocks/server";
import { usePokemon } from "../exercise/02";
// import { usePokemon } from "../solution/02";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Exercise 02", () => {
  test("returns an initial state of null", () => {
    const { result } = renderHook(() => usePokemon("charmander"));
    expect(result.current).toMatchObject({ data: null });
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
    });
  });
});
