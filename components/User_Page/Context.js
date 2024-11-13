import {createContext, useContext , useState} from 'react'
const MyContext = createContext();

export function Provider ({children}){
    const [name, setName]= useState("Nguyen Van A");
    return (
        <MyContext.Provider value={{name,setName}}>
            {children}
        </MyContext.Provider>
    )
}

export const useSetting=()=>{
    return useContext(MyContext)
}