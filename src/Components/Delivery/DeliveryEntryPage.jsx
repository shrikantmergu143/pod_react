/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Layout/Index'
import App_url from '../Common/constant';
import { PostRequestCallAPI } from '../api/PostRequest';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreDeliveryList } from '../../redux/actions';
import CustomTable from '../Common/CustomTable';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function DeliveryEntryPage() {
    const { deliveryList } = useSelector((state)=>state?.allReducers);
    const navigate = useNavigate();
    const [Filter, setFilter] = useState({
        page:deliveryList?.current_page,
        records_per_page:deliveryList?.records_per_page,
        search:"",
    })
    const dispatch = useDispatch();
    useEffect(()=>{
        callGetDelivery(Filter)
    },[]);

    const callGetDelivery = async (Filter) =>{
        const payload = {
            request_type:App_url.API.GET_DELIVERY,
            page:Filter?.page,
            records_per_page:Filter?.records_per_page,
            search:Filter?.search,
        }
        const response = await PostRequestCallAPI(App_url.API.DELIVERY, payload, false);
        if(response?.status === 200){
            const deliveryData = [];
            response?.data?.data?.map((item)=>{
                deliveryData?.push({...item,...item?.delivery})
            })
            dispatch(setStoreDeliveryList({...response?.data, data:deliveryData}));
        }else{
            dispatch(setStoreDeliveryList());
        }
    }

    const onChange = (e) =>{
        const data1 = Filter;
        if(e.target.name === "records_per_page"){
            data1["records_per_page"] = e.target.value
        }
        if(e.target.name === "search"){
            data1["search"] = e.target.value
        }
        data1.page = 1
        callGetDelivery(data1)
        setFilter((data)=>({
            ...data,
            ...data1
        }))
    }
    const onPagination = (e) =>{
        const data1 = Filter;
            data1.page = e

        callGetDelivery(data1)
        setFilter((data)=>({
            ...data,
            ...data1
        }))
    }
  return (
    <DefaultLayout>
         <div className="page-header">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link >New Software</Link>
                    </li>
                    <li className="breadcrumb-item active" >Delivery Challan</li>
                </ol>
            </nav>
        </div>
        {console.log("deliveryList", deliveryList)}
        <CustomTable
            recordData={['ID', 'dcno', 'customer.name', 'transporter.name', 'transport_amt', 'timestamp']}
            columnNames={['ID', 'Delivery No', 'customer', 'transporter', 'transport amount',  'Date']}
            collabeData={[
                ['Manual Dc', 'manual_dc'],
                ['Po.no', 'pono'],
                ['Contact person', 'customer_contact.contactname'],
                ['Contact Address', 'customer_contact.unit_address'],
                ['Transporter Contact', 'transporter.phone1'],
                ['Transporter Address', 'transporter.address'],
            ]}
            dataItems={deliveryList?.data}
            pagination={deliveryList}
            current_page={deliveryList?.current_page}
            onClickDelete={console.log}
            search={Filter?.search}
            onChange={onChange}
            onPagination={onPagination}
            Filter={Filter}
            title={"Delivery List"}
            addTitle={"+ Add Delivery"}
            addLink={App_url.AddDelivery}
            view
            onView={(e, item)=>navigate(`${App_url.ShowDelivery}/${item?.no}`)}
            editURL={(item)=>navigate(`${App_url?.EditDelivery}/${item?.no}`, {state:item})}
            delete={false}
        />
    </DefaultLayout>
  )
}
