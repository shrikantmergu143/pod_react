/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Layout/Index'
import App_url from '../Common/constant';
import { PostRequestCallAPI } from '../api/PostRequest';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreCustomerDetails, setStoreCustomerList, setStoreLoader, setStoreTabState } from '../../redux/actions';
import CustomTable from '../Common/CustomTable';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Tab, TabContainer, TabContent, Tabs } from 'react-bootstrap';
import TabBar from './TabBar';
import CustomerDetails from './CustomerDetails';
import SubUnitPage from '../SubUnit/SubUnitPage';

export default function CustomerView() {
    const { tabState, customerDetails } = useSelector((state)=>state?.allReducers);
    const param = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [TabView, setTabView] = useState("details")
    // const [customerDetails, setCustomerDetails] = useState(null)
    useEffect(()=>{
        if(param.code){
            callGetCustomerDetails();
        }else{
            navigate(App_url.Customer);
        }
    },[]);

    const callGetCustomerDetails = async () =>{
        dispatch(setStoreLoader(true))
        const payload = {
            request_type:App_url.API.GET_CUSTOMER_DETAILS,
            customer_code:param.code
        }
        const response = await PostRequestCallAPI(App_url.API.CUSTOMER, payload, false);
        if(response?.status === 200){
            dispatch(setStoreCustomerDetails(response?.data?.data));
        }else{
            dispatch(setStoreCustomerDetails(null));
            console.log("response", response)
        }
        dispatch(setStoreLoader(false))
    }


  return (
    <DefaultLayout>
         <div className="page-header">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={App_url?.Home} >New Software</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Customer Details</li>
                </ol>
            </nav>
        </div>
        <Tabs content='ds' className='nav-pills' onSelect={(e)=>dispatch(setStoreTabState(e))} activeKey={tabState}>
            <TabBar title={"Customer Details"} eventKey={"details"}>
                <CustomerDetails data={customerDetails}/>
            </TabBar>
            <TabBar title={"Sub Unit"} eventKey={"sub_unit"}>
                <SubUnitPage/>
            </TabBar>
        </Tabs>
    </DefaultLayout>
  )
}
