import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import Deck from "./Deck";
import { readDeck } from "../utils/api";
import EditDeck from "./EditDeck";
import Study from "./Study";
import EditCard from "./EditCard";
function ViewDeck({ deck, setDeck, setDecks}){
    const { path } = useRouteMatch();
    const { deckId } = useParams();

    useEffect(() => {
        async function loadDeck(){
            const temp = await readDeck(deckId);
            setDeck(temp)
        }
        loadDeck();
    }, [deckId])
    
    return (
        <Switch>
            <Route path={`${path}/study`}>
              <Study deck={deck} setDeck={setDeck}/>
            </Route>
            <Route path={`${path}/edit`}>
              <EditDeck deck={deck} setDeck={setDeck} />
            </Route>
            <Route path={`${path}/cards/:cardId/edit`}>
                <EditCard deck={deck} setDeck={setDeck} />
            </Route>
            <Route exact path={path} >
                <Deck deck={deck} setDecks={setDecks} setDeck={setDeck} />
            </Route>
        </Switch>
    )
}

export default ViewDeck;