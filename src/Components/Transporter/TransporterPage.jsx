/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Layout/Index'
import App_url from '../Common/constant';
import { PostRequestCallAPI } from '../api/PostRequest';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreTransporterList } from '../../redux/actions';
import CustomTable from '../Common/CustomTable';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function TransporterPage() {
    const { transporterList } = useSelector((state)=>state?.allReducers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Filter, setFilter] = useState({
        page:transporterList?.current_page,
        records_per_page:transporterList?.records_per_page,
        search:"",
    })
    useEffect(()=>{
        callGetTransporter(Filter)
    },[]);

    const callGetTransporter = async (Filter) =>{
        const payload = {
            request_type:App_url.API.GET_TRANSPORTER,
            page:Filter?.page,
            records_per_page:Filter?.records_per_page,
            search:Filter?.search,
        }
        const response = await PostRequestCallAPI(App_url.API.TRANSPORTER, payload, false);
        if(response?.status === 200){
            dispatch(setStoreTransporterList(response?.data));
        }else{
            dispatch(setStoreTransporterList());
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
        callGetTransporter(data1)
        setFilter((data)=>({
            ...data,
            ...data1
        }))
    }
    const onPagination = (e) =>{
        const data1 = Filter;
        data1.page = e;
        callGetTransporter(data1);
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
                    <li className="breadcrumb-item active" aria-current="page">Transporter</li>
                </ol>
            </nav>
        </div>
        <CustomTable
            recordData={['ID', 'name', 'email', 'phone1',  'status', 'date_created']}
            columnNames={['ID', 'name', 'email', 'Phone',  'status', 'Date']}
            dataItems={transporterList?.data}
            current_page={transporterList?.current_page}
            pagination={transporterList}
            editURL={(item)=>navigate(`${App_url?.EditTransporter}/${item?.code}`, {state:item})}
            onClickDelete={console.log}
            search={Filter?.search}
            onChange={onChange}
            onPagination={onPagination}
            Filter={Filter}
            title={"Transporter List"}
            addTitle={"+ Add Transporter"}
            addLink={App_url.AddTransporter}
        />
    </DefaultLayout>
  )
}
