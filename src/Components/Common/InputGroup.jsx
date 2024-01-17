/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import App_url from './constant';
const removeMultipleBlankSpace = (string, substring) => {
    string = string.replace(/\s+/g, " ");
    return string;
  };
  
export default function InputGroup(props) {
    const { name, leftLabel, label, id, size, className, floatStyle, formClassName, iconSize, onClickRightLabel, onClickLeftLabel, rightLabel, leftIcon, rightIcon, error, type, placeholder } = props;
    const uuid = useMemo(()=>App_url.uuid(), [name]);
    const onChange = (e) =>{
        const { name, checked, type } = e.target;
        if(props?.type !== "select"){
            const substring = "";
            if(e.target.value != " "){
                e.target.value = removeMultipleBlankSpace(e.target.value, substring);
            }else{
                e.target.value = "";
            }
        }
        if(props?.type === "select"){
            const selectOption = props?.option?.find((item)=>item?.value == e.target.value);
            return props?.onChange(e, selectOption);
        }
        if (props?.type == "number") {
            // if(e.target.value != ""){
            //   e.target.value = parseFloat(e.target.value.replace(/[^0-9.]/g, ''))
            // }else{
            //   e.target.value = ""
            // }
            // if(e.target.value<0 || e.target.value===""){
            //   e.target.value = "";
            // }
            let { value } = e.target;
    
            // Remove leading zeroes unless it's the only digit
            value = value.replace(/^0+(?=\d)/, '');
        
            // Allow only one dot
            const dotCount = (value.match(/\./g) || []).length;
            if (dotCount > 1) {
              // More than one dot, remove additional dots
              value = value.slice(0, value.lastIndexOf('.'));
            }
        
            // Replace multiple dots with a single dot
            value = value.replace(/\.+/g, '.');
        
            // Allow only positive numbers with a dot and at most one dot after digits
            const regex = props?.digit ? /^\d*$/ : /^[0-9]*(\.[0-9]{0,2})?$/;
            const isValid = regex.test(value);
            if(e.target.value == ""){
              e.target.value = '';
            }else if (isValid ) {
              e.target.value = value;
              // setInputValue(value);
            }else{
              e.target.value = props?.value;
            }
          }
        props?.onChange(e);
    }
    const InputForm = () =>{
        if(type === "select"){
            return (
                <select
                    value={props?.value}
                    name={name}
                    id={`${uuid}`}
                    className={`custom-select ${props?.error?"is-invalid":""} custom-select-${size} form-control form-control-${size} mx-0`}
                    placeholder={placeholder}
                    onChange={onChange}
                    readOnly={props?.readOnly}
                >
                    {props?.option?.map((item, index)=>(
                        <option value={item?.value} key={index?.toString()} disabled={item?.disabled?true:false}>{item?.label}</option>
                    ))}
                </select>
            )
        }
        return(
            <input
                type={type === "number"?"text":type}
                className={`form-control ${props?.error?"is-invalid":""} m-0 form-control-${size} ${className} ${(leftIcon || leftLabel) &&'ps-0'} ${(rightIcon || rightLabel) &&'pe-0'}`}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                value={props?.value}
                id={`${uuid}`}
                autoComplete=''
                readOnly={props?.readOnly}
            />
        )
    }
    const formGroup = () =>{
        if(type === "checkbox"){
            return(
                <div className="custom-control custom-checkbox">
                    <input type="checkbox"  name={name} className="custom-control-input" onChange={onChange} id={uuid} checked={props?.checked} readOnly={props?.readOnly}/>
                    <label className="custom-control-label" htmlFor={uuid}>{props?.label}</label>
                </div>
            )
        }
        return(
            <React.Fragment>
                {label && !floatStyle &&( 
                    <label htmlFor={uuid} className='form-label text-muted'>
                        {label} {props?.required && <span className='text-danger'>*</span>}
                    </label>
                )}
                <div className={`${floatStyle?"form-floating":"input-group"}`}>
                    {leftLabel && (
                        <div className="input-group-text" onClick={onClickLeftLabel}>
                            {leftLabel}
                        </div>
                    )}
                    {InputForm()}
                    {rightLabel && (
                        <div className="input-group-text" onClick={onClickRightLabel}>
                            {rightLabel}
                        </div>
                    )}
                    {label && floatStyle &&( 
                        <label htmlFor={uuid} className='form-label text-muted'>
                            {label}
                        </label>
                    )}
                </div>
                {error &&( 
                    <span className='form-text-error text-danger'>
                        {error}
                    </span>
                )}
            </React.Fragment>
        )
    }
    return (
        <div className={`form_group form-group ${formClassName} ${props?.error?"was-validated":""}`}>
           {formGroup()}
        </div>
  )
}
InputGroup.propTypes = {
    name: PropTypes.any,
    onChange: PropTypes.func,
    onClickRightLabel: PropTypes.func,
    onClickLeftLabel: PropTypes.func,
    option: PropTypes.any,
    label: PropTypes.any,
    leftLabel: PropTypes.any,
    rightLabel: PropTypes.any,
    leftIcon: PropTypes.any,
    rightIcon: PropTypes.any,
    placeholder: PropTypes.any,
    className: PropTypes.any,
    formClassName: PropTypes.any,
    size: PropTypes.any,
    iconSize: PropTypes.any,
    error: PropTypes.any,
    value: PropTypes.any,
    checked: PropTypes.bool,
    floatStyle: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
}
InputGroup.defaultProps = {
    name:"",
    onChange:()=>{},
    onClickRightLabel:()=>{},
    onClickLeftLabel:()=>{},
    option:[],
    label:"",
    leftLabel:"",
    rightLabel:"",
    leftIcon:"",
    rightIcon:"",
    placeholder:"",
    className:"",
    size:"sm",
    iconSize:"sm",
    formClassName:"",
    type:"text",
    error:"",
    floatStyle:false,
    checked:false,
    required:false,
    readOnly:false,
    value:"",
}