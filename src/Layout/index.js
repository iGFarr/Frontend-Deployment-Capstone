import React, { useState, useEffect} from "react";
import Header from "./Header";
import ViewDeck from "./ViewDeck";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck.js";
import Home from "./Home.js"
import { listDecks } from "../utils/api/index"
import {Route, Switch, useParams } from "react-router-dom";
import NewCard from "./NewCard";




function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDecks(){
      const response = await listDecks();
      setDecks(response);
    }
    loadDecks();
  }, [])
  return (
    <div>
    <Header />
      <div className="container">
        <Switch>
            <Route exact path="/">
              <Home deck={deck} decks={decks} setDecks={setDecks} />
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <NewCard />
            </Route>
            <Route path="/decks/new">
              <CreateDeck decks={decks} />
            </Route>
            <Route path="/decks/:deckId">
              <ViewDeck deck={deck} setDeck={setDeck} setDecks={setDecks} />
            </Route>
            <Route>
              <NotFound />
            </Route>
        </Switch>
      </div>
      </div>
  );
}

export default Layout;
