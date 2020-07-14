/* eslint-disable react/prop-types */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

const WindowDimensionsCtx = createContext(null);
const WindowDimensionsProvider = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, []);
  return (
    <WindowDimensionsCtx.Provider value={dimensions}>
      {children}
    </WindowDimensionsCtx.Provider>
  );
};

WindowDimensionsCtx.propTypes = { children: PropTypes.element.isRequired };

export default WindowDimensionsProvider;
export const useWindowDimensions = () => useContext(WindowDimensionsCtx);