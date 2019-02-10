export const loadFromLocalStorage = (key: string, def: any = null) => {
  try {
    if (window.localStorage) {
      return window.localStorage.getItem(key) || def;
    }
    return def;
  } catch (ex) {
    return def;
  }
};

export const saveToLocalStorage = (key: string, value: any) => {
  try {
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (ex) {
    // Ignore error
  }
};
