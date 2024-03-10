/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import DefaultLayout from '../Layout/Index'
import App_url from '../Common/constant';
import { PostRequestCallAPI } from '../api/PostRequest';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreDeliveryDetails, setStoreDeliveryList, setStoreLoader } from '../../redux/actions';
import CustomTable from '../Common/CustomTable';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Icon from '../Common/Icon';

export default function ShowDelivery() {
    const param = useParams();
    const {deliveryDetails} = useSelector((state)=>state?.allReducers)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(param?.delivery_no){
            getDeliveryDetails(param?.delivery_no);
        }
    },[])
    const getDeliveryDetails = async (id) =>{
        dispatch(setStoreLoader(true))
        const payload = {
            request_type:App_url.API.GET_DELIVERY_DETAILS,
            delivery_code:id
        }
        const response = await PostRequestCallAPI(App_url.API.DELIVERY, payload);
        if(response?.status === 200){
            dispatch(setStoreDeliveryDetails(response?.data?.data));
        }else{
            dispatch(setStoreDeliveryDetails());
        }
        dispatch(setStoreLoader(false))
    }
    const getTotalTables = () =>{
        let total_amount = 0;
        let qty = 0;
        let total_pack = 0;
        let qty_value = 0;
        deliveryDetails?.delivery_line?.map((item)=>{
            qty = qty + parseFloat(item?.quantity);
            qty_value = qty_value + parseFloat(item?.rate);
            total_amount = total_amount + (parseFloat(item?.quantity) * parseFloat(item?.rate));
            if(item?.item_type === "oil"){
                total_pack = total_pack + (item?.pack_size * item?.quantity)
            }
        });
        console.log("qty_value", qty_value)
        return {
            qty: qty,
            qty_value: qty_value,
            total_pack: total_pack,
            total_amount: total_amount
        }
    }
    const DateFormat = (dateString) =>{
        if(!dateString){
            return null;
        }
        const dateObject = new Date(dateString);

        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          }).format(dateObject);
          
          // Remove comma after year
          const formattedDateWithoutComma = formattedDate?.replace(/,/, '');
          
          console.log(formattedDateWithoutComma);
        return formattedDateWithoutComma;
    }
    const itemTotal = useMemo(getTotalTables, [deliveryDetails?.delivery_line]);
    const TableOrderItem = () =>{
        let type = "";
        if(deliveryDetails?.delivery_line?.length>0){
            type = deliveryDetails?.delivery_line[0]?.item_type
        }
        if(type === "Tyre"){
            return(
                <React.Fragment>
                    <tr align='center '>
                        <td  className=' border-x'>
                            <b className='td-column'>MATREIAL TYPE</b>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'>Masterial Discription</span>
                        </td>
                        <td  className=' border-x'>
                            <b className='td-column'>Qnty</b>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'>APPX VALUE</span>
                        </td>
                        <td rowSpan={deliveryDetails?.delivery_line?.length+2} colSpan={2} className='bt-0 bb-0 border-x'>
                            <span className='td-column'></span>
                        </td>
                    </tr>
                    {deliveryDetails?.delivery_line?.map((item, index)=>(
                        <React.Fragment key={index?.toString()}>
                            <tr align='center'>
                                <td  className=' border-x'>
                                    <span className='td-column'>
                                        <b>{item?.item_type}</b>
                                    </span>
                                </td>
                                <td  className=' border-x text-wrap'>
                                    <span className='td-column'>{item?.product_name}</span>
                                </td>
                                <td  className=' border-x'>
                                    <span className='td-column'>{item?.quantity}</span>
                                </td>
                                <td  className=' border-x'>
                                    <span className='td-column'>{item?.total_amount}</span>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                    <tr align='center'>
                        <td  className=' border-x'>
                            <b className='td-column'>Total no. of item</b>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'></span>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'>{itemTotal?.qty}</span>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'>{parseFloat(itemTotal?.total_amount).toFixed(2)}</span>
                        </td>
                    </tr>
                </React.Fragment>
            )
        }
        if(type === "Battery"){
            return(
                <React.Fragment>
                    <tr align='center'>
                        <td  className=' border-x'>
                            <b className='td-column'>Material Discription</b>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'>Discription</span>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'>Pack size</span>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'>Qnty</span>
                        </td>
                        <td rowSpan={deliveryDetails?.delivery_line?.length+2} colSpan={2} className='bt-0 bb-0 border-x'>
                            <span className='td-column'></span>
                        </td>
                    </tr>
                    {deliveryDetails?.delivery_line?.map((item, index)=>(
                        <React.Fragment key={index?.toString()}>
                            <tr align='center'>
                                <td  className=' border-x'>
                                    <span className='td-column'>
                                        <b>{item?.item_type}</b>
                                    </span>
                                </td>
                                <td  className=' border-x text-wrap'>
                                    <span className='td-column'>{item?.product_name}</span>
                                </td>
                                <td  className=' border-x'>
                                    <span className='td-column'>{item?.quantity}</span>
                                </td>
                                <td  className=' border-x'>
                                    <span className='td-column'>{item?.total_amount}</span>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                    <tr align='center'>
                        <td  className=' border-x'>
                            <b className='td-column'>Total no. of item</b>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'></span>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'>{itemTotal?.qty}</span>
                        </td>
                        <td  className=' border-x'>
                            <span className='td-column'>{parseFloat(itemTotal?.total_amount).toFixed(2)}</span>
                        </td>
                    </tr>
                </React.Fragment>
            )
        }
        return(
            <React.Fragment>
                <tr align='center'>
                    <td  className=' border-x'>
                        <b className='td-column'>Box/Bucket/Drum</b>
                    </td>
                    <td  className=' border-x'>
                        <span className='td-column'>Qnty</span>
                    </td>
                    <td  className=' border-x'>
                        <span className='td-column'>Masterial Discription</span>
                    </td>
                    <td  className=' border-x'>
                        <span className='td-column'>Pack size</span>
                    </td>
                    <td  className=' border-x'>
                        <span className='td-column'>Qnty</span>
                    </td>
                    <td  className=' border-x'>
                        <span className='td-column'>ltr</span>
                    </td>
                </tr>
                {deliveryDetails?.delivery_line?.map((item, index)=>(
                    <React.Fragment key={index?.toString()}>
                        <tr align='center'>
                            <td  className=' border-x'>
                                <span className='td-column'>
                                    <b>{item?.item_type}</b>
                                </span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{item?.quantity}</span>
                            </td>
                            <td  className=' border-x text-wrap'>
                                <span className='td-column'>{item?.product_name}</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{item?.pack_size}</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{item?.quantity}</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{item?.pack_size * item?.quantity}</span>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
                <tr align='center'>
                    <td  className=' border-x'>
                        <b className='td-column'>Total no. of item</b>
                    </td>
                    <td  className=' border-x'>
                        <span className='td-column'>{itemTotal?.qty}</span>
                    </td>
                    <td  className=' border-x'>
                        <span className='td-column'>APPX VALUE</span>
                    </td>
                    <td  className=' border-x'>
                        <span className='td-column'>{itemTotal?.qty_value}</span>
                    </td>
                    <td  className=' border-x'>
                        <span className='td-column'>Total</span>
                    </td>
                    <td  className=' border-x'>
                        <span className='td-column'>{itemTotal?.total_pack}</span>
                    </td>
                </tr>
            </React.Fragment>
        )
    }
    return (
        <DefaultLayout>
            <div className="page-header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"} >New Software</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                        <Link to={App_url.DcEntry} >Delivery Report</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{deliveryDetails?.delivery?.manual_dc}</li>
                    </ol>
                </nav>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h6 className='card-title mb-0'>DC no. {deliveryDetails?.delivery?.manual_dc}</h6>
                        <Icon size={"md"} onClick={()=>window.print()} title={"Print Report"} classNameButton={"ms-auto"} button attr={App_url.Icon.Print} />
                    </div>
                    <table className='table table-dc table-sm table-border text-wrap font-sm'>
                        <tbody>
                        <tr>
                            <td className=' border-x'>
                                <span className='td-column'>
                                    <b>Delivery Challan</b>
                                </span>
                            </td>
                            <td colSpan={3} className='border-x bb-0'></td>
                            <td colSpan={2} className=' border-x br-1'>
                                <span className='td-column'>
                                    <b>Copy-Transporter</b>
                                </span>
                            </td>
                            {/* <td  className='bt-1 br-1' ></td> */}
                        </tr>
                        <tr>
                            <td className=' border-x'>
                                <b className='td-column'>{deliveryDetails?.customer?.name}</b>
                            </td>
                            <td className=' border-x'>
                                <span className='td-column'>
                                    <b>GST NO-{deliveryDetails?.customer?.GST_no}</b>
                                </span>
                            </td>
                            <td colSpan={4} className='border-x  bt-0'></td>
                        </tr>
                        <tr>
                            <td colSpan={4} className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.customer?.address}</span>
                            </td>
                            <td colSpan={2} className=' border-x'>
                                <span className='td-column'>
                                    <b>Contact Person {deliveryDetails?.customer_contact?.contactname}, {deliveryDetails?.customer?.phone1} {deliveryDetails?.customer?.phone2?`${deliveryDetails?.customer?.phone2},`:""}</b>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5} className=' border-x' align='center'>
                                <span className='td-column '>
                                    <b className='text-underline'>DC No.- {deliveryDetails?.delivery?.manual_dc}</b>
                                </span>
                            </td>
                            <td colSpan={1} className='border-x bb-0 bt-0'></td>
                        </tr>
                        <tr>
                            <td className=' border-x' align='center'>
                                <span className='td-column'>
                                    <b>Company Name</b>
                                </span>
                            </td>{console.log("deliveryDetails?.customer_contact", deliveryDetails?.customer_contact)}
                            <td className=' border-x' align='center'>
                                <span className='td-column'>{deliveryDetails?.customer_contact?.company_name}</span>
                            </td>
                            <td className=' border-x' align='center'>
                                <b className='td-column b'>GST NO-{deliveryDetails?.customer?.GST_no}</b>
                            </td>
                            <td colSpan={4} className='border-x bb-0 bt-0'></td>
                        </tr>
                        <tr align='center'>
                            <td  className=' border-x' >
                                <span className='td-column bold'>City</span>
                            </td>
                            <td  className=' border-x' >
                                <span className='td-column'>{deliveryDetails?.customer_contact?.city}</span>
                            </td>
                            <td  className=' border-x' >
                                <span className='td-column bold'>State</span>
                            </td>
                            <td  className=' border-x' >
                                <span className='td-column'>{deliveryDetails?.customer_contact?.state}</span>
                            </td>
                            <td colSpan={2} className='br-1'></td>
                        </tr>
                        <tr className='' align='center'>
                            <td  className=' border-x'>
                                <span className='td-column bold'>P O No</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column bold'>
                                    {deliveryDetails?.customer_contact?.contactmobile ? deliveryDetails?.customer_contact?.contactmobile :"-"}
                                </span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column bold'>Transport Name</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.transporter?.name}</span>
                            </td>
                            <td colSpan={2} className='br-1'></td>
                        </tr>
                        <tr align='center'>
                            <td  className=' border-x'>
                                <span className='td-column bold'>Contact Person</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.customer_contact?.contactname}</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>Transport LR. No.</span>
                            </td>
                            <td  className=' border-x'>
                                <span hidden className='td-column'>{deliveryDetails?.transporter?.code}</span>
                            </td>
                            <td colSpan={2} className='br-1'></td>
                        </tr>
                        <tr className='' align='center'>
                            <td  className=' border-x'>
                                <span className='td-column bold'>Delivery Challan Date</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{DateFormat(deliveryDetails?.delivery?.date_added)}</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column bold'>Destination</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.customer_contact?.unit_address}</span>
                            </td>
                            <td colSpan={2} className='br-1'></td>
                        </tr>
                        <tr align='center'>
                            <td  className=' border-x'>
                                <span className='td-column bold'>Distaptch Date</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{DateFormat(deliveryDetails?.delivery?.date_added)}</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'></span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'></span>
                            </td>
                            <td colSpan={2} className='br-1'></td>
                        </tr>
                        <tr className='mh-4'>
                            <td colSpan={6} className='bl-1 br-1 bb-0'></td>
                        </tr>
                        <TableOrderItem/>
                        <tr>
                            <td className=' border-x'>
                                <span className='td-column'>E & O.E.</span>
                            </td>
                            <td className=' border-x'>
                                <span className='td-column'></span>
                            </td>
                            <td className=' border-x'>
                                <span className='td-column'></span>
                            </td>
                            <td colSpan={3} className='br-1'></td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=' border-x'>
                                <span className='td-column'>1. Received the all above mentioned goods in good order & condition</span>
                            </td>
                            <td colSpan={3} className='br-1'></td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=' border-x'>
                                <span className='td-column'>2. Our Responsibillity ceases when goods are delivered</span>
                            </td>
                            <td colSpan={3} className='br-1'></td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=' border-x'>
                                <span className='td-column'>3. Please return Duplicate copy duly signed</span>
                            </td>
                            <td colSpan={3} className='br-1'></td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=' border-x'>
                                <span className='td-column'>4. All disputes subject to Pune Jurisdiction</span>
                            </td>
                            <td colSpan={3} className='br-1'></td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=' border-x'>
                                <span className='td-column'></span>
                            </td>
                            <td colSpan={3} className='br-1'></td>
                        </tr>
                        <tr className='mh-2'>
                            <td colSpan={3} className='border-x bt-0 bl-1 bb-0 br-0'></td>
                            <td colSpan={3} className='br-1 bb-1'></td>
                        </tr>
                        <tr className='' align="center">
                            <td className=' border-x bt-1'>
                                <span className='td-column bold'>Received By</span>
                            </td>
                            <td colSpan={2} className='border-x bt-0'></td>
                            <td colSpan={3} className=' border-x'>
                                <span className='td-column bold'>For {deliveryDetails?.customer?.name}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className='col-12 col-sm-5 p-0'>
                        <table className='table table-dc table-sm table-border'>
                            <tbody>
                                <tr>
                                    <td colSpan={3} className=' border-x'>
                                        <span className='td-column'>{deliveryDetails?.customer?.name}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} className='border-x bb-0'>
                                        <span className='td-column'>INWARD NO</span>
                                    </td>
                                    <td className=' border-x col-2'>
                                        <span className='td-column'>DATE</span>
                                    </td>
                                    <td className=' border-x' col-3>
                                        <span className='td-column '></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={1} className='border-x col-2' >
                                        <span className='td-column'>TIME</span>
                                    </td>
                                    <td colSpan={1} className='border-x col-3' >
                                        <span className='td-column '></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className='border-x' >
                                        <span className='td-column'>SITE NAME: {deliveryDetails?.customer?.city}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={3} className='border-x' >
                                        <span className='td-column'>SITE CODE:</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={3} className='border-x' >
                                        <span className='td-column'>RECEIVERS NAME:</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={3} className='border-x' >
                                        <span className='td-column'>DEPARTMENT:</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={3} className='border-x' >
                                        <span className='td-column'>RECEIVERS MOB. NO</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={3} className='border-x' >
                                        <span className='td-column'>ITEM QTY: {itemTotal?.qty}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={3} className='border-x' >
                                        <span className='td-column'>RECEIVED QTY OK/NOT OK.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={3} className='border-x' >
                                        <span className='td-column'>REMARK:</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={3} className='border-x' >
                                        <span className='td-column'>RECEIVERS SIGN</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={3} className='border-x' >
                                        <span className='td-column'>DESIGNATION:</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}
