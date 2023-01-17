import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../exercise/04";
// import { useLocalStorage } from "../solution/04.extra-1";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});

describe("Exercise 04 - Bonus 1", () => {
  test("works with objects", () => {
    const value = { test: 1 };
    const { result } = renderHook(() => useLocalStorage("test", value));
    const [state, setState] = result.current;
    expect(state).toMatchObject(value);
    expect(localStorage.__STORE__["test"]).toBe(JSON.stringify(value));

    const newValue = { test2: 2 };

    act(() => {
      setState(newValue);
    });

    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      "test",
      JSON.stringify(newValue)
    );
    expect(localStorage.__STORE__["test"]).toBe(JSON.stringify(newValue));
    expect(result.current[0]).toMatchObject(newValue);
  });

  test("works with arrays", () => {
    const value = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage("test", value));
    const [state, setState] = result.current;
    expect(state).toMatchObject(value);
    expect(localStorage.__STORE__["test"]).toBe(JSON.stringify(value));

    const newValue = ["4", "5", "6"];

    act(() => {
      setState(newValue);
    });

    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      "test",
      JSON.stringify(newValue)
    );
    expect(localStorage.__STORE__["test"]).toBe(JSON.stringify(newValue));
    expect(result.current[0]).toMatchObject(newValue);
  });
});
