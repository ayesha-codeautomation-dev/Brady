import { useState, useEffect } from 'react';

const useDataLayer = () => {
  const [dataLayerFunc, setDataLayerFunc] = useState(() => () => {});

  useEffect(() => {
    const { dataLayer } = window;

    if (dataLayer) {
      const pushToDatalayer = (eventName, data) => {
        dataLayer.push({
          event: eventName || 'event',
          ...data
        });
      };
      setDataLayerFunc(() => pushToDatalayer);
    }
  }, []);

  return dataLayerFunc;
};

export default useDataLayer;
