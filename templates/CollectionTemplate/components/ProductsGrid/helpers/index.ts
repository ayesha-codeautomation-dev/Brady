export const setCollectionFiltersChangedProperty = (value: true | false) => {
  document.documentElement.dataset.collectionFiltersChanged = String(value);
};

export const removeCollectionFiltersChangedProperty = () => {
  delete document.documentElement.dataset.collectionFiltersChanged;
};

export const collectionFiltersChanged = () => {
  return document.documentElement.dataset.collectionFiltersChanged === 'true';
};
