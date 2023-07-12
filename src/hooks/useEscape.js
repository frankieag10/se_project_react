import { useEffect } from "react";
// custom hooks should start with verb `use` to let React know that it's a hook. React controls their calls
export function useEscape(onClose) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    //  don't forget to remove the listener in the `clean up` function
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
    // here we watch closeModal to launch the effect only if the reference changes
  }, [onClose]);
}
