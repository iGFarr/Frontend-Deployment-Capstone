import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck({ decks }){
    const initialFormState = {
        name: "",
        description: "",
    }

    const [formData, setFormData] = useState({...initialFormState});
    const [newDeck, setNewDeck] = useState({});
    const history = useHistory();

    const handleChange = ({target}) => {
        const value = target.value;
        setFormData({...formData, [target.name]: value,})
        setNewDeck({id: (decks.length + 1), name: formData.name, description: formData.description});
        console.log(newDeck)
    }

    const handleSubmit = () => {
        createDeck(newDeck);
        history.push(`/decks/${newDeck.id}`);
        
    }
    return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page"><NavLink to="/decks/new">Create Deck</NavLink></li>
            </ol>
        </nav>
        <h1>Create Deck</h1>
        <br/>
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
                <NavLink to="/" className="btn mr-3 btn-secondary">Cancel</NavLink>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>
        </form>
    </div>
    )
}


export default CreateDeck;