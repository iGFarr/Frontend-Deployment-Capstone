import React, { useState, useEffect} from "react";
import Header from "./Header";
import Deck from "./Deck.js"
import EditDeck from "./EditDeck.js"
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck.js";
import Home from "./Home.js"
import Study from "./Study.js"
import { listDecks } from "../utils/api/index"
import {Route, Switch } from "react-router-dom";




function Layout() {
  const [decks, setDecks] = useState([]);


  useEffect(() => {
    async function loadDecks(){
      const response = await listDecks();
      setDecks(response);
    }
    loadDecks();
  }, [])
  return (
    <>
    <Header />
      <div className="container">
        <Switch>
            <Route exact path="/">
              <Home decks={decks} setDecks={setDecks} />
            </Route>
            <Route path="/decks/new">
              <CreateDeck decks={decks} />
            </Route>
            <Route path="/decks/:deckId/study">
              <Study />
            </Route>
            <Route path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route path="/decks/:deckId">
              <Deck />
            </Route>
            <Route>
              <NotFound />
            </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
