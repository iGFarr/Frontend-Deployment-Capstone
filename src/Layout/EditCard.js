import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom"
import { readCard, updateCard, readDeck } from "../utils/api";

function EditCard({ deck, setDeck }){
    const { cardId, deckId } = useParams();
    const [card, setCard] = useState({})
    const [edittedCard, setEdittedCard] = useState({});
    const history = useHistory();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        async function loadCard(){
            const cardInfo = await readCard(cardId);
            setCard(cardInfo); 
            setFormData({
                id: cardInfo.id, 
                front: cardInfo.front, 
                back: cardInfo.back,
                deckId: cardInfo.deckId})
        }
        loadCard();
    }, [cardId])

    useEffect(() => {
        async function loadDeck(){
            const temp = await readDeck(deckId);
            setDeck(temp)
        }
        loadDeck();
    }, [deckId])

    const handleChange = ({target}) => {
        const value = target.value;
        setFormData({...formData, [target.name]: value})
        setEdittedCard({
            id: card.id, 
            front: formData.front, 
            back: formData.back, 
            deckId: deck.id});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCard(edittedCard);
        await updateCard(edittedCard);
        history.push(`/decks/${deckId}`);
        
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">{`Edit Card: ${card.id}`}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <form onSubmit={handleSubmit} style={{display: "inline-block", width: "100%"}}>
                <label htmlFor="front">
                    <textarea
                    id="front"
                    name="front"
                    onChange={handleChange}
                    value={formData.front}
                    ></textarea>
                </label>
                <br/>
                <p>Description</p>
                <label htmlFor="back">
                    <textarea 
                    id="back" 
                    name="back" 
                    onChange={handleChange} 
                    value={formData.back} 
                    ></textarea>
                </label>
                <div>
                    <NavLink to={`/decks/${deck.id}`} className="btn mr-3 btn-secondary">Cancel</NavLink>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                </div>
            </form>
        </div>
    )}

export default EditCard;