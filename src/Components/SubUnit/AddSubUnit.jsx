import React from 'react'
import DefaultLayout from '../Layout/Index'
import SubUnitForm from './SubUnitForm'

export default function AddSubUnit() {
  return (
    <DefaultLayout   >
        <SubUnitForm
            title={"Add Sub Unit"}
            submitTitle={"Add Sub Unit"}
        />
    </DefaultLayout>
  )
}
