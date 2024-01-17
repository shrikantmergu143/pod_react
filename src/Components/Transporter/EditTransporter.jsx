import React from 'react'
import DefaultLayout from '../Layout/Index'
import TransporterForm from './TransporterForm'

export default function EditTransporter() {
  return (
    <DefaultLayout>
        <TransporterForm title={"Update Transporter"} submitTitle={"Save"}/>
    </DefaultLayout>
  )
}
