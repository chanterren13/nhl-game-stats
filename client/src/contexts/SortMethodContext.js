import React, { createContext, useState } from "react";

export const SortMethodContext = createContext({
    options: null,
    setMethod: () => {}
});

export const SortMethodProvider = (props) => {
    const [method, setMethod] = useState({
        method: "goals",
        order: "DESC"
    });

    return (
        <SortMethodContext.Provider value={{options: method, setMethod: setMethod}}>
            {props.children}
        </SortMethodContext.Provider>
    )
}