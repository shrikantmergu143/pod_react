import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

export default function Button(props) {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const onClick =async (e) =>{
        e.preventDefault();
        if(props?.to){
            navigate(props?.to)
        }else{
            setLoader(true);
            await props?.onClick(e);
            setLoader(false);
        }
    }

  return (
    <button onClick={onClick} disabled={loader} type={props?.type} className={`btn button btn-${props?.variant} btn-${props?.size}`}>
      {props?.children}
    </button>
  )
}
Button.propTypes = {
    variant: PropTypes?.any,
    className: PropTypes?.any,
    type: PropTypes?.any,
    onClick: PropTypes?.func,
    size: PropTypes?.any,
}
Button.defaultProps = {
    variant: "",
    className: "",
    size: "",
    onClick: ()=>{},
    type: "button"
}