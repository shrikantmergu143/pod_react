/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import CustomTable from '../Common/CustomTable'
import App_url from '../Common/constant'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { PostRequestCallAPI } from '../api/PostRequest';
import { setStoreLoader, setStoreSubUnitList } from '../../redux/actions';

export default function SubUnitPage() {
  const navigate = useNavigate();
  const param = useParams();
  const [search, setSearch] = useState("")
  const dispatch = useDispatch();
  const subUnitList = useSelector((state)=>state?.allReducers?.subUnitList);
  useEffect(()=>{
    getSubUnitData();
  },[]);

  const getSubUnitData = async (search) =>{
    dispatch(setStoreLoader(true))
    const payload = {
      request_type:App_url.API.GET_SUB_UNIT,
      code:param?.code,
      page:1,
    }
    if(search){
      payload.search = search;
    }
    const response = await PostRequestCallAPI(App_url.API.SUB_UNIT, payload);
    if(response?.status == 200){
      dispatch(setStoreSubUnitList(response?.data?.data))
    }else{
      dispatch(setStoreSubUnitList(response?.data?.data))
    }
    console.log("search", search)
    dispatch(setStoreLoader(false))
  }
  const onChange = (e) =>{
    if(e.target.name === "search"){
      getSubUnitData(e.target.value);
      setSearch(e.target.value)
    }
  }

  return (
    <div>
      <CustomTable
        addTitle={"Add New Sub Unit"}
        bodyClassName={"p-0"}
        addLink={`${App_url.AddSubUnit}/${param?.code}/add`}
        editURL={(item)=>navigate(`${App_url?.EditSubUnit}/${item?.code}/${item?.id}`, {state:item})}
        recordData={['ID', 'user_name', 'contactname', 'contactmobile', 'contactdesignation', 'timestamp']}
        columnNames={['ID', 'UserName', 'Name', 'Mobile', 'designation', 'Date']}
        dataItems={subUnitList?.data}
        pagination={subUnitList}
        current_page={subUnitList?.current_page}
        search={search}
        onChange={onChange}
      />
    </div>
  )
}
