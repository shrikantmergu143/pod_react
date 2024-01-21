import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setShowOffCanvasPopup, setStoreDeliveryList, setStoreLoader, setStoreTabState } from '../../redux/actions';
const SideBar = React.lazy(()=>import('./SideBar'));
const Header = React.lazy(()=>import('./Header'));
const SideMenu = React.lazy(()=>import('./SideMenu'));

export default function DefaultLayout(props) {
  const dispatch = useDispatch();
  const { deliveryList, tabState, loader } = useSelector((state)=>state?.allReducers);

  useEffect(()=>{
    setState()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const setState = () =>{
    if(deliveryList === undefined){
      dispatch(setStoreDeliveryList());
    }
    if(tabState === undefined){
      dispatch(setStoreTabState());
    }
    dispatch(setShowOffCanvasPopup());
    dispatch(setStoreLoader());
  }
  const Loader = () =>{
    if(!loader){
      return (
        <React.Fragment></React.Fragment>
      )
    }
    return(
     <div className='spinContainer'>
        <svg class="spinner" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
     </div>
    )
  }
  return (
    <React.Suspense fallback={<React.Fragment/>}>
        <div className='layout-wrapper'>
          <Header/>
          <div className="content-wrapper">
            <SideMenu/>
            <div className="content-body">
                <div className="content">
                  <div className='content-inside'>
                    {props?.children}
                    <Loader/>
                  </div>
                </div>
            </div>
          </div>
          <SideBar/>
      </div>
    </React.Suspense>
  )
}
