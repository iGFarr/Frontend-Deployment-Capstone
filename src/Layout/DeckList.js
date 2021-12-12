import React from "react";
import { NavLink, useHistory } from "react-router-dom"
import trashCan from "../images/trashCan.jpg"
import { deleteDeck } from "../utils/api";




export const DeckList = ({decks, setDecks}) => {
    const history = useHistory();

    const deleteHandler = (event) => {
        const id = parseFloat(event.target.id);
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
                deleteDeck(id);
                history.push("/");
          
        }
    }
    const list = decks.map((deck) => {

        return (
            <div className="card" key={deck.id} style={{marginBottom: "10px", marginTop: "10px"}}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                <div>
                <h2 className="card-title">
                {deck.name}
                </h2>
                </div>
                <p className="align-text-top font-weight-light">{deck.cards.length} cards</p>
                </div>
                <p className="card-text">{deck.description}</p>
                <div className="d-flex justify-content-between">
                    <div>
                    <NavLink to={`decks/${deck.id}`} style={{marginRight: "10px"}} className="btn btn-secondary">View</NavLink>
                    <NavLink to={`decks/${deck.id}/study`} className="btn btn-primary">Study</NavLink>
                    </div>
                    <button id={deck.id} className="btn btn-danger" onClick={deleteHandler}>
                        <img src={trashCan} alt="trash can" className="img-fluid" style={{width: "30px"}} />
                    </button>  
                </div>
              </div>
            </div>
        )
    })
    return <ul>{list}</ul>
}

export default DeckList;