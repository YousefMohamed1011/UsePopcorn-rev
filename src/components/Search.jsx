import { useEffect,useRef } from "react";

export default function Search({ query, setQuery }) {
  const inputEl= useRef(null);
  useEffect(()=>{
    function callback(e) {
      if(e.code === "Enter"){
       inputEl.current.focus(); 
      }
       
    }
       document.addEventListener("keydown", callback)
   return () => document.removeEventListener("keydown", callback)
  },[])

  
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
