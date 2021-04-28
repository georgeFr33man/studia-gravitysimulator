export default {
  name: "Wykres układu grawitacyjnego dwóch obiektów",
  selectPreset: "Wybierz rodzaj symulacji",
  form: {
    first: "Pierwszy obiekt",
    second: "Drugi obiekt",
    initial: "Warunki początkowe",
    placing: "Położenie [km]",
    radius: "Promień",
    mass: "Masa [x * 1.5^19kg]",
    speed: "Prędkość początkowa [km/s]",
    simulate: "Rozpocznij symulację!",
    stopSimulate: "Zatrzymaj",
    resumeSimulate: "Wznów",
    pauseSimulate: "Pauza",
    simulationSpeed: "Prędkość symulacji",
    historyLength: "Długość historii"
  },
  data: {
    object: "Obiekt",
    vectorR: "Wektor R",
    vectorSM: "Wektor SM",
    history: "Ślad - Obiekt"
  },
  presets: {
    sunAndEarth: "Ziemia i Słońce",
    twoStars: "Dwie gwiazdy"
  }
}
