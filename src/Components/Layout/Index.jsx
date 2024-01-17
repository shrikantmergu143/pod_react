import React, { useEffect } from 'react'
import Header from './Header'
import SideMenu from './SideMenu'
import { useDispatch, useSelector } from 'react-redux';
import { setShowOffCanvasPopup, setStoreDeliveryList } from '../../redux/actions';
import SideBar from './SideBar';

export default function DefaultLayout(props) {
  const dispatch = useDispatch();
  const { deliveryList, OffCanvasPopup } = useSelector((state)=>state?.allReducers);

  useEffect(()=>{
    setState()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const setState = () =>{
    if(deliveryList === undefined){
      dispatch(setStoreDeliveryList());
    }
      dispatch(setShowOffCanvasPopup());
  }
  return (
    <div className='layout-wrapper'>
        <Header/>
        <div className="content-wrapper">
            <SideMenu/>
            <div className="content-body">
                <div className="content">
                    {props?.children}
                </div>
            </div>

        </div>
        <SideBar/>
    </div>
  )
}
