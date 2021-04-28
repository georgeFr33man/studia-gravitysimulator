import LocalStorageHelper from './LocalStorageHelper';

const ELECTRON_APP = 'electron';

/* ELECTRON UTILS */
/**
 * @return boolean
 * */
export function isElectron() {
  return process.env.MODE === ELECTRON_APP;
}

/**
 * @param {Object} quasar - Quasar object
 * @return boolean
 * */
export function maximize(quasar = null) {
  if (quasar === null) {
    handleMissingQuasar();
    return false;
  } else {
    const win = quasar.electron.remote.BrowserWindow.getFocusedWindow();
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
  return true;
}

/**
 * @param {Object} quasar - Quasar object
 * @return boolean
 * */
export function minimize(quasar = null) {
  if (quasar === null) {
    handleMissingQuasar();
    return false;
  } else {
    quasar.electron.remote.BrowserWindow.getFocusedWindow().minimize();
    return true;
  }
}

/**
 * @param {Object} quasar - Quasar object
 * */
export function close(quasar = null) {
  quasar.electron.remote.BrowserWindow.getFocusedWindow().close();
}

function handleMissingQuasar() {
  console.error('Quasar cannot be null, please provide valid quasar object.');
}

/* APP UTILS */

/**
 * @param {Object} quasar - Quasar object
 * @return boolean
 * */
export function isDarkTheme(quasar = null) {
  if (quasar === null) {
    handleMissingQuasar();
    return false;
  } else {
    return quasar.dark.isActive;
  }
}

/***
 *
 * @param quasar
 * @returns {boolean|*}
 */
export function toggleTheme(quasar = null) {
  if (quasar === null) {
    handleMissingQuasar();
    return false;
  } else {
    LocalStorageHelper.set('isDark', !quasar.dark.isActive);
    quasar.dark.set(!quasar.dark.isActive);
    return quasar.dark.isActive;
  }
}

export function setThemeOnLoad(quasar = null) {
  if (quasar === null) {
    handleMissingQuasar();
    return false;
  } else {
    let theme = LocalStorageHelper.get('isDark');
    if (theme !== null) {
      quasar.dark.set(theme);
    } else {
      quasar.dark.set(false);
      LocalStorageHelper.set('isDark', false);
    }
  }
}

/**
 * @param {Object} quasar - Quasar object
 * @return boolean
 * */
export function isMobile(quasar = null) {
  if (quasar === null) {
    handleMissingQuasar();
    return false;
  } else {
    return quasar.screen.xs || quasar.screen.sm;
  }
}

/***
 * @param iso {String}
 * @param i18n {VueI18n & IVueI18n}
 * @return {null|boolean}
 */
export function changeLanguage(iso, i18n = null) {
  if (i18n === null) {
    handleMissingQuasar();
    return false;
  } else {
    i18n.locale = iso;
    LocalStorageHelper.set('locale', i18n.locale);
    return true;
  }
}

export function getLocale(quasar = null) {
  if (quasar === null) {
    handleMissingQuasar();
    return false;
  } else {
    let locale = LocalStorageHelper.get('locale');
    if (locale !== null && locale !== undefined) {
      return locale;
    }
    return quasar.lang.getLocale();
  }
}

