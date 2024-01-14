import { useEffect } from "react";

export function useKey(action: () => void, key: string) {
  useEffect(() => {
    function eventCallback(e: KeyboardEvent) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", eventCallback);
    return function () {
      document.removeEventListener("keydown", eventCallback);
    };
  }, [action, key]);
}
