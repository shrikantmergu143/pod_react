/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import InputGroup from '../Common/InputGroup';
import Button from '../Common/Button';
import { PostRequestCallAPI } from '../api/PostRequest';
import App_url from '../Common/constant';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import { setStoreCustomerListOptions, setStoreTransporterOptions } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ItemList from './ItemList';

export default function DeliveryForm(props) {
    const { customerOption, transporterOption } = useSelector((state)=>state?.allReducers);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        dcno: "",
        cust_code: "",
        transport_no: "",
        cust_sub_unit_code: "",
        transport_type: "",
        manual_dc: "",
        transport_amt: "",
        remarks: "",
        payment_status: "",
        pono:"",
        item_list:[],
    });
    const [error, setError] = useState({
        dcno: "",
        cust_code: "",
        transport_no: "",
        cust_sub_unit_code: "",
        transport_type: "",
        manual_dc: "",
        transport_amt: "",
        remarks: "",
        pono:"",
        payment_status: "",
        item_list:{}
    });
    const [selectSubunit, setSelectSubunit] = useState([{label:"Select Sub Unit", value:"", isDisabled:true}])
    const location = useLocation();
    useEffect(()=>{
        callGetCustomer();
        callGetTransporter();
        callGetDeliveryMax();
    },[]);
    useEffect(()=>{
        if(location?.state?.code){
            setFormData((data)=>({
                ...data,
                ...location?.state,
                invoice:location?.state?.invoice === "Y"?true:false
            }))
        }
    },[location?.state?.code]);
    const callGetDeliveryMax = async (Filter) =>{
        const payload = {
            request_type:App_url.API.GET_MAX_DELIVERY_ENTRY,
        }
        const response = await PostRequestCallAPI(App_url.API.DELIVERY, payload, false);
        if(response?.status === 200){
            setFormData((data)=>({
                ...data,
                dcno: parseFloat(response?.data?.data?.dcno) + 1,
            }))
        }else{

        }
        console.log("response", response)
    }
    const callGetCustomer = async (Filter) =>{
        const payload = {
            request_type:App_url.API.GET_CUSTOMER,
            page:1,
            pagination:false,
        }
        const response = await PostRequestCallAPI(App_url.API.CUSTOMER, payload, false);
        if(response?.status === 200){
            const data = [{label:"Select Customer", value:"", disabled:true}];
            response?.data?.data?.map((item)=>{
                data?.push({...item, label:item?.name, value:item?.code})
            })
            dispatch(setStoreCustomerListOptions(data));
        }else{
            console.log("response", response)
            dispatch(setStoreCustomerListOptions());
        }
    }
    const callGetTransporter = async () =>{
        const payload = {
            request_type:App_url.API.GET_TRANSPORTER,
            page:1,
            pagination:false,
        }
        const response = await PostRequestCallAPI(App_url.API.TRANSPORTER, payload, false);
        if(response?.status === 200){
            const data = [{label:"Select Transporter", value:"", disabled:true}];
            response?.data?.data?.map((item)=>{
                data?.push({...item, label:item?.name, value:item?.code})
            })
            dispatch(setStoreTransporterOptions(data));
        }else{
            dispatch(setStoreTransporterOptions());
        }
    }
    const getSubUnitList = async (value) =>{
        const payload = {
            request_type:App_url.API.GET_SUB_UNIT,
            code:value,
            page:1,
            pagination:false
          }
          const response = await PostRequestCallAPI(App_url.API.SUB_UNIT, payload);
          console.log("response", response)
          if(response?.status === 200 && response?.data?.data?.data){
            const list = [{label:"Select Sub Unit", value:"", isDisabled:true}]
            response?.data?.data?.data?.map((item)=>{
                list?.push({
                    ...item,
                    label:item?.contactname,
                    value:item?.id
                })
            });
            setSelectSubunit(list);
          }else{
            setSelectSubunit([{label:"Select Sub Unit", value:"", isDisabled:true}])
          }
    }
    const onChange = (e) =>{
        if(e.target.type == "checkbox"){
            setFormData((data)=>({
                ...data,
                [e.target.name]:e.target.checked,
            }))
        }else{
            if(e.target.name == "cust_code"){
                getSubUnitList(e.target.value);
            }
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
    const variationError = (formData) =>{
        let val = true;
        const error = {};
        formData?.map((inputValue, index)=>{
            if(parseFloat(inputValue?.price) <= parseFloat(inputValue?.cost_price)){
                error[`price${index}`] = "The selling price should be greater than the cost price."
                val = false;
            }
            if(inputValue?.item === ""){
                error[`item${index}`] = "The item field is required."
                val = false;
            }
            if(inputValue?.quantity === ""){
                error[`quantity${index}`] = "The quantity field is required."
                val = false;
            }
            if(inputValue?.quantity_volume === ""){
                error[`quantity_volume${index}`] = "The qty volume field is required."
                val = false;
            }
            if(inputValue?.line_total === ""){
                error[`line_total${index}`] = "The total field is required."
                val = false;
            }
        });
        return {error:error, val:val};
    }
    const validation = () =>{
        let val = true;
        if(formData?.dcno == ""){
            error.dcno = "Please provide delivery no";
            val = false;
        }
        if(formData?.cust_code == ""){
            error.cust_code = "Please select customer";
            val = false;
        }
        if(formData?.cust_sub_unit_code == ""){
            error.cust_sub_unit_code = "Please select sub unit";
            val = false;
        }
        if(formData?.transport_no == ""){
            error.transport_no = "Please select transporter";
            val = false;
        }
        if(formData?.transport_type == ""){
            error.transport_type = "Please provide transport type";
            val = false;
        }
        if(formData?.manual_dc == ""){
            error.manual_dc = "Please provide manual dc";
            val = false;
        }
        if(formData?.remarks == ""){
            error.remarks = "Please provide remarks";
            val = false;
        }
        if(formData?.pono == ""){
            error.pono = "Please provide pono";
            val = false;
        }
        if(formData?.item_list?.length<=0 && val){
            error.item_list = {}
            alert("Please add atleast one item")
            val = false;
        }
        if(formData?.item_list?.length>0){
            const errors = variationError(formData?.item_list);
            error.item_list = errors?.error;
            val = errors?.val;
        }
        setError((data)=>({
            ...data,
            ...error
        }))
        return val;
    }
    const getPayloadCustomer = () =>{
        const payload = {
            entered_by:"Master"
        }
        if(formData?.dcno){
            payload.dcno = formData?.dcno;
        }
        if(formData?.cust_code){
            payload.cust_code = formData?.cust_code;
        }
        if(formData?.transport_no){
            payload.transport_no = formData?.transport_no;
        }
        if(formData?.cust_sub_unit_code){
            payload.cust_sub_unit_code = formData?.cust_sub_unit_code;
        }
        if(formData?.transport_type){
            payload.transport_type = formData?.transport_type;
        }
        if(formData?.manual_dc){
            payload.manual_dc = formData?.manual_dc;
        }
        if(formData?.transport_amt){
            payload.transport_amt = parseFloat(formData?.transport_amt);
        }
        if(formData?.remarks){
            payload.remarks = formData?.remarks;
        }
        if(formData?.pono){
            payload.pono = formData?.pono;
        }
        if(formData?.item_list){
            payload.item_list = formData?.item_list?.map((item)=>({
                ...item,
                item:item?.item,
                quantity:parseFloat(item?.quantity),
                quantity_volume:parseFloat(item?.quantity_volume),
                line_total:parseFloat(item?.line_total),
                line_tax:parseFloat(item?.line_tax),
                line_tax_rate:parseFloat(item?.line_tax_rate),
                rate:parseFloat(item?.rate),
            }));
        }
        
        return payload;
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        if(validation()){
            const payload = getPayloadCustomer(formData);
            if(location?.state?.code){
                payload.request_type = App_url?.API?.UPDATE_CUSTOMER;
                payload.updated_details = getPayloadCustomer(formData);
            }else{
                payload.request_type = App_url?.API?.ADD_DELIVERY;
            }
            console.log("payload", payload)
            const response = await PostRequestCallAPI(App_url?.API.DELIVERY,payload);
            if(response?.status === 200){
                toast.success(response?.data?.message);
                navigate(App_url?.DcEntry)
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
                    label={"Delivery No."}
                    placeholder={"Delivery No."}
                    onChange={onChange}
                    value={formData?.dcno}
                    error={error?.dcno}
                    name={"dcno"}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Manual Delivery No."}
                    placeholder={"Manual Delivery No."}
                    onChange={onChange}
                    value={formData?.manual_dc}
                    error={error?.manual_dc}
                    name={"manual_dc"}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Transporter"}
                    placeholder={"Transporter"}
                    onChange={onChange}
                    value={formData?.transport_no}
                    error={error?.transport_no}
                    name={"transport_no"}
                    type='select'
                    option={transporterOption}
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Customer"}
                    placeholder={"Customer"}
                    onChange={onChange}
                    value={formData?.cust_code}
                    error={error?.cust_code}
                    name={"cust_code"}
                    option={customerOption}
                    type='select'
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Select SubUnit"}
                    placeholder={"Select SubUnit"}
                    onChange={onChange}
                    value={formData?.cust_sub_unit_code}
                    error={error?.cust_sub_unit_code}
                    name={"cust_sub_unit_code"}
                    option={selectSubunit}
                    type='select'
                    required
                    Select
                />
                {/* <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Transport amount"}
                    placeholder={"Transport amount"}
                    onChange={onChange}
                    value={formData?.transport_amt}
                    error={error?.transport_amt}
                    name={"transport_amt"}
                    type='number'
                    required
                /> */}
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"Remarks"}
                    placeholder={"Remarks"}
                    onChange={onChange}
                    value={formData?.remarks}
                    error={error?.remarks}
                    name={"remarks"}
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-4 col-sm-6"}
                    label={"PO. no."}
                    placeholder={"PO. no."}
                    onChange={onChange}
                    value={formData?.pono}
                    error={error?.pono}
                    name={"pono"}
                    required
                />
                <div className='col-12'>
                    <ItemList formData={formData} setFormData={setFormData} error={error?.item_list} setError={setError} />
                </div>
                <div className='col-12 d-flex align-item-center justify-content-end gap-2 pt-3 pb-3'>
                    <Button type={"submit"} onClick={onSubmit} variant={"primary"} size={"sm"}>{props?.submitTitle}</Button>
                    <Button variant={"outline-danger"} size={"sm"}>Cancel</Button>
                </div>
            </form>
        </div>
    </div>
  )
}
DeliveryForm.propTypes = {
    title: PropTypes.any,
    submitTitle: PropTypes.array
}
DeliveryForm.defaultProps = {
    title:"Add Delivery Challan",
    submitTitle:"Add Delivery Challan"
}