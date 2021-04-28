export default {
  name: "Graph of the gravity system of two celestial body",
  selectPreset: "Choose type of simulation",
  form: {
    first: "First object",
    second: "Second object",
    initial: "Initial arguments",
    placing: "Location [km]",
    radius: "Radius",
    mass: "Mass [x * 1.5^19kg]",
    speed: "Start speed [km/s]",
    simulate: "Start simulation!",
    stopSimulate: "Stop",
    resumeSimulate: "Resume",
    pauseSimulate: "Pause",
    simulationSpeed: "Simulation speed",
    historyLength: "History length"
  },
  data: {
    object: "Object",
    vectorR: "Vector R",
    vectorSM: "Vector SM",
    history: "Trace - Object"
  },
  presets: {
    sunAndEarth: "Sun and Earth",
    twoStars: "Two stars"
  }
}
