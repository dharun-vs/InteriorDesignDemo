import { Header } from './components/Header'
import { Hero } from './components/Hero'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main id="home" aria-label="Page content">
        <Hero />
      </main>
    </div>
  )
}

export default App
