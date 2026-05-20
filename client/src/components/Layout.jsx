import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, navigate, currentPage }) {
  return (
    <div className="app-layout">
      <Header navigate={navigate} currentPage={currentPage} />
      <main className="app-main">
        {children}
      </main>
      <Footer navigate={navigate} currentPage={currentPage} />
    </div>
  )
}