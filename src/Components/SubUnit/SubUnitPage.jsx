import React from 'react'
import CustomTable from '../Common/CustomTable'
import App_url from '../Common/constant'
import { useParams } from 'react-router'

export default function SubUnitPage() {
    const param = useParams();
  return (
    <div>
      <CustomTable
        addTitle={"Add New Sub Unit"}
        bodyClassName={"p-0"}
        addLink={`${App_url.AddSubUnit}/${param?.code}/add`}
      />
    </div>
  )
}
