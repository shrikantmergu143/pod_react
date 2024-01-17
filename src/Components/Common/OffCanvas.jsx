/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from "prop-types";
import App_url from './constant';
export default function OffCanvas(props) {
    const id = useMemo(()=>App_url.uuid(), [])
    useEffect(()=>{
        if(props?.show){
            const existingOverlay = document.getElementById(id);
            if (!existingOverlay) {
                const overlay = document.createElement('div');
                overlay.id = id;
                overlay.classList.add('overlay');
                overlay.classList.add('show');
                overlay.onclick = function() {
                    // This function will be executed when the overlay is clicked
                    // You can add your logic here, like hiding the overlay
                    overlay.style.display = 'none'; // Hides the overlay when clicked
                };

                // Append the overlay to the body
                document.body.appendChild(overlay);
            }
        }
    },[props?.show])
  return (
    <div>
      
    </div>
  )
}
OffCanvas.propTypes = {
    onHide: PropTypes?.func
}
OffCanvas.defaultProps = {
    onHide: ()=>{}
}