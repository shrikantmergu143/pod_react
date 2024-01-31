/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import InputGroup from '../Common/InputGroup';
import Button from '../Common/Button';
import { PostRequestCallAPI } from '../api/PostRequest';
import App_url from '../Common/constant';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';

export default function MasterItemForm(props) {
    const navigate = useNavigate();
    const Tyre = [
        // {title:"Select Tyre", label:"Select Tyre", value:"Select Tyre"},
        {title:"Nos", label:"Nos", value:"Nos"},
    ];
    const Battery = [
        // {title:"Select Battery", label:"Select Battery", value:"Select Battery"},
        {title:"Nos", label:"Nos", value:"Nos"},
    ];
    const Oil = [
        // {title:"Select Oil", label:"Select Oil", value:""},
        {title:"Drum", label:"Drum", value:"Drum"},
        {title:"Bucket", label:"Bucket", value:"Bucket"},
    ];
    const Designation = [
        // {title:"Select Designation", label:"Select Designation", value:"", disable:true},
        {title:"Tyre", label:"Tyre", value:"Tyre", data:Tyre},
        {title:"Battery", label:"Battery", value:"Battery", data:Battery},
        {title:"Oil", label:"Oil", value:"Oil", data:Oil},
    ];
    
    const [formData, setFormData] = useState({
        item_code:"",
        product_name:"",
        uom:"",
        warranty:"",
        rate:"",
        pack_size:"",
        type:"",
        typeOption:[]
    });
    const [error, setError] = useState({
        item_code:"",
        product_name:"",
        uom:"",
        warranty:"",
        rate:"",
        pack_size:"",
        type:""
    });
    const location = useLocation();
    console.log("location?.state", formData)
    useEffect(()=>{
        if(location?.state?.item_code){
            const findData = Designation?.find((item)=>item?.value === location?.state?.type)
            setFormData((data)=>({
                ...data,
                ...location?.state,
                typeOption:findData?.data,
                warranty:location?.state?.warranty == "Yes"?true:false,
            }))
        }else{
            getUniqueUnit()
        }
    },[location?.state?.code]);

    const getUniqueUnit = async () =>{
    //   const payload = {
    //       request_type:App_url.API.GET_MASTER_ID,
    //       code:param.code
    //   }
    //   const response = await PostRequestCallAPI(App_url.API.MasterItem, payload);
    //   if(response?.status === 200 && response?.data?.data){
    //       setFormData((data)=>({
    //           ...data,
    //           srno:parseFloat(response?.data?.data?.srno) + 1
    //       }))
    //   }else{
    //     setFormData((data)=>({
    //         ...data,
    //         srno: 1
    //     }))
    //   }
    }
    const onChange = (e) =>{
        if(e.target.type == "checkbox"){
            setFormData((data)=>({
                ...data,
                [e.target.name]:e.target.checked,
            }))
        }else{
            const oldData = formData;
            if(e.target.name == "type"){
                oldData.typeOption = e.target.data;
                oldData.uom = "";
            }
            setFormData((data)=>({
                ...data,
                ...oldData,
                [e.target.name]:e.target.value,
            }))
        }
        setError((data)=>({
            ...data,
            [e.target.name]:"",
        }))
    }
    const validation = () =>{
        let val = true;
        if(formData?.user_name == ""){
            error.user_name = "Please provide username";
            val = false;
        }
        if(formData?.product_name === ""){
            error.product_name = "Please provide product name";
            val = false;
        }
        if(formData?.type == ""){
            error.type = "Please provide type";
            val = false;
        }
        if(formData?.item_code == "" && !props?.editState){
            error.item_code = "Please provide Item Code";
            val = false;
        }
        if(formData?.uom == ""){
            error.uom = "Please select sub type";
            val = false;
        }
        if(formData?.rate == ""){
            error.rate = "Please select rate";
            val = false;
        }
        if(formData?.pack_size == "" && formData?.type == "Oil"){
            error.pack_size = "Please select pack size";
            val = false;
        }
        if(formData?.type == ""){
            error.type = "Please select type";
            val = false;
        }
        setError((data)=>({
            ...data,
            ...error
        }))
        return val;
    }
    const getPayloadCustomer = () =>{
        const payload = {
            pack_size:0
        }
        if(formData?.type){
            payload.type = formData?.type;
        }
        if(formData?.product_name){
            payload.product_name = formData?.product_name;
        }
        if(formData?.uom){
            payload.uom = formData?.uom;
        }
        if(formData?.pack_size && (formData?.type !== "Battery" && formData?.type !== "Tyre")){
            payload.pack_size = formData?.pack_size;
        }
        if(formData?.item_code){
            payload.item_code = formData?.item_code;
        }
        if(formData?.rate){
            payload.rate = formData?.rate;
        }
        // if(formData?.warranty){
            payload.warranty = formData?.warranty?"Yes":"No";
        // }
        return payload;
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        if(validation()){
            const payload = getPayloadCustomer(formData);
            if(location?.state?.item_code){
                payload.request_type = App_url?.API?.UPDATE_MASTER_ITEM;
                payload.item_code = location?.state?.item_code;
                payload.srno = location?.state?.srno;
                payload.updated_details = getPayloadCustomer(formData);
            }else{
                payload.request_type = App_url?.API?.ADD_MASTER_ITEM;
            }
            const response = await PostRequestCallAPI(App_url?.API.MasterItem,payload);
            console.log("response", response);
            if(response?.status === 200){
                toast.success(response?.data?.message);
                navigate(`${App_url.MasterItem}`)
            }else{
                if(response?.data?.error){
                    toast.error(response?.data?.error);
                }
            }
            console.log("response", payload)
        }
    }
  return (
    <div className="card">
        <div className="card-body">
            <h6 className='card-title mb-4'>{props?.title}</h6>
            <form className="row" onSubmit={onSubmit}>
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Item Code"}
                    onChange={onChange}
                    value={formData?.item_code}
                    error={error?.item_code}
                    name={"item_code"}
                    required={props?.editState?false:true}
                    readOnly={location?.state?.item_code?true:false}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Product Name"}
                    onChange={onChange}
                    value={formData?.product_name}
                    error={error?.product_name}
                    name={"product_name"}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Type"}
                    onChange={onChange}
                    value={formData?.type}
                    error={error?.type}
                    name={"type"}
                    Select
                    option={Designation}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Sub Type"}
                    onChange={onChange}
                    value={formData?.uom}
                    error={error?.uom}
                    name={"uom"}
                    option={formData?.typeOption}
                    Select
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Rate"}
                    onChange={onChange}
                    value={formData?.rate}
                    error={error?.rate}
                    type='number'
                    name={"rate"}
                    required
                />
               {(formData?.type && formData?.type !== "Battery" && formData?.type !== "Tyre") &&(
                    <InputGroup
                        formClassName={"col-12 col-lg-4 col-sm-6"}
                        label={"Pack Size"}
                        onChange={onChange}
                        value={formData?.pack_size}
                        error={error?.pack_size}
                        type='number'
                        name={"pack_size"}
                        required
                    />
               )}
                 <InputGroup
                    formClassName={"col-12"}
                    label={"Warranty"}
                    onChange={onChange}
                    checked={formData?.warranty}
                    type='switch'
                    name={"warranty"}
                />
                <div className='col-12 d-flex align-item-center justify-content-end gap-2 pt-3 pb-3'>
                    <Button type={"submit"} onClick={onSubmit} variant={"primary"} size={"sm"}>{props?.submitTitle}</Button>
                    <Button to={`${App_url.MasterItem}`} variant={"outline-danger"} size={"sm"}>Cancel</Button>
                </div>
            </form>
        </div>
    </div>
  )
}
MasterItemForm.propTypes = {
    title: PropTypes.any,
    submitTitle: PropTypes.any,
    editState: PropTypes.bool
}
MasterItemForm.defaultProps = {
    title:"Add Master Item",
    submitTitle:"Add Master Item",
    editState: false
}