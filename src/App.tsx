import { Header } from './components/Header'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main id="top" className="page-shell" aria-label="Page content">
        <div className="page-placeholder" aria-hidden="true" />
      </main>
    </div>
  )
}

export default App
