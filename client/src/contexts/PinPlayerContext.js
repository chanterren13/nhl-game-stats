import React, { createContext, useState } from "react";

export const PinPlayerContext = createContext({
  player: null,
  setPlayer: () => {},
});

export const PinPlayerProvider = (props) => {
  const [player, setPlayer] = useState(null);

  return (
    <PinPlayerContext.Provider value={{ player: player, setPlayer: setPlayer }}>
      {props.children}
    </PinPlayerContext.Provider>
  );
};
