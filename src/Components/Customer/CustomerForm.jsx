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

export default function CustomerForm(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        phone1:"",
        phone2:"",
        address:"",
        request_type: "ADD_CUSTOMER",
        city: "",
        state: "",
        pincode: "",
        fax: "",
        tally_name: "",
        GST_no: "",
        remarks: "",
    });
    const [error, setError] = useState({
        name:"",
        email:"",
        phone1:"",
        phone2:"",
        address:"",
        request_type: "ADD_CUSTOMER",
        city: "",
        state: "",
        pincode: "",
        fax: "",
        tally_name: "",
        GST_no: "",
        remarks: "",
    });
    const location = useLocation();
    useEffect(()=>{
        if(location?.state?.code){
            setFormData((data)=>({
                ...data,
                ...location?.state,
            }))
        }
    },[location?.state?.code]);

    const onChange = (e) =>{
        if(e.target.type == "checkbox"){
            setFormData((data)=>({
                ...data,
                [e.target.name]:e.target.checked,
            }))
        }else{
            setFormData((data)=>({
                ...data,
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
        if(formData?.name == ""){
            error.name = "Please provide username";
            val = false;
        }
        if(formData?.email == ""){
            error.email = "Please provide email";
            val = false;
        }
        if(formData?.phone1 == ""){
            error.phone1 = "Please provide phone";
            val = false;
        }
        if(formData?.address == ""){
            error.address = "Please provide address";
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
        }
        if(formData?.GST_no){
            payload.GST_no = formData?.GST_no;
        }
        if(formData?.email){
            payload.email = formData?.email;
        }
        if(formData?.name){
            payload.name = formData?.name;
        }
        if(formData?.phone1){
            payload.phone1 = formData?.phone1;
        }
        if(formData?.phone2){
            payload.phone2 = formData?.phone2;
        }
        if(formData?.address){
            payload.address = formData?.address;
        }
        if(formData?.city){
            payload.city = formData?.city;
        }
        if(formData?.state){
            payload.state = formData?.state;
        }
        if(formData?.fax){
            payload.fax = formData?.fax;
        }
        if(formData?.tally_name){
            payload.tally_name = formData?.tally_name;
        }
        if(formData?.remarks){
            payload.remarks = formData?.remarks;
        }
        return payload;
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        if(validation()){
            const payload = getPayloadCustomer(formData);
            if(location?.state?.code){
                payload.request_type = App_url?.API?.UPDATE_CUSTOMER;
                payload.customer_code = formData?.code;
                payload.updated_details = getPayloadCustomer(formData);
            }else{
                payload.request_type = App_url?.API?.ADD_CUSTOMER;
            }
            const response = await PostRequestCallAPI(App_url?.API.CUSTOMER,payload);
            if(response?.status === 200){
                toast.success(response?.data?.message);
                navigate(App_url?.Customer)
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
                    label={"Name"}
                    onChange={onChange}
                    value={formData?.name}
                    error={error?.name}
                    name={"name"}
                    required
                />
                
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Email"}
                    onChange={onChange}
                    value={formData?.email}
                    error={error?.email}
                    name={"email"}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Phone"}
                    onChange={onChange}
                    value={formData?.phone1}
                    name={"phone1"}
                    error={error?.phone1}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Phone 2"}
                    onChange={onChange}
                    value={formData?.phone2}
                    name={"phone2"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"GST No."}
                    onChange={onChange}
                    value={formData?.GST_no}
                    name={"GST_no"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Fax"}
                    onChange={onChange}
                    value={formData?.fax}
                    name={"fax"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Tally Name"}
                    onChange={onChange}
                    value={formData?.tally_name}
                    name={"tally_name"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Remarks"}
                    onChange={onChange}
                    value={formData?.remarks}
                    name={"remarks"}
                />
              
                <h6 className='col-12'>Address Details</h6>
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Address"}
                    onChange={onChange}
                    value={formData?.address}
                    error={error?.address}
                    name={"address"}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"City"}
                    onChange={onChange}
                    value={formData?.city}
                    name={"city"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"State"}
                    onChange={onChange}
                    value={formData?.state}
                    name={"state"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Pincode"}
                    onChange={onChange}
                    value={formData?.pincode}
                    name={"pincode"}
                />
                <div className='col-12 d-flex align-item-center justify-content-end gap-2 pt-3 pb-3'>
                    <Button type={"submit"} onClick={onSubmit} variant={"primary"} size={"sm"}>{props?.submitTitle}</Button>
                    <Button to={App_url.Customer} variant={"outline-danger"} size={"sm"}>Cancel</Button>
                </div>
            </form>
        </div>
    </div>
  )
}
CustomerForm.propTypes = {
    title: PropTypes.any,
    submitTitle: PropTypes.any
}
CustomerForm.defaultProps = {
    title:"Add New Customer",
    submitTitle:"Add Customer"
}