import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="container">

      <div className="hero">
        <div className="hero-text">
          <h1>Bazaar Store</h1>
          <p>Best products for you</p>
        </div>
      </div>
      
      <HomePage />

    </div>
  );
}

export default App;