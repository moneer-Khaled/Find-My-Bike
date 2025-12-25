import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/footer';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
