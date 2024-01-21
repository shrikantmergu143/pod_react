import React from 'react'
import DefaultLayout from '../Layout/Index'
import SubUnitForm from './SubUnitForm'

export default function EditSubUnit() {
  return (
    <DefaultLayout   >
        <SubUnitForm
            title={"Edit Sub Unit"}
            submitTitle={"Edit Sub Unit"}
            editState
        />
    </DefaultLayout>
  )
}
