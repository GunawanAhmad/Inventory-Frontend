import React from "react";

export const MilikContext = React.createContext();

export const ContextProvider = (props) => {
  const [milik, setMilik] = React.useState("Internal");
  return (
    <MilikContext.Provider value={[milik, setMilik]}>
      {props.children}
    </MilikContext.Provider>
  );
};
