import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../exercise/04";
// import { useLocalStorage } from "../solution/04.extra-2";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});

describe("Exercise 04 - Bonus 2", () => {
  test("updates state after storage events", async () => {
    const { result } = renderHook(() => useLocalStorage("test", "old value"));

    act(() => {
      // update localStorage and simulate storage event
      localStorage.setItem("test", "new value");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "test",
        })
      );
    });

    expect(result.current[0]).toBe("new value");
  });

  test("the event handler function is removed when the component unmounts", () => {
    const spy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useLocalStorage("test"));
    unmount();
    expect(spy).toHaveBeenCalledWith("storage", expect.any(Function));
  });
});
