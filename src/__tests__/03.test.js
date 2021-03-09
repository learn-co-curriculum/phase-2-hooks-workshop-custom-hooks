import { renderHook } from "@testing-library/react-hooks/pure";
import { fireEvent } from "@testing-library/react";
import { useMouseCoordinates } from "../exercise/03";
// import { useMouseCoordinates } from "../solution/03";

describe("Exercise 03", () => {
  test("returns an initial state with 0, 0 as the mouse coordinates", () => {
    const { result } = renderHook(() => useMouseCoordinates());
    expect(result.current).toMatchObject({ clientX: 0, clientY: 0 });
  });

  test("returns the mouse coordinates after the mouse has moved", () => {
    const { result } = renderHook(() => useMouseCoordinates());
    fireEvent.mouseMove(window, {
      clientX: 100,
      clientY: 200,
    });
    expect(result.current).toMatchObject({ clientX: 100, clientY: 200 });
  });

  test("the event handler function is removed when the component unmounts", () => {
    const spy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useMouseCoordinates());
    unmount();
    expect(spy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });
});
