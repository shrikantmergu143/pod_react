/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import DefaultLayout from '../Layout/Index'
import DeliveryForm from './DeliveryForm'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreDeliveryDetails, setStoreLoader } from '../../redux/actions';
import App_url from '../Common/constant';
import { PostRequestCallAPI } from '../api/PostRequest';

export default function EditDeliveryPage() {
  const dispatch = useDispatch();
    const {deliveryDetails} = useSelector((state)=>state?.allReducers)
    const param = useParams();
    useEffect(()=>{
    if(param?.delivery_no){
        getDeliveryDetails(param?.delivery_no);
    }
  },[])
  const getDeliveryDetails = async (id) =>{
      dispatch(setStoreLoader(true))
      const payload = {
          request_type:App_url.API.GET_DELIVERY_DETAILS,
          delivery_code:id
      }
      const response = await PostRequestCallAPI(App_url.API.DELIVERY, payload);
      if(response?.status === 200){
          dispatch(setStoreDeliveryDetails(response?.data?.data));
      }else{
          dispatch(setStoreDeliveryDetails());
      }
      dispatch(setStoreLoader(false))
  }
  return (
    <DefaultLayout>
      <DeliveryForm deliveryDetails={deliveryDetails} submitTitle={"Update"} title={"Edit Delivery Challan"}/>
    </DefaultLayout>
  )
}
