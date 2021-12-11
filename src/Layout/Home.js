import React from "react";
import { NavLink } from "react-router-dom";
import { DeckList } from "./DeckList";

export const Home = ({decks, setDecks}) => {

    return    (
    <div className="">
    <NavLink to="/new" className="btn btn-secondary btn-lg" style={{marginLeft: "40px"}} >Create Deck</NavLink>
    <DeckList decks={decks} setDecks={setDecks} />
    </div>
)
}

export default Home;
