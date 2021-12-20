import React, { useEffect, useState } from "react";
import { useParams, NavLink, useRouteMatch } from "react-router-dom";
import { readDeck, deleteCard }  from "../utils/api/index.js";
import trashCan from "../images/trashCan.jpg"

function CardList({ deck }){

    const [list, setList] = useState([]);
    const { deckId } = useParams();
    const [loaded, setLoaded] = useState(false);
    const { url } = useRouteMatch();

    const deleteHandler = async (event) => {
        const id = parseFloat(event.currentTarget.id);
        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
                await deleteCard(id);         
        }
    }

    useEffect(() => {
        async function loadDeck(){
            const { cards } = await readDeck(deckId);
            setLoaded(true);
            setList(cards.map((card, index) => (
                <div key={index} className="card w-100">
                    <div className="d-flex-inline card-body">
                        <div className="d-flex flex-row justify-content-between">
                        <p className="card-text flex-column flex-wrap mr-5">{card.front}</p>
                        <p className="card-text flex-column flex-wrap ml-5">{card.back}</p>
                        </div>
                        <div className="d-flex flex-row justify-content-end">
                            <NavLink to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary mr-3">
                                Edit Card
                            </NavLink>
                            <a href={`${url}`} id={card.id} className="btn btn-danger" onClick={deleteHandler}>
                                <img src={trashCan} alt="trash can" className="img-fluid" style={{width: "30px"}} />
                            </a>
                        </div>
                    </div>
                </div>
            )))
        }
        loadDeck();
    }, [deckId])
 
    if(loaded){
        return <div>{list}</div>
    }
    else{ return <div><p>Not yet loaded</p></div> }   
}

export default CardList;