import { initLayout, updateLayout } from './components/Layout'
import { createMushroom } from './components/Mushroom'

import './global.scss'

function App() {
  initLayout()
  const meta = createMushroom({ element: '.canvas' })
  updateLayout(meta)
}

// Run the App
export default App()
