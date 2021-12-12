import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Deck from "./Deck";

function ViewDeck(){
    const { url } = useRouteMatch();

    return (
        <Switch>
            <Route path={url} >
                <Deck />
            </Route>
        </Switch>
    )
}