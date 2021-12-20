import React, { useEffect } from "react";
import { useParams, NavLink, useRouteMatch, useHistory} from "react-router-dom"
import { deleteDeck, readDeck } from "../utils/api";
import CardList from "./CardList.js"
import trashCan from "../images/trashCan.jpg"

function Deck({ deck, setDecks, setDeck }){
    const {url} = useRouteMatch();
    const history = useHistory();
    const { deckId } = useParams();

    useEffect(() => {
        async function loadDeck(){
            const temp = await readDeck(deckId);
            setDeck(temp)
        }
        loadDeck();
    }, [deckId])

const buttonMargin = {marginRight: "20px"};

const deleteHandler = async (event) => {
      const id = parseFloat(event.currentTarget.id);
      setDecks((decks) => decks.filter((thisDeck) => thisDeck.id !== id))
      await deleteDeck(deck.id);
      history.push("/");
}

return (
    <div className="d-flex flex-column justify-content-center">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page"><NavLink to={`/decks/${deck.id}`} >{deck.name}</NavLink></li>
            </ol>
        </nav>
        <h2>{deck.name}</h2>
        <p style={{fontSize: "20px"}}>{deck.description}</p>
        <div>
            <NavLink to={`${url}/edit`} style={buttonMargin} className="btn btn-secondary">Edit</NavLink>
            <NavLink to={`${url}/study`} style={buttonMargin} className="btn btn-primary">Study</NavLink>
            <NavLink to={`${url}/cards/new`} style={buttonMargin} className="btn btn-primary">Add Cards</NavLink>
            <button id={deck.id} className="btn btn-danger" onClick={deleteHandler}>
                        <img src={trashCan} alt="trash can" className="img-fluid" style={{width: "30px"}} />
                    </button>
            <br/>
            <br/>
            <h2>Cards</h2>
            <br/>
        </div>
        <CardList deck={deck}  />
    </div>
)
}

export default Deck;