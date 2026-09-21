import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Studio } from './components/Studio'
import { Services } from './components/Services'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main id="home" aria-label="Page content">
        <Hero />
        <Projects />
        <Studio />
        <Services />
      </main>
    </div>
  )
}

export default App
