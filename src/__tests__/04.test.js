import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../exercise/04";
// import { useLocalStorage } from "../solution/04";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});

describe("Exercise 04", () => {
  test("returns an initial state and a setter function", () => {
    const { result } = renderHook(() => useLocalStorage("test", "value"));
    expect(result.current).toMatchObject(["value", expect.any(Function)]);
  });

  test("has an initial value of null of no value is passed in as a second argument", () => {
    const { result } = renderHook(() => useLocalStorage("test"));
    expect(result.current).toMatchObject([null, expect.any(Function)]);
  });

  test("saves the value in localStorage when state is updated", () => {
    const { result } = renderHook(() => useLocalStorage("test", "old value"));
    const [, setState] = result.current;

    const newValue = "new value";

    act(() => {
      setState(newValue);
    });

    expect(localStorage.setItem).toHaveBeenLastCalledWith("test", newValue);
    expect(localStorage.__STORE__["test"]).toBe(newValue);
    expect(result.current[0]).toBe(newValue);
  });
});
