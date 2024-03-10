/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import InputGroup from '../Common/InputGroup';
import Button from '../Common/Button';
import { PostRequestCallAPI } from '../api/PostRequest';
import App_url from '../Common/constant';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';

export default function SubUnitForm(props) {
    const { customerDetails } = useSelector((state)=>state?.allReducers);
    const param = useParams();
    const navigate = useNavigate();
    const customer_type = [
        {title:"Select Type", label:"Select Type", value:""},
        {title:"Master", label:"Master", value:"Master"},
        {title:"Branch", label:"Branch", value:"Branch"},
    ];
    const Designation = [
        {title:"Select Designation", label:"Select Designation", value:""},
        {title:"Owner", label:"Owner", value:"OWNER"},
        {title:"Director", label:"Director", value:"DIRECTOR"},
        {title:"Proprietor", label:"Proprietor", value:"PROPRIETOR"},
        {title:"Manager", label:"Manager", value:"MANAGER"},
        {title:"Purchase Officer", label:"Purchase Officer", value:"PURCHASE  OFFICER"},
        {title:"Store Manager", label:"Store Manager", value:"STORE MANAGER"},
        {title:"Accounts", label:"Accounts", value:"ACCOUNTS"},
        {title:"Other 1", label:"Other 1", value:"OTHER 1"},
        {title:"Other 2", label:"Other 2", value:"OTHER 2"},
        {title:"Sales", label:"Sales", value:"SALES"},
        {title:"Holding", label:"Holding", value:"HOLDING"},
    ]
    const [formData, setFormData] = useState({
        srno:1,
        name:"",
        contactemail:"",
        contactname:"",
        contactdesignation:"",
        type: "",
        unit_location: "",
        unit_address: "",
        user_name: "",
        password: "",
        tally_name: "",
        contactmobile: "",
        remarks: "",
        company_name: "",
        state: "",
        city: "",
        pincode: "",
    });
    const [error, setError] = useState({
        srno:"",
        name:"",
        contactemail:"",
        contactname:"",
        contactdesignation:"",
        type: "",
        unit_location: "",
        unit_address: "",
        user_name: "",
        password: "",
        tally_name: "",
        contactmobile: "",
        remarks: "",
        company_name: "",
        state: "",
        city: "",
        pincode: "",
    });
    const location = useLocation();
    console.log("location", location)
    useEffect(()=>{
        if(location?.state?.id){
            setFormData((data)=>({
                ...data,
                ...location?.state,
            }))
        }else{
            getUniqueUnit()
        }
    },[location?.state?.code]);

    const getUniqueUnit = async () =>{
        const payload = {
            request_type:App_url.API.GET_SUB_UNIT_ID,
            code:param.code
        }
        const response = await PostRequestCallAPI(App_url.API.SUB_UNIT, payload);
        if(response?.status === 200 && response?.data?.data){
            setFormData((data)=>({
                ...data,
                srno:parseFloat(response?.data?.data?.srno)+ 1
            }))
        }
    }
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
        if(formData?.user_name == ""){
            error.user_name = "Please provide username";
            val = false;
        }
        const email = App_url.verifyEmail(formData?.contactemail);
        if(email){
            error.contactemail = email;
            val = false;
        }
        if(formData?.contactname == ""){
            error.contactname = "Please provide name";
            val = false;
        }
        if(formData?.company_name == ""){
            error.company_name = "Please provide company name";
            val = false;
        }
        const mobile = App_url.validateMobile(formData?.contactmobile); 
        if(mobile){
            error.contactmobile = mobile;
            val = false;
        }
        if(formData?.password == "" && !props?.editState){
            error.password = "Please provide password";
            val = false;
        }
        if(formData?.srno == ""){
            error.srno = "Please provide srno";
            val = false;
        }
        if(formData?.contactdesignation == ""){
            error.contactdesignation = "Please select designation";
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
            pincode:"",
            state:"",
            city:"",
        }
        if(formData?.contactmobile){
            payload.contactmobile = formData?.contactmobile;
        }
        if(formData?.company_name){
            payload.company_name = formData?.company_name;
        }
        if(formData?.pincode){
            payload.pincode = formData?.pincode;
        }
        if(formData?.city){
            payload.city = formData?.city;
        }
        if(formData?.state){
            payload.state = formData?.state;
        }
        if(formData?.contactemail){
            payload.contactemail = formData?.contactemail;
        }
        if(formData?.user_name){
            payload.user_name = formData?.user_name;
        }
        if(formData?.contactname){
            payload.contactname = formData?.contactname;
        }
        if(formData?.type){
            payload.type = formData?.type;
        }
        if(formData?.srno){
            payload.srno = formData?.srno;
        }
        if(formData?.contactdesignation){
            payload.contactdesignation = formData?.contactdesignation;
        }
        if(formData?.contactmobile){
            payload.contactmobile = formData?.contactmobile;
        }
        if(formData?.unit_location){
            payload.unit_location = formData?.unit_location;
        }
        if(formData?.unit_address){
            payload.unit_address = formData?.unit_address;
        }
        if(formData?.password){
            payload.password = formData?.password;
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
            if(location?.state?.id){
                payload.request_type = App_url?.API?.UPDATE_SUB_UNIT;
                payload.id = location?.state?.id;
                payload.updated_details = getPayloadCustomer(formData);
            }else{
                payload.request_type = App_url?.API?.ADD_SUB_UNIT;
                payload.entered_by = customerDetails?.name;
            }
            payload.code = param.code;
            const response = await PostRequestCallAPI(App_url?.API.SUB_UNIT,payload);
            if(response?.status === 200){
                toast.success(response?.data?.message);
                navigate(`${App_url.CustomerView}/${param.code}`)
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
                    label={"Sr. No."}
                    onChange={onChange}
                    value={formData?.srno}
                    name={"srno"}
                    error={error?.srno}
                    type='number'
                    disabled
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Company Name"}
                    onChange={onChange}
                    value={formData?.company_name}
                    name={"company_name"}
                    error={error?.company_name}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Name"}
                    onChange={onChange}
                    value={formData?.contactname}
                    name={"contactname"}
                    error={error?.contactname}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Username"}
                    onChange={onChange}
                    value={formData?.user_name}
                    error={error?.user_name}
                    name={"user_name"}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Password"}
                    onChange={onChange}
                    value={formData?.password}
                    error={error?.password}
                    name={"password"}
                    required={props?.editState?false:true}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Email"}
                    onChange={onChange}
                    value={formData?.contactemail}
                    error={error?.contactemail}
                    name={"contactemail"}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Mobile"}
                    onChange={onChange}
                    value={formData?.contactmobile}
                    error={error?.contactmobile}
                    name={"contactmobile"}
                    type='number'
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Designation"}
                    onChange={onChange}
                    value={formData?.contactdesignation}
                    error={error?.contactdesignation}
                    name={"contactdesignation"}
                    type='select'
                    option={Designation}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Type"}
                    onChange={onChange}
                    value={formData?.type}
                    error={error?.type}
                    name={"type"}
                    type='select'
                    option={customer_type}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Remarks"}
                    onChange={onChange}
                    value={formData?.remarks}
                    name={"remarks"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Unit Location"}
                    onChange={onChange}
                    value={formData?.unit_location}
                    error={error?.unit_location}
                    name={"unit_location"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Unit Address"}
                    onChange={onChange}
                    value={formData?.unit_address}
                    error={error?.unit_address}
                    name={"unit_address"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"State"}
                    onChange={onChange}
                    value={formData?.state}
                    error={error?.state}
                    name={"state"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"City"}
                    onChange={onChange}
                    value={formData?.city}
                    error={error?.city}
                    name={"city"}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Pincode"}
                    onChange={onChange}
                    value={formData?.pincode}
                    error={error?.pincode}
                    name={"pincode"}
                />
                <div className='col-12 d-flex align-item-center justify-content-end gap-2 pt-3 pb-3'>
                    <Button type={"submit"} onClick={onSubmit} variant={"primary"} size={"sm"}>{props?.submitTitle}</Button>
                    <Button to={`${App_url.CustomerView}/${param.code}`} variant={"outline-danger"} size={"sm"}>Cancel</Button>
                </div>
            </form>
        </div>
    </div>
  )
}
SubUnitForm.propTypes = {
    title: PropTypes.any,
    submitTitle: PropTypes.any,
    editState: PropTypes.bool
}
SubUnitForm.defaultProps = {
    title:"Add New Customer",
    submitTitle:"Add Customer",
    editState: false
}