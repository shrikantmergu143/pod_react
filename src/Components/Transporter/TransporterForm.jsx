import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import InputGroup from '../Common/InputGroup';
import Button from '../Common/Button';
import { PostRequestCallAPI } from '../api/PostRequest';
import App_url from '../Common/constant';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';

export default function TransporterForm(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:"",
        user:"",
        email:"",
        cust_password:"",
        address1:"",
        address2:"",
        address3:"",
        request_type: "ADD_CUSTOMER",
        type: "",
        sub_type: "",
        location_code: "",
        city: "",
        state: "",
        pincode: "",
        phone1: "",
        phone2: "",
        fax: "",
        invoice: false,
        GST_no: "",
        remarks: "",
        payment_type: ""
    });
    const [error, setError] = useState({
        name:"",
        user:"",
        email:"",
        cust_password:"",
        address1:"",
        address2:"",
        address3:"",
        request_type: "ADD_CUSTOMER",
        type: "",
        sub_type: "",
        location_code: "",
        city: "",
        state: "",
        pincode: "",
        phone1: "",
        phone2: "",
        fax: "",
        invoice: "",
        GST_no: "",
        remarks: "",
        payment_type: ""
    });
    const location = useLocation();
    useEffect(()=>{
        if(location?.state?.code){
            setFormData((data)=>({
                ...data,
                ...location?.state,
                invoice:location?.state?.invoice === "Y"?true:false
            }))
        }
    },[location?.state?.code]);
    console.log("location?.state", location?.state?.user, formData)
    const onChange = (e) =>{
        console.log("e.target.type", e.target.type)
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
        if(formData?.user == ""){
            error.user = "Please provide username";
            val = false;
        }
        if(formData?.name == ""){
            error.name = "Please provide username";
            val = false;
        }
        if(formData?.email == ""){
            error.email = "Please provide email";
            val = false;
        }
        if(formData?.cust_password == "" && !location?.state?.code){
            error.cust_password = "Please provide password";
            val = false;
        }
        setError((data)=>({
            ...data,
            ...error
        }))
        return val;
    }
    const getPayloadTransporter = () =>{
        const payload = {
            invoice: formData?.invoice?"Y":"N"
        }
        if(formData?.GST_no){
            payload.GST_no = formData?.GST_no;
        }
        if(formData?.user){
            payload.user = formData?.user;
        }
        if(formData?.email){
            payload.email = formData?.email;
        }
        if(formData?.cust_password){
            payload.cust_password = formData?.cust_password;
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
        if(formData?.address1){
            payload.address1 = formData?.address1;
        }
        if(formData?.address2){
            payload.address2 = formData?.address2;
        }
        if(formData?.address3){
            payload.address3 = formData?.address3;
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
        if(formData?.payment_type){
            payload.payment_type = formData?.payment_type;
        }
        if(formData?.remarks){
            payload.remarks = formData?.remarks;
        }
        if(formData?.location_code){
            payload.location_code = formData?.location_code;
        }
        if(formData?.type){
            payload.type = formData?.type;
        }
        if(formData?.sub_type){
            payload.sub_type = formData?.sub_type;
        }
        return payload;
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        if(validation()){
            const payload = getPayloadTransporter(formData);
            if(location?.state?.code){
                payload.request_type = App_url?.API?.UPDATE_TRANSPORTER;
                payload.customer_code = formData?.code;
                payload.updated_details = getPayloadTransporter(formData);
            }else{
                payload.request_type = App_url?.API?.ADD_TRANSPORTER;
            }
            const response = await PostRequestCallAPI(App_url?.API.TRANSPORTER, payload);
            if(response?.status === 200){
                toast.success(response?.data?.message);
                navigate(App_url?.Transporter)
            }else{
                if(response?.data?.error){
                    toast.success(response?.data?.error);
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
                    label={"Username"}
                    onChange={onChange}
                    value={formData?.user}
                    error={error?.user}
                    name={"user"}
                    required
                />
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
                    label={"Local Name"}
                    onChange={onChange}
                    value={formData?.local_name}
                    error={error?.local_name}
                    name={"local_name"}
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
                    label={"Password"}
                    onChange={onChange}
                    value={formData?.cust_password}
                    error={error?.cust_password}
                    name={"cust_password"}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Phone"}
                    onChange={onChange}
                    value={formData?.phone1}
                    name={"phone1"}
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
                    label={"Type"}
                    onChange={onChange}
                    value={formData?.type}
                    name={"type"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Sub Type"}
                    onChange={onChange}
                    value={formData?.sub_type}
                    name={"sub_type"}
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
                    formClassName={"col-12 "}
                    type='checkbox'
                    label={"Invoice"}
                    onChange={onChange}
                    checked={formData?.invoice}
                    name={"invoice"}
                />
              
                <h6 className='col-12'>Address Details</h6>
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Address 1"}
                    onChange={onChange}
                    value={formData?.address1}
                    name={"address1"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Address 2"}
                    onChange={onChange}
                    value={formData?.address2}
                    name={"address2"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Address 3"}
                    onChange={onChange}
                    value={formData?.address3}
                    name={"address3"}
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
                    <Button variant={"outline-danger"} size={"sm"}>Cancel</Button>
                </div>
            </form>
        </div>
    </div>
  )
}
TransporterForm.propTypes = {
    title: PropTypes.any,
    submitTitle: PropTypes.array
}
TransporterForm.defaultProps = {
    title:"Add New Transporter",
    submitTitle:"Add Transporter"
}