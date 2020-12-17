export const ls = {
  set(key, value) {
    if (typeof localStorage === 'undefined') { return false; }
    return localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    if (typeof localStorage === 'undefined') { return false; }
    const valueJSON = localStorage.getItem(key);
    if (valueJSON) {
      try {
        return JSON.parse(valueJSON);
      } catch (e) {
        return false;
      }
    }
  },
};
