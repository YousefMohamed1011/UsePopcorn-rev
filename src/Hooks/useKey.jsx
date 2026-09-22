import { useEffect } from "react";
export  function useKey(setSelectedMovie) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") setSelectedMovie(null);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedMovie]);
}
