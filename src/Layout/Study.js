import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams, NavLink, useHistory} from "react-router-dom";

function Study(){
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cardIndex, setCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [card, setCard] = useState({});
    const history = useHistory();
    

    useEffect(() => {
        async function loadDeck(){
            await readDeck(deckId).then((deck) => setDeck(deck)).then(setCard(deck.cards[0]));    
        }
        loadDeck();
    }, [deckId])

    function nextHandler(){
        setCardIndex((cardIndex) => cardIndex + 1);
        setFlipped(!flipped);
        if (cardIndex === deck.cards.length){
            if(window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page")){
                setCardIndex(0);
                setCard(deck.cards[cardIndex]);
            }
            else {history.push("/")}}
        
        else {
            setCard(deck.cards[cardIndex]);
        }
}


    const flipHandler = () => {
        return setFlipped(!flipped);
    }
    return  (
        <div className="d-flex flex-column justify-content-center">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`} >{deck.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <br />
            <h1>Study: {deck.name}</h1>
            <div className="d-flex card">
                <div className="card-body">
                    <h2 className="card-title">Card {cardIndex + 1} of {deck.cards.length}</h2>
                    <h3 className="card-description">{flipped ? card.back : card.front}</h3>
                    <button className="btn btn-secondary" style={{marginRight: "10px"}} onClick={flipHandler}>Flip</button>
                    {flipped && <button className="btn btn-primary" onClick={nextHandler}>Next</button>}
                </div>
            </div>
        </div>
    )
}

export default Study;
