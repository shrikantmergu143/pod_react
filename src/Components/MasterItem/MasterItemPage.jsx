/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import CustomTable from '../Common/CustomTable';
import { useNavigate } from 'react-router';
import App_url from '../Common/constant';
import { PostRequestCallAPI } from '../api/PostRequest';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreMasterItemList } from '../../redux/actions';
const DefaultLayout = React.lazy(()=>import('../Layout/Index'));

export default function MasterItemPage() {
  const { masterItemList } = useSelector((state)=>state?.allReducers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Filter, setFilter] = useState({
    page:masterItemList?.current_page,
    records_per_page:masterItemList?.records_per_page,
    search:"",
  })
  useEffect(()=>{
    callGetMasterItem(Filter)
  },[]);

  const callGetMasterItem = async (Filter) =>{
      const payload = {
          request_type:App_url.API.GET_MASTER_LIST,
          page:Filter?.page,
          records_per_page:Filter?.records_per_page,
          search:Filter?.search,
      }
      const response = await PostRequestCallAPI(App_url.API.MasterItem, payload, false);
      console.log("response", response)
      if(response?.status === 200){
          dispatch(setStoreMasterItemList(response?.data));
      }else{
          dispatch(setStoreMasterItemList());
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
      callGetMasterItem(data1)
      setFilter((data)=>({
          ...data,
          ...data1
      }))
  }
  const onPagination = (e) =>{
      const data1 = Filter;
      data1.page = e;
      callGetMasterItem(data1);
      setFilter((data)=>({
          ...data,
          ...data1
      }))
  }
  return (
    <React.Suspense fallback={<React.Fragment/>}>
        <DefaultLayout>
        <CustomTable
          addTitle={"Add Master Item"}
          addLink={`${App_url.AddMasterItem}`}
          editURL={(item)=>navigate(`${App_url?.EditMasterItem}/${item?.item_code}`, {state:item})}
          recordData={['ID', 'item_code', 'product_name', 'rate', 'type', 'uom']}
          columnNames={['ID', 'Item Code', 'Product Name', 'Rate', 'Type', 'Sub Type']}
          dataItems={masterItemList?.data}
          pagination={masterItemList}
          current_page={masterItemList?.current_page}
          search={Filter.search}
          Filter={Filter}
          onPagination={onPagination}
          onChange={onChange}
        />
        </DefaultLayout>
    </React.Suspense>
  )
}
