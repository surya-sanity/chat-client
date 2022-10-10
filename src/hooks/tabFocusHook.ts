import { useEffect, useState, useRef } from "react";
import throttle from "lodash.throttle";


export const useTabFocusHook = () => {
  const [tabHasFocus, setTabHasFocus] = useState(true);

  useEffect(() => {
    const handleFocus = () => {
      setTabHasFocus(true);
    };

    const handleBlur = () => {
      setTabHasFocus(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return { tabHasFocus }

}


export function useOnScreen(ref: any) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    observer.observe(ref.current)
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect() }
  }, [])

  return isIntersecting
}