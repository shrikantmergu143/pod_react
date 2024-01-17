import React from 'react'
import Icon from '../Common/Icon'
import App_url from '../Common/constant'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setShowOffCanvasPopup } from '../../redux/actions'

export default function Header() {
    const dispatch = useDispatch();

    const openMenu = (e) =>{
        e.preventDefault();
        dispatch(setShowOffCanvasPopup({
            show:"SIDE_MENU"
        }))
    }
  return (
    <React.Fragment>
        <div className="header d-print-none">
            <div className="header-left">
                <div className="navigation-toggler">
                    <Link onClick={openMenu} data-action="navigation-toggler">
                        <Icon attr={App_url?.Icon.SideMenu} />
                    </Link>
                </div>
                <div className="header-logo">
                    <Link to={"/"}>
                        Pod
                        {/* <img className="logo" src="../../assets/media/image/logo.png" alt="logo"/>
                        <img className="logo-light" src="../../assets/media/image/logo-light.png" alt="light logo"/> */}
                    </Link>
                </div>
            </div>
            <div className="header-body">
                <div className="header-body-left">
                </div>
                <div className="header-body-right">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <Link href="#" className="nav-link" title="Fullscreen" data-toggle="fullscreen">
                                <i className="maximize" data-feather="maximize"></i>
                                <i className="minimize" data-feather="minimize"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="#" className="nav-link" title="Search" data-toggle="dropdown">
                                <Icon attr={App_url?.Icon.Search}/>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link href="#" className="nav-link" title="Apps" data-toggle="dropdown">
                            <Icon attr={App_url?.Icon.Product}/>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link href="#" className="nav-link nav-link-notify" title="Chats" data-toggle="dropdown">
                                <Icon attr={App_url?.Icon.Notification}/>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link href="#" className="nav-link" title="User menu" data-sidebar-target="#user-menu">
                                <figure className="avatar mr-2 avatar-sm">
                                    <Link href="#">
                                        <span className="avatar-title rounded-circle">A</span>
                                    </Link>
                                </figure>
                                <span className="mr-2 d-sm-inline d-none">Roxana Roussell</span>

                            </Link>
                        </li>

                    </ul>

                    <ul className="navbar-nav d-flex align-items-center">
                        <li className="nav-item header-toggler">
                            <Link href="#" className="nav-link">
                                <i data-feather="arrow-down"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}
