import { useState, useEffect } from "react";
import hasi from "../data/assets/hasi.png";

export function useMouseCoordinates() {
  // ✅ get the setCoordinates function back too!
  // 👀 const [coordinates, setCoordinates] = useState(...)
  const [coordinates] = useState({
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    /* 
     ✅ create an event handler function to run when the mousemove event fires
     set state with the clientX and clientY coordinates from the event
     👀 function handler(event) {}
    */

    /* 
     ✅ attach an event listener to the window for the mousemove event
     📃 https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
     👀 window.addEventListener("mousemove", handler)
    */

    return function cleanup() {
      /* 
       ✅ make sure to clean up your event listeners when your hook is no longer in use!
       👀 window.removeEventListener("mousemove", handler)
      */
    };
  }, []);

  return coordinates;
}

export default function MyComponent() {
  const { clientX, clientY } = useMouseCoordinates();

  return (
    <div style={{ cursor: "none", width: "100%", height: "100%" }}>
      <h2>Mouse X: {clientX}</h2>
      <h2>Mouse Y: {clientY}</h2>
      <Cursor x={clientX} y={clientY} />
    </div>
  );
}

function Cursor({ x, y }) {
  const style = {
    position: "fixed",
    top: y,
    left: x,
    height: "45px",
    width: "45px",
    borderRadius: "50%",
    background: `url(${hasi})`,
    backgroundSize: "cover",
    zIndex: 1,
  };
  return <div style={style} />;
}
