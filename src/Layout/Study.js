import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams, NavLink, useHistory} from "react-router-dom";

function Study({ deck, setDeck }){
    const { deckId } = useParams();
    const [length, setLength] = useState(0);
    const [cardIndex, setCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [card, setCard] = useState({});
    const history = useHistory();

    useEffect(() => {
        async function loadDeck(){
            const temp = await readDeck(deckId);
            setCard(temp.cards[0])
            setLength(temp.cards.length)
            setDeck(temp)
        }
        loadDeck();
    }, [deckId])

    async function nextHandler(){
        setFlipped(!flipped);
        setCardIndex((cardIndex) => cardIndex + 1)
        if (cardIndex + 1 === length){
            if(window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page")){
                setCardIndex(0)
                setCard(deck.cards[0]);
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
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deck.id}`} >{deck.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <br />
            <h1>Study: {deck.name}</h1>
            {length < 3 ? (
                <div>
                    <h3>Not enough cards.</h3>
                    <p>You need at least 3 cards to study. There are {length} cards in this deck.</p>
                    <NavLink to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add cards</NavLink>
                </div>
            ) :
            <div className="d-flex card">
                <div className="card-body">
                    <h2 className="card-title">Card {cardIndex + 1} of {length}</h2>
                    <h3 className="card-description">{flipped ? card.back : card.front}</h3>
                    <button className="btn btn-secondary" style={{marginRight: "10px"}} onClick={flipHandler}>Flip</button>
                    {flipped && <button className="btn btn-primary" onClick={nextHandler}>Next</button>}
                </div>
            </div>
            }
        </div>
    )
}

export default Study;
