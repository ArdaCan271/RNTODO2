const clearAllFilters = (setFieldFilters) => {
  setFieldFilters(prevFilters => {
    const clearedFilters = {};
    for (const key in prevFilters) {
      if (prevFilters.hasOwnProperty(key)) {
        clearedFilters[key] = '';
      }
    }
    return clearedFilters;
  });
};


export { clearAllFilters };