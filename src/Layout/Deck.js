import React, { useState, useEffect } from "react";
import { useParams, NavLink, useRouteMatch, useHistory} from "react-router-dom"
import { readDeck } from "../utils/api";
import { deleteDeck } from "../utils/api";
import trashCan from "../images/trashCan.jpg"

function Deck({deck, setDeck}){
    const { deckId } = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();

useEffect(() => {
    async function loadDeck(){
        await readDeck(deckId).then((deck) => setDeck(deck));
    }
    loadDeck();
}, [deckId])
const buttonMargin = {marginRight: "20px"};

const deleteHandler = () => {
      deleteDeck(deck.id);
      history.push("/");
}

return (
    <div className="d-flex flex-column justify-content-center">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page"><NavLink to={`/decks/${deckId}`} >{deck.name}</NavLink></li>
            </ol>
        </nav>
        <h2>{deck.name}</h2>
        <p style={{fontSize: "20px"}}>{deck.description}</p>
        <div>
            <NavLink to={`${url}/edit`} style={buttonMargin} className="btn btn-secondary">Edit</NavLink>
            <NavLink to={`${url}/study`} style={buttonMargin} className="btn btn-primary">Study</NavLink>
            <NavLink to={`${url}/cards/new`} style={buttonMargin} className="btn btn-primary">Add Cards</NavLink>
            <button id={deckId} onClick={deleteHandler} className="btn btn-danger" ><img src={trashCan} alt="trash can" className="img-fluid" style={{width: "30px"}} /></button>
            <br/>
            <br/>
            <h2>Cards</h2>
            <br/>

        </div>
    </div>
)
}

export default Deck;