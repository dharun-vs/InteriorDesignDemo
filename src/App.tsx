import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Studio } from './components/Studio'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main id="home" aria-label="Page content">
        <Hero />
        <Projects />
        <Studio />
      </main>
    </div>
  )
}

export default App
