/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Layout/Index'
import App_url from '../Common/constant';
import { PostRequestCallAPI } from '../api/PostRequest';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreCustomerList } from '../../redux/actions';
import CustomTable from '../Common/CustomTable';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function CustomerPage() {
    const { customerList } = useSelector((state)=>state?.allReducers);
    const navigate = useNavigate();
    const [Filter, setFilter] = useState({
        page:customerList?.current_page,
        records_per_page:customerList?.records_per_page,
        search:"",
    })
    const dispatch = useDispatch();
    useEffect(()=>{
        callGetCustomer(Filter)
    },[]);

    const callGetCustomer = async (Filter) =>{
        const payload = {
            request_type:App_url.API.GET_CUSTOMER,
            page:Filter?.page,
            records_per_page:Filter?.records_per_page,
            search:Filter?.search,
        }
        const response = await PostRequestCallAPI(App_url.API.CUSTOMER, payload, false);
        if(response?.status === 200){
            dispatch(setStoreCustomerList(response?.data));
        }else{
            dispatch(setStoreCustomerList());
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
        callGetCustomer(data1)
        setFilter((data)=>({
            ...data,
            ...data1
        }))
    }
    const onPagination = (e) =>{
        const data1 = Filter;
        data1.page = e;
        callGetCustomer(data1);
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
                        <Link to={App_url?.Home} >New Software</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Customer</li>
                </ol>
            </nav>
        </div>
        <CustomTable
            recordData={['ID', 'name', 'email', 'phone1',  'status', 'date_created']}
            columnNames={['ID', 'name', 'email', 'Phone',  'status', 'Date']}
            dataItems={customerList?.data}
            pagination={customerList}
            current_page={customerList?.current_page}
            editURL={(item)=>navigate(`${App_url?.EditCustomer}/${item?.code}`, {state:item})}
            onClickDelete={console.log}
            search={Filter?.search}
            onChange={onChange}
            Filter={Filter}
            title={"Customer List"}
            addTitle={"+ Add Customer"}
            addLink={App_url.AddCustomer}
            view
            onView={(e, item)=>navigate(`${App_url.CustomerView}/${item?.code}`)}
            onPagination={onPagination}
        />
    </DefaultLayout>
  )
}
