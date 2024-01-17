import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import SideMenu from './SideMenu'
import { setShowOffCanvasPopup } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function SideBar() {
  const { deliveryList, OffCanvasPopup } = useSelector((state)=>state?.allReducers);
  const dispatch = useDispatch();
  return (
    <Offcanvas show={OffCanvasPopup?.show === "SIDE_MENU"} className={"side-bar-menu"} onHide={()=>dispatch(setShowOffCanvasPopup())}>
      <SideMenu className={"open"}/>
    </Offcanvas >
  )
}
