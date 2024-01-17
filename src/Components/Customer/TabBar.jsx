/* eslint-disable eqeqeq */
import React from "react";
import PropTypes from "prop-types";
import { Tab, TabContent } from "react-bootstrap";
export default function TabBar(props) {
    const TabText = () =>{
        return(
            <React.Fragment>
                <span className="d-sm-block">
                    {props?.title}
                </span>
            </React.Fragment>
        )
    }
  return (
    <React.Fragment>
        <Tab title={<TabText/>} displayName={props?.title} eventKey={props?.eventKey}>
                {props?.children}
        </Tab>
    </React.Fragment>
  )
}

TabBar.propTypes = {
    eventKey: PropTypes?.any.isRequired,
    title: PropTypes?.any.isRequired,
}
TabBar.defaultProps = {
    eventKey: "",
    title: "",
}