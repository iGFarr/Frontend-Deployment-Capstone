import React from "react";
import { useHistory } from "react-router-dom";
import { DeckList } from "./DeckList";

export const Home = ({decks}) => {
    const history = useHistory();

    const createButtonHandler = () => history.push("/new")
    return    (
    <div className="">
    <button className="btn btn-secondary" onClick={createButtonHandler}>Create Deck</button>
    <DeckList decks={decks} />
    </div>
)
}

export default Home;
