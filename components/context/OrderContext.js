import React, {useContext,createContext,useState, Children} from "react";
const OrderContext= createContext();
export const OrderProvider = ({children})=> {
    const [orderId, setOrderId]= useState(null);
    const [tableId,setTableId]=useState(null)
    return(
        <OrderContext.Provider
            value= {{orderId,setOrderId,tableId,setTableId}}
        >
        {children}
        </OrderContext.Provider>
    );
};
export const useOrder = () => useContext(OrderContext);
