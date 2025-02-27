import React from "react";

const SBBContext = React.createContext({
    state: null,
    setState: () => {}
});

export { SBBContext };