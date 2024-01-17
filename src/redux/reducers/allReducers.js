/* eslint-disable */
import { ActionTypes } from "../actions";

export const initialData = {
    customerList:{
        total_records: 0,
        current_page: 1,
        records_per_page: 10,
        data: []
    },
    transporterList:{
        total_records: 0,
        current_page: 1,
        records_per_page: 10,
        data: []
    },
    deliveryList:{
        total_records: 0,
        current_page: 1,
        records_per_page: 10,
        data: []
    },
    customerOption:[],
    transporterOption:[],
    OffCanvasPopup:{
        title:"",
        data:{},
        show:"",
        callBackModal:()=>null,
        buttonSuccess:""
    },
    deliveryDetails:{
        customer:{},
        delivery:{},
        delivery_line:[],
        transporter:{}
    }
}

export const allReducers = (state = initialData, action) => {
    switch(action.type) {
        case ActionTypes.SET_STORE_CUSTOMER_LIST:
            return{
                ...state,
                customerList:action?.payload?action?.payload:initialData?.customerList
            }
        case ActionTypes.SET_STORE_CUSTOMER_LIST_OPTIONS:
            return{
                ...state,
                customerOption:action?.payload?action?.payload:initialData?.customerOption
            }
        case ActionTypes.SET_STORE_TRANSPORTER_OPTIONS:
            return{
                ...state,
                transporterOption:action?.payload?action?.payload:initialData?.transporterOption
            }
        case ActionTypes.SET_STORE_TRANSPORTER_LIST:
            return{
                ...state,
                transporterList:action?.payload?action?.payload:initialData?.transporterList
            }
        case ActionTypes?.SET_STORE_DELIVERY_LIST:
            return{
                ...state,
                deliveryList:action?.payload?action?.payload:initialData?.deliveryList
            }
        case ActionTypes.SET_SHOW_OFFCANVAS_POPUP:
            return{
                ...state,
                OffCanvasPopup:action?.payload?.show ? action?.payload:initialData?.OffCanvasPopup
            }
        case ActionTypes.SET_STORE_DELIVERY_DETAILS:
            return{
                ...state,
                deliveryDetails:action?.payload? action?.payload:initialData?.deliveryDetails
            }
        default:
        return state;
  }
};
