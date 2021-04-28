import { LocalStorage } from 'quasar'

export default {
  get(key) {
    return LocalStorage.getItem(key);
  },
  set(key, value = null) {
    try {
      LocalStorage.set(key, value)
    } catch (e) {
      console.error("Could not save data: " + key + ": " + value);
    }
  }
}
