const merge = require('lodash/merge');

const GLOBAL_THEME = {
  margin: {
    l: 35,
    r: 35,
  },
  xaxis: {
    range: [-1000000000, 1000000000],
    title: "X"
  },
  yaxis: {
    range: [-200000000, 200000000],
    title: "Y"
  }
}

const DARK_THEME = {
  title: {
    font: {
      color: "#fff"
    }
  },
  font: {
    color: "#fff"
  },
  xaxis: {
    gridcolor: "#696969"
  },
  yaxis: {
    gridcolor: "#696969"
  },
  paper_bgcolor: "#121212",
  plot_bgcolor: "#1d1d1d",
}

const LIGHT_THEME = {
  title: {
    font: {
      color: "#444"
    }
  },
  font: {
    color: "#444"
  },
  xaxis: {
    gridcolor: "#eee"
  },
  yaxis: {
    gridcolor: "#eee"
  },
  paper_bgcolor: "#fff",
  plot_bgcolor: "#fff",
}

/***
 *
 * @param dark
 * @returns {{xaxis: {gridcolor: string}, plot_bgcolor: string, paper_bgcolor: string, title: {font: {color: string}}, yaxis: {gridcolor: string}, font: {color: string}}|{xaxis: {gridcolor: string}, plot_bgcolor: string, paper_bgcolor: string, yaxis: {gridcolor: string}, font: {color: string}}}
 */
export function getTheme(dark = false) {
  if (dark) {
    return {... DARK_THEME, ... GLOBAL_THEME}
  }
  return {... LIGHT_THEME, ... GLOBAL_THEME}
}

/***
 *
 * @param main
 * @param additional
 * @returns {*}
 */
export function mergeThemes(main, additional) {
  return merge(main, additional)
}
