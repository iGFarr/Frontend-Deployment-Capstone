import React, { useState, useEffect} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home.js"
import { listDecks } from "../utils/api/index"
import { useRouteMatch, Route, Switch } from "react-router-dom";




function Layout() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadDecks(){
      const response = await listDecks();
      console.log(response);
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
              <Home decks={decks} />
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
