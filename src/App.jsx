import "./App.css";
import Admin from "./pages/Admin"; // ← à importer si ce n’est pas encore fait
import Home from "./pages/Home";

function App() {
  // Récupère les paramètres de l'URL
  const searchParams = new URLSearchParams(window.location.search);
  const isAdmin = searchParams.get("pages") === "admin";

  return <>{isAdmin ? <Admin /> : <Home />}</>;
}

export default App;
