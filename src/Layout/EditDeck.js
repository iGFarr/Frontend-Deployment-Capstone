import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";

function EditDeck({ deck }){
    const [edittedDeck, setEdittedDeck] = useState({});
    const initialFormState = {
        id: deck.id,
        name: deck.name,
        description: deck.description
    }
    const history = useHistory();
    const [formData, setFormData] = useState({...initialFormState});

    const handleChange = ({target}) => {
        const value = target.value;
        setFormData({...formData, [target.name]: value})
        setEdittedDeck({id: deck.id, name: formData.name, description: formData.description});
    }

    const handleSubmit = () => {
        updateDeck(edittedDeck);
        history.push(`/decks/${deck.id}`);
        
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deck.id}`}>{deck.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page"><NavLink to={`/decks/${deck.id}/edit`} >Edit Deck</NavLink></li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit} style={{display: "inline-block", width: "100%"}}>
                <label htmlFor="name">
                    <p>Name</p>
                    <input
                    style={{width: "100%"}}
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="Deck Name"
                    />
                </label>
                <br/>
                <p>Description</p>
                <label htmlFor="description">
                    <textarea 
                    id="description" 
                    name="description" 
                    onChange={handleChange} 
                    value={formData.description} 
                    placeholder="Brief description of the deck"
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

export default EditDeck;