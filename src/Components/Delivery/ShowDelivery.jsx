/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import DefaultLayout from '../Layout/Index'
import App_url from '../Common/constant';
import { PostRequestCallAPI } from '../api/PostRequest';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreDeliveryDetails, setStoreDeliveryList } from '../../redux/actions';
import CustomTable from '../Common/CustomTable';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

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
    }
    const getTotalTables = () =>{
        let total = 0;
        let qty = 0;
        let total_tax = 0;
        let qty_value = 0;
        deliveryDetails?.delivery_line?.map((item)=>{
            qty = qty + parseFloat(item?.quantity);
            qty_value = qty_value + parseFloat(item?.quantity_volume)
        });
        console.log("qty_value", qty_value)
        return {
            qty:qty,
            qty_value:qty_value,
        }
    }
    const itemTotal = useMemo(getTotalTables, [deliveryDetails?.delivery_line])
    return (
        <DefaultLayout>
            <div className="page-header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"} >New Software</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Delivery Report</li>
                    </ol>
                </nav>
            </div>
            <div className="card">
                <div className="card-body">
                    <h6 className='card-title'>DC no. {deliveryDetails?.delivery?.dcno}</h6>
                    <table className='table table-dc table-sm table-border'>
                        <tbody>
                        <tr>
                            <td className=' border-x'>
                                <span className='td-column'>Delivery Challan</span>
                            </td>
                            <td colSpan={3} className='border-x bb-0'></td>
                            <td className=' border-x'>
                                <span className='td-column'>Copy-Transporter</span>
                            </td>
                            <td colSpan={1} className='bt-1 br-1' ></td>
                        </tr>
                        <tr>
                            <td className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.customer?.name}</span>
                            </td>
                            <td className=' border-x'>
                                <span className='td-column'>GST NO-{deliveryDetails?.customer?.GST_no}</span>
                            </td>
                            <td colSpan={4} className='border-x  bt-0'></td>
                        </tr>
                        <tr>
                            <td colSpan={4} className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.customer?.address1}</span>
                            </td>
                            <td colSpan={2} className=' border-x'>
                                <span className='td-column'>Contact Person, {deliveryDetails?.customer?.phone1} {deliveryDetails?.customer?.phone2?`${deliveryDetails?.customer?.phone2},`:""} </span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5} className=' border-x' align='center'>
                                <span className='td-column'>DC No.- {deliveryDetails?.delivery?.dcno}</span>
                            </td>
                            <td colSpan={1} className='border-x bb-0 bt-0'></td>
                        </tr>
                        <tr>
                            <td className=' border-x' align='center'>
                                <span className='td-column'>Company Name</span>
                            </td>
                            <td className=' border-x' align='center'>
                                <span className='td-column'>{deliveryDetails?.customer?.name}</span>
                            </td>
                            <td className=' border-x' align='center'>
                                <span className='td-column'>GST NO-{deliveryDetails?.customer?.GST_no}</span>
                            </td>
                            <td colSpan={4} className='border-x bb-0 bt-0'></td>
                        </tr>
                        <tr align='center'>
                            <td  className=' border-x' >
                                <span className='td-column'>City</span>
                            </td>
                            <td  className=' border-x' >
                                <span className='td-column'>{deliveryDetails?.customer?.city}</span>
                            </td>
                            <td  className=' border-x' >
                                <span className='td-column'>State</span>
                            </td>
                            <td  className=' border-x' >
                                <span className='td-column'>{deliveryDetails?.customer?.state}</span>
                            </td>
                            <td colSpan={2} className='br-1'></td>
                        </tr>
                        <tr className='mh-4' align='center'>
                            <td  className=' border-x'>
                                <span className='td-column'></span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'></span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>Transport Name</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.transporter?.name}</span>
                            </td>
                            <td colSpan={2} className='br-1'></td>
                        </tr>
                        <tr align='center'>
                            <td  className=' border-x'>
                                <span className='td-column'>Contact Person</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.transporter?.phone1}</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>Transport LR. No.</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.transporter?.code}</span>
                            </td>
                            <td colSpan={2} className='br-1'></td>
                        </tr>
                        <tr className='mh-4' align='center'>
                            <td  className=' border-x'>
                                <span className='td-column'>Delivery Challan Date</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.delivery?.date_added}</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>Destination</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.delivery?.address1}</span>
                            </td>
                            <td colSpan={2} className='br-1'></td>
                        </tr>
                        <tr align='center'>
                            <td  className=' border-x'>
                                <span className='td-column'>Distaptch Date</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>{deliveryDetails?.delivery?.date_added}</span>
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
                            <td colSpan={6} className='bl-1 br-1 bb-1'></td>
                        </tr>
                        <tr align='center'>
                            <td  className=' border-x'>
                                <span className='td-column'>Box/Bucket/Drum</span>
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
                                <span className='td-column'>Tims</span>
                            </td>
                            <td  className=' border-x'>
                                <span className='td-column'>KG</span>
                            </td>
                        </tr>
                        {deliveryDetails?.delivery_line?.map((item, index)=>(
                            <React.Fragment key={index?.toString()}>
                                <tr align='center'>
                                    <td  className=' border-x'>
                                        <span className='td-column'>{item?.item}</span>
                                    </td>
                                    <td  className=' border-x'>
                                        <span className='td-column'>{item?.quantity}</span>
                                    </td>
                                    <td  className=' border-x'>
                                        <span className='td-column'>-</span>
                                    </td>
                                    <td  className=' border-x'>
                                        <span className='td-column'>{item?.quantity_volume}</span>
                                    </td>
                                    <td  className=' border-x'>
                                        <span className='td-column'>{item?.line_total}</span>
                                    </td>
                                    <td  className=' border-x'>
                                        <span className='td-column'>-</span>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                         <tr align='center'>
                            <td  className=' border-x'>
                                <span className='td-column'>Total no. of item</span>
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
                                <span className='td-column'>-</span>
                            </td>
                        </tr>
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
                                <span className='td-column'>2. Our Responsibility ceases when goods are delivered</span>
                            </td>
                            <td colSpan={3} className='br-1'></td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=' border-x'>
                                <span className='td-column'>3. Please return Duplicate copy duty & good</span>
                            </td>
                            <td colSpan={3} className='br-1'></td>
                        </tr>
                        <tr>
                            <td colSpan={3} className=' border-x'>
                                <span className='td-column'>4. All disputes subject to Pune junction</span>
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
                        <tr className=''>
                            <td className=' border-x bt-1'>
                                <span className='td-column'>Received By</span>
                            </td>
                            <td colSpan={2} className='border-x bt-0'></td>
                            <td colSpan={3} className=' border-x'>
                                <span className='td-column'>For {deliveryDetails?.customer?.name}</span>
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
