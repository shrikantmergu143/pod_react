import React from 'react'
import DefaultLayout from '../Layout/Index'
import MasterItemForm from './MasterItemForm'

export default function EditMasterItem() {
  return (
    <DefaultLayout>
      <MasterItemForm
        title={"Edit Master Item"}
        submitTitle={"Update"}
      />
    </DefaultLayout>
  )
}
