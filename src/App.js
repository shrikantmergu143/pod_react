import React from 'react';
import './App.css';
import './index.css';
import { Route, Routes } from 'react-router';
import App_url from './Components/Common/constant';
import AddSubUnit from './Components/SubUnit/AddSubUnit';
const Index = React.lazy(()=>import('./Components/Layout/Index'));
const LoginPage = React.lazy(()=>import('./Components/Login/LoginPage'));
const CustomerPage = React.lazy(()=>import('./Components/Customer/CustomerPage'));
const AddCustomer = React.lazy(()=>import('./Components/Customer/AddCustomer'));
const EditCustomer = React.lazy(()=>import('./Components/Customer/EditCustomer'));
const TransporterPage = React.lazy(()=>import('./Components/Transporter/TransporterPage'));
const AddTransporter = React.lazy(()=>import('./Components/Transporter/AddTransporter'));
const EditTransporter = React.lazy(()=>import('./Components/Transporter/EditTransporter'));
const DeliveryEntryPage = React.lazy(()=>import('./Components/Delivery/DeliveryEntryPage'));
const AddDeliveryPage = React.lazy(()=>import('./Components/Delivery/AddDeliveryPage'));
const ShowDelivery = React.lazy(()=>import('./Components/Delivery/ShowDelivery'));
const CustomerView = React.lazy(()=>import('./Components/Customer/CustomerView'));

function App() {
  return (
    <React.Suspense fallback={<React.Fragment/>}>
      <Routes>
        <Route exact path={App_url.Dashboard}  element={<Index/>} />
        <Route exact path={App_url.Customer}  element={<CustomerPage/>} />
        <Route exact path={`${App_url.CustomerView}/:code`}  element={<CustomerView/>} />
        <Route exact path={App_url.AddCustomer}  element={<AddCustomer/>} />
        <Route exact path={`${App_url.AddSubUnit}/:code/add`}  element={<AddSubUnit/>} />
        <Route exact path={`${App_url.EditCustomer}/:code`}  element={<EditCustomer/>} />
        <Route exact path={App_url.Transporter}  element={<TransporterPage/>} />
        <Route exact path={App_url.AddTransporter}  element={<AddTransporter/>} />
        <Route exact path={App_url.DcEntry}  element={<DeliveryEntryPage/>} />
        <Route exact path={`${App_url.ShowDelivery}/:delivery_no`}  element={<ShowDelivery/>} />
        <Route exact path={App_url.AddDelivery}  element={<AddDeliveryPage/>} />
        <Route exact path={`${App_url.EditTransporter}/:code`}  element={<EditTransporter/>} />
        <Route exact path={App_url.Login}  element={<LoginPage/>} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
