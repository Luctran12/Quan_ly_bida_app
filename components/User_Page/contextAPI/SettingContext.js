import React, { createContext, useContext, useState } from "react";

const myContext = createContext();

export const SettingProvider = ({ children }) => {
    const [sex, setSex] = useState("male"); 
    const [name, setName] = useState("Default Name"); 

    return (
        <myContext.Provider value={{ sex, setSex, name, setName }}>
            {children}
        </myContext.Provider>
    );
}

export const useSetting = () => {
    return useContext(myContext);
};
