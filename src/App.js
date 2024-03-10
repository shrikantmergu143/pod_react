import React from 'react';
import './App.css';
import './index.css';
import { Navigate, Route, Routes } from 'react-router';
import App_url from './Components/Common/constant';
import EditDeliveryPage from './Components/Delivery/EditDeliveryPage';
const EditMasterItem = React.lazy(()=>import('./Components/MasterItem/EditMasterItem'));
const AddMasterItem = React.lazy(()=>import('./Components/MasterItem/AddMasterItem'));
const AddSubUnit = React.lazy(()=>import('./Components/SubUnit/AddSubUnit'));
const EditSubUnit = React.lazy(()=>import('./Components/SubUnit/EditSubUnit'));
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
const MasterItemPage = React.lazy(()=>import('./Components/MasterItem/MasterItemPage'));
const CustomerView = React.lazy(()=>import('./Components/Customer/CustomerView'));

function App() {
  return (
    <React.Suspense fallback={<React.Fragment/>}>
      <Routes>
        <Route index exact path={"/"}  element={<Navigate to={App_url.Dashboard}/>} />
        <Route exact path={App_url.Dashboard}  element={<Index/>} />
        <Route exact path={App_url.Customer}  element={<CustomerPage />} />
        <Route exact path={App_url?.MasterItem}  element={<MasterItemPage />} />
        <Route exact path={App_url?.AddMasterItem}  element={<AddMasterItem />} />
        <Route exact path={`${App_url.EditMasterItem}/:id`}  element={<EditMasterItem/>} />
        <Route exact path={`${App_url.CustomerView}/:code`}  element={<CustomerView/>} />
        <Route exact path={App_url.AddCustomer}  element={<AddCustomer/>} />
        <Route exact path={`${App_url.AddSubUnit}/:code/add`}  element={<AddSubUnit/>} />
        <Route exact path={`${App_url.EditSubUnit}/:code/:id`}  element={<EditSubUnit/>} />
        <Route exact path={`${App_url.EditCustomer}/:code`}  element={<EditCustomer/>} />
        <Route exact path={App_url.Transporter}  element={<TransporterPage/>} />
        <Route exact path={App_url.AddTransporter}  element={<AddTransporter/>} />
        <Route exact path={App_url.DcEntry}  element={<DeliveryEntryPage/>} />
        <Route exact path={`${App_url.EditDelivery}/:delivery_no`}  element={<EditDeliveryPage/>} />
        <Route exact path={`${App_url.ShowDelivery}/:delivery_no`}  element={<ShowDelivery/>} />
        <Route exact path={App_url.AddDelivery}  element={<AddDeliveryPage/>} />
        <Route exact path={`${App_url.EditTransporter}/:code`}  element={<EditTransporter/>} />
        <Route exact path={App_url.Login}  element={<LoginPage/>} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
