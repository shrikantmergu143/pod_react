import React from 'react'
import PropTypes from 'prop-types';

export default function Icon(props) {
    const IconAttr = () =>{
        return(
            <i onClick={props?.onClick} className={`common_icon font-${props?.size} ${props?.className}`} style={{"--icon":`url(${props?.attr})`}} />
        )
    }
  if(props?.button){
    return(
        <button onClick={props?.onClick} title={props?.title} data-toggle="tooltip" className={`btn btn-icon btn-${props?.hover?"hover":""} btn-${props?.size} ${props?.classNameButton}`}>
            {IconAttr()}
        </button>
    )
  }
  return (
    IconAttr()
  )
}
Icon.propTypes = {
  className: PropTypes.any,
  classNameButton: PropTypes.any,
  size: PropTypes.any,
  active: PropTypes.any,
  circle: PropTypes.any,
  attr: PropTypes.any,
  title: PropTypes.any,
  onClick: PropTypes.func,
  hover: PropTypes.bool
}
Icon.defaultProps = {
  className:"",
  classNameButton:"",
  size:"sm",
  active:false,
  circle:false,
  hover:false,
  attr: "",
  title: "",
  onClick: ()=>{},
}