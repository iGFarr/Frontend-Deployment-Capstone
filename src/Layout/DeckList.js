import React from "react";



export const DeckList = ({decks, cards}) => {
    const list = decks.map((deck, index) => {
        let cardCounter = 0;
        console.log(cards)
        deck.cards.forEach((card) => {if (card.deckId === deck.id){ cardCounter++}})
        return (
            <tr className="card" key={index} style={{marginBottom: "10px", marginTop: "10px"}}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                <td>
                <h2 className="card-title">
                {deck.name}
                </h2>
                </td>
                <td className="align-text-top font-weight-light">{cardCounter} cards</td>
                </div>
                <p className="card-text">{deck.description}</p>
              </div>
            </tr>
        )
    })
    return <ul>{list}</ul>
}

export default DeckList;