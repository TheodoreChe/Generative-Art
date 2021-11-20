import { initLayout } from './components/Layout'
import { createMushroom } from './components/Mushroom'

import './global.scss'

function App() {
  initLayout()
  createMushroom({ element: '.canvas' })
}

// Run the App
export default App()
