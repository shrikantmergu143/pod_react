/* eslint-disable no-mixed-operators */
function uuidV4() {
    let uuid = '', i, random;
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
    }
    return uuid;
}
const App_url = {
    Icon:{
        Search:"/assets/Icon/Search.svg",
        Product:"/assets/Icon/Product.svg",
        Notification:"/assets/Icon/Notification.svg",
        Customer:"/assets/Icon/Customer.svg",
        Dashboard:"/assets/Icon/Dashboard.svg",
        Transporter:"/assets/Icon/Transporter.svg",
        DcEntry:"/assets/Icon/DcEntry.svg",
        Items:"/assets/Icon/Items.svg",
        Edit:"/assets/Icon/Edit.svg",
        Delete:"/assets/Icon/Delete.svg",
        SideMenu:"/assets/Icon/SideMenu.svg",
        Eye:"/assets/Icon/Eye.svg",

    },
    Dashboard:"/",
    Customer:"/customer",
    CustomerView:"/customer/view",
    AddCustomer:"/customer/add",
    AddDelivery:"/dc-entry/add",
    EditDelivery:"/dc-entry/edit",
    ShowDelivery:"/dc-entry/show",
    EditCustomer:"/customer/edit",
    Transporter:"/transporter",
    AddTransporter:"/transporter/add",
    EditTransporter:"/transporter/edit",
    Item:"/item",
    AddItem:"/item/add",
    EditItem:"/item/edit",
    DcEntry:"/dc-entry",
    Login: "/login",
    Home:"/",
    AddSubUnit:"/customer/view",
    // API_URL:"http://pod.arnichem.co.in/api",
    // API_URL:"http://arnichem.co.in/pod/api",
    API_URL:"http://localhost/projects/api",
    API:{
        CUSTOMER:"CustomerOperation.php",
        TRANSPORTER:"TransporterOperation.php",
        DELIVERY:"DeliveryOperation.php",
        GET_DELIVERY:"GET_DELIVERY",
        ADD_DELIVERY:"ADD_DELIVERY",
        ADD_CUSTOMER:"ADD_CUSTOMER",
        GET_CUSTOMER:"GET_CUSTOMER",
        GET_CUSTOMER_DETAILS:"GET_CUSTOMER_DETAILS",
        UPDATE_CUSTOMER:"UPDATE_CUSTOMER",
        ADD_TRANSPORTER:"ADD_TRANSPORTER",
        GET_TRANSPORTER:"GET_TRANSPORTER",
        GET_TRANSPORTER_DETAILS:"GET_TRANSPORTER_DETAILS",
        GET_DELIVERY_DETAILS:"GET_DELIVERY_DETAILS",
        UPDATE_TRANSPORTER:"UPDATE_TRANSPORTER",
        GET_MAX_DELIVERY_ENTRY:"GET_MAX_DELIVERY_ENTRY",
    },
    uuid:uuidV4
}
export default  App_url