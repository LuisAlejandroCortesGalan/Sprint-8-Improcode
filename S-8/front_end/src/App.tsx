import { MapProvider } from "./mapContext/MapContext"
import AppRouter from "./router/AppRouter"

function App() {

  return (
    <MapProvider>
        <AppRouter />
    </MapProvider>
  )
}

export default App
