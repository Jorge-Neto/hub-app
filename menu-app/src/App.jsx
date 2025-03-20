import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <h1>HUB de Aplicações</h1>
        <nav>
          <ul>
            <li>
              <Link to="/angular-app">Calculadora de Lances (Angular)</Link>
            </li>
            <li>
              <Link to="/vue-app">Caixa Registradora (Vue)</Link>
            </li>
            <li>
              <Link to="/react-app">Dashboard Financeiro (React)</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
