export const ActionTypes = {
    SET_STORE_CUSTOMER_LIST: "SET_STORE_CUSTOMER_LIST",
    SET_STORE_TRANSPORTER_LIST: "SET_STORE_TRANSPORTER_LIST",
    SET_STORE_DELIVERY_LIST: "SET_STORE_DELIVERY_LIST",
    SET_STORE_CUSTOMER_LIST_OPTIONS:"SET_STORE_CUSTOMER_LIST_OPTIONS",
    SET_STORE_TRANSPORTER_OPTIONS:"SET_STORE_TRANSPORTER_OPTIONS",
    SET_SHOW_OFFCANVAS_POPUP:"SET_SHOW_OFFCANVAS_POPUP",
    SET_STORE_DELIVERY_DETAILS:"SET_STORE_DELIVERY_DETAILS",
}
export const setStoreCustomerList = (payload) =>{
    return{ type:ActionTypes?.SET_STORE_CUSTOMER_LIST, payload:payload }  //User Login
}
export const setStoreTransporterList = (payload) =>{
    return{ type:ActionTypes?.SET_STORE_TRANSPORTER_LIST, payload:payload }  //User Login
}
export const setStoreDeliveryList = (payload) =>{
    return{ type:ActionTypes?.SET_STORE_DELIVERY_LIST, payload:payload }  //User Login
}
export const setStoreCustomerListOptions = (payload) =>{
    return{ type:ActionTypes?.SET_STORE_CUSTOMER_LIST_OPTIONS, payload:payload }  //User Login
}
export const setStoreTransporterOptions = (payload) =>{
    return{ type:ActionTypes?.SET_STORE_TRANSPORTER_OPTIONS, payload:payload }  //User Login
}
export const setShowOffCanvasPopup = (payload) =>{
    return{ type:ActionTypes?.SET_SHOW_OFFCANVAS_POPUP, payload:payload }  //User Login
}
export const setStoreDeliveryDetails = (payload) =>{
    return{ type:ActionTypes?.SET_STORE_DELIVERY_DETAILS, payload:payload }  
}