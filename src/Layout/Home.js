import React from "react";
import { NavLink } from "react-router-dom";
import { DeckList } from "./DeckList";

export const Home = ({deck, decks, setDecks}) => {

    return    (
    <div>
    <NavLink to="decks/new" className="btn btn-secondary btn-lg" style={{marginLeft: "40px"}} >Create Deck</NavLink>
    <DeckList deck={deck} decks={decks} setDecks={setDecks} />
    </div>
)
}

export default Home;
