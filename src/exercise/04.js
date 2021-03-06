import { useEffect, useState } from "react";

/* ✅ update this function so it takes in two arguments: a key and an initial value */
export function useLocalStorage() {
  /* 
    ✅ in this hook, initialize state. For the initial state:
    use the value saved in localStorage OR the initial value from the function parameters 
  */
  /* 
   ✅ write a useEffect hook so that when a new value comes in, or when the key changes,
   you can save the new value to localStorage
   don't forget the dependencies array!
  */
  useEffect(() => {});

  /* 
   ✅ return the same interface as useState:
   an array with state and a setState function
   👀 return [state, setState]
  */
}

export default function App() {
  return (
    <div>
      <h2>useLocalStorage can save string</h2>
      <Form />
      <hr />
      <h2>useLocalStorage can save objects (Bonus)</h2>
      <FormWithObject />
    </div>
  );
}

function Form() {
  // ✅ after implementing the useLocalStorage hook, update this form to use it instead of useState
  const [name, setName] = useState("");
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Name:</label>
      <input value={name} onChange={e => setName(e.target.value)} />
      <h4>{name ? `Welcome, ${name}!` : "Enter your name"}</h4>
    </form>
  );
}

function FormWithObject() {
  // 🤓 save me for the bonus! when you're ready, update this useState to use your useLocalStorage hook instead
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    setFormData(formData => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Title:</label>
      <input name="title" value={formData.title} onChange={handleChange} />
      <label htmlFor="name">Content:</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
      />
    </form>
  );
}
