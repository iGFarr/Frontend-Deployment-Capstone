import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm.js"

function NewCard(){
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
  
    useEffect(() => {
  
      async function loadDeck() {
          const deckInfo = await readDeck(deckId);
          setDeck(deckInfo);
        } 
         loadDeck();
    }, [deckId]);
  
    //Creates a new card
    async function handleSubmit(card) {
        await createCard(deckId, card);
    }
  
    //Returns to deck details screen
    function handleCancel() {
      history.push(`/decks/${deckId}`);
    }
  
    return (
      <div>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <NavLink to='/'>
                Home
              </NavLink>
            </li>
            <li className='breadcrumb-item'>
              <NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Add Card
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Add Card</h1>
        <CardForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
      </div>
    );
  }
  

export default NewCard;