import { ApolloProvider } from "@apollo/client";
import client from "./configs/apollo";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
import List from './pages/List';
import Detail from "./pages/Detail";
import MyPokemons from "./pages/MyPokemons";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <div className="main-logo">
            <img alt="Pokemon Logo" src="/pokemon.png"></img>
          </div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/pokemon-list/:generation" component={List} />
            <Route path="/pokemon/:pokemonName" component={Detail} />
            <Route path="/my-pokemons" component={MyPokemons} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>


  );
}

export default App;
