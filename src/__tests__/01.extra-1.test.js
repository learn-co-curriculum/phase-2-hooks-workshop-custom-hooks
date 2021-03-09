import { renderHook, act } from "@testing-library/react-hooks";
import { useDocumentTitle } from "../exercise/01";
// import { useDocumentTitle } from "../solution/01.extra-1";

describe("Exercise 01 - Extra Credit 1", () => {
  test("is exported as a named export", () => {
    try {
      expect(typeof useDocumentTitle).toBe("function");
    } catch (e) {
      throw new Error("Make sure to export your hook!");
    }
  });

  test("sets the document title to the value passed in", () => {
    const title = "test title";
    renderHook(() => useDocumentTitle(title));
    act(() => {
      expect(document.title).toBe(title);
    });
  });
});
