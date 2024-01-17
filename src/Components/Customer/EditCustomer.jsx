import React from 'react'
import DefaultLayout from '../Layout/Index'
import CustomerForm from './CustomerForm'

export default function EditCustomer() {
  return (
    <DefaultLayout>
        <CustomerForm title={"Update Customer"} submitTitle={"Save"}/>
    </DefaultLayout>
  )
}
