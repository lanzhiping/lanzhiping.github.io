import React, { useContext, useState, useEffect } from "react";

type ScrollContext = {
  percentage?: number;
  scrollHeight?: number;
  viewHeight?: number;
  pageHeight?: number;
};

const ScrollContext = React.createContext<ScrollContext>({});

const getScrollProps = (): ScrollContext => {
  if (!global?.window) return {};

  const pageHeight = window.document.body.scrollHeight;
  const viewHeight = window.innerHeight;
  const scrollHeight = window.scrollY;
  const context = {
    percentage: scrollHeight / (pageHeight - viewHeight),
    scrollHeight,
    viewHeight,
    pageHeight,
  };

  return context;
};

export const ScrollContextProvider = ({ children }) => {
  const [scrollContext, setScrollContext] = useState<ScrollContext>({});

  const onScroll = () => {
    const newContext = getScrollProps();
    setScrollContext(newContext);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ScrollContext.Provider value={scrollContext}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = (index?: 1 | 2 | 3 | 4): ScrollContext => {
  if (index) {
    const { viewHeight, pageHeight, scrollHeight } = useContext(ScrollContext);
    const innerPercentage =
      (scrollHeight + (3 - 2 * index) * viewHeight) / (viewHeight * 2);

    return {
      viewHeight,
      pageHeight,
      scrollHeight,
      percentage: Math.max(Math.min(innerPercentage, 1), 0),
    };
  }
  return useContext(ScrollContext);
};
