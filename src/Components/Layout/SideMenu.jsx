import React from 'react'
import Icon from '../Common/Icon'
import App_url from '../Common/constant'
import { NavLink } from 'react-router-dom'

export default function SideMenu(props) {
  return (
    <div className={`navigation ${props?.className}`}>
        <div className="navigation-menu-body scrollbar">
            <div className="navigation-menu-group">
                <div id="ecommerce ">
                    <ul>
                        <li>
                            <NavLink to={App_url?.Dashboard}>
                                <Icon attr={App_url?.Icon?.Dashboard} />
                                <span className='pl-2'>
                                    Dashboard
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={App_url?.Customer}>
                                <Icon attr={App_url?.Icon.Customer} />
                                <span className='pl-2'>
                                    Customer
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={App_url?.Transporter}>
                                <Icon attr={App_url?.Icon.Transporter} />
                                <span className='pl-2'>
                                    Transporter
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={App_url?.MasterItem}>
                                <Icon attr={App_url?.Icon.Box} />
                                <span className='pl-2'>
                                    Master Item
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={App_url?.DcEntry}>
                                <Icon attr={App_url?.Icon.DcEntry} />
                                <span className='pl-2'>
                                    Delivery
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
