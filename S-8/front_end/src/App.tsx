import { MapProvider } from "../src/features/events/context/MapContext"
import AppRouter from "./router/AppRouter"

function App() {

  return (
    <MapProvider>
        <AppRouter />
    </MapProvider>
  )
}

export default App
