import React from "react";
import { NavLink } from "react-router-dom"
import trashCan from "../images/trashCan.jpg"



export const DeckList = ({decks, setDecks}) => {

    const deleteHandler = (event) => {
        const id = parseFloat(event.target.id);
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
            setDecks((currentDecks) => currentDecks.filter((deck) => deck.id !== id))
        }
    }
    const list = decks.map((deck) => {

        return (
            <tr className="card" key={deck.id} style={{marginBottom: "10px", marginTop: "10px"}}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                <td>
                <h2 className="card-title">
                {deck.name}
                </h2>
                </td>
                <td className="align-text-top font-weight-light">{deck.cards.length} cards</td>
                </div>
                <p className="card-text">{deck.description}</p>
                <div className="d-flex justify-content-between">
                    <td>
                    <NavLink to={`decks/${deck.id}`} style={{marginRight: "10px"}} class="btn btn-secondary">View</NavLink>
                    <NavLink to={`decks/${deck.id}/study`} class="btn btn-primary">Study</NavLink>
                    </td>
                    <td>
                        <button id={deck.id} className="btn btn-danger" onClick={deleteHandler}><img src={trashCan} alt="trash can" className="img-fluid" style={{width: "30px"}} /></button>  
                    </td>
                </div>
              </div>
            </tr>
        )
    })
    return <ul>{list}</ul>
}

export default DeckList;