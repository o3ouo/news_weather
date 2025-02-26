import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const handleResize = useCallback(
    debounce(() => setWindowDimensions(getWindowDimensions()), 200),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;