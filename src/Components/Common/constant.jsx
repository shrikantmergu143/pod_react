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
function verifyEmail(emailAddress) {
    var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
    var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
    var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
    var sQuotedPair = '\\x5c[\\x00-\\x7f]';
    var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
    var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
    var sDomain_ref = sAtom;
    var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
    var sWord = '(' + sAtom + '|' + sQuotedString + ')';
    var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
    var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
    var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
    var sValidEmail = '^' + sAddrSpec + '$'; // as whole string
  
    var reValidEmail = new RegExp(sValidEmail);
    if(emailAddress === ""){
        return "Please provide email";
    }
    if(reValidEmail.test(emailAddress)){
        return false;
    }else{
        return "Please provide valid email";
    }
}
function validateMobile(mobilenumber) {   
    var regmm='^([0|+[0-9]{1,5})?([7-9][0-9]{9})$';
    var regmob = new RegExp(regmm);
    if(mobilenumber === ""){
        return "Please provide mobile number"
    }
    if(regmob.test(mobilenumber)){
        return false;
    } else {
        return "Please provide valid mobile number";
    }    
}
const App_url = {
    Icon:{
        Search: "/assets/Icon/Search.svg",
        Product: "/assets/Icon/Product.svg",
        Notification: "/assets/Icon/Notification.svg",
        Customer: "/assets/Icon/Customer.svg",
        Dashboard: "/assets/Icon/Dashboard.svg",
        Transporter: "/assets/Icon/Transporter.svg",
        DcEntry: "/assets/Icon/DcEntry.svg",
        Items: "/assets/Icon/Items.svg",
        Edit: "/assets/Icon/Edit.svg",
        Delete: "/assets/Icon/Delete.svg",
        SideMenu: "/assets/Icon/SideMenu.svg",
        Box: "/assets/Icon/Box.svg",

    },
    Dashboard: "/",
    Customer: "/customer",
    CustomerView: "/customer/view",
    AddCustomer: "/customer/add",
    AddDelivery: "/dc-entry/add",
    EditDelivery: "/dc-entry/edit",
    ShowDelivery: "/dc-entry/show",
    EditCustomer: "/customer/edit",
    Transporter: "/transporter",
    AddTransporter: "/transporter/add",
    EditTransporter: "/transporter/edit",
    MasterItem: "/master-item",
    AddMasterItem:"/master-item/add",
    EditMasterItem:"/master-item/edit",
    AddItem: "/item/add",
    EditItem: "/item/edit",
    DcEntry: "/dc-entry",
    Login: "/login",
    Home: "/",
    AddSubUnit: "/customer/view",
    EditSubUnit: "/customer/view",
    API_URL: "http://pod.arnichem.co.in/api",
    // API_URL: "http://arnichem.co.in/pod/api",
    // API_URL: "http://localhost/projects/api",
    API:{
        CUSTOMER: "CustomerOperation.php",
        TRANSPORTER: "TransporterOperation.php",
        DELIVERY: "DeliveryOperation.php",
        SUB_UNIT: "SubUnitOperation.php",
        MasterItem: "MasterItemOperation.php",
        GET_DELIVERY: "GET_DELIVERY",
        ADD_DELIVERY: "ADD_DELIVERY",
        ADD_CUSTOMER: "ADD_CUSTOMER",
        ADD_SUB_UNIT:"ADD_SUB_UNIT",
        GET_SUB_UNIT_ID:"GET_SUB_UNIT_ID",
        GET_CUSTOMER: "GET_CUSTOMER",
        GET_SUB_UNIT: "GET_SUB_UNIT",
        GET_CUSTOMER_DETAILS: "GET_CUSTOMER_DETAILS",
        UPDATE_CUSTOMER: "UPDATE_CUSTOMER",
        UPDATE_SUB_UNIT:"UPDATE_SUB_UNIT",
        ADD_TRANSPORTER: "ADD_TRANSPORTER",
        GET_TRANSPORTER: "GET_TRANSPORTER",
        GET_TRANSPORTER_DETAILS: "GET_TRANSPORTER_DETAILS",
        GET_DELIVERY_DETAILS: "GET_DELIVERY_DETAILS",
        UPDATE_TRANSPORTER: "UPDATE_TRANSPORTER",
        GET_MAX_DELIVERY_ENTRY: "GET_MAX_DELIVERY_ENTRY",
        ADD_MASTER_ITEM:"ADD_MASTER_ITEM",
        GET_MASTER_LIST:"GET_MASTER_LIST",
        UPDATE_MASTER_ITEM:"UPDATE_MASTER_ITEM",
        GET_MASTER_ID:"GET_MASTER_ID",
    },
    uuid:uuidV4,
    verifyEmail:verifyEmail,
    validateMobile:validateMobile,
}
export default  App_url