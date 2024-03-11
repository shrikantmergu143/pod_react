import React from 'react'
import InputGroup from '../Common/InputGroup';
import Icon from '../Common/Icon';
import App_url from '../Common/constant';

export default function ItemListContent(props) {
    const { formData, error, onChangeItem } = props;
    const onChange = (e) =>{
        const oldData = formData;
        if(e.target.name === "quantity"){
            let qty = parseFloat(e.target.value) || 0;
            oldData.total_amount = parseFloat(formData?.rate * qty).toFixed(2);
        }
        onChangeItem({
            ...oldData,
            [e.target.name]:e.target.value
        })
        props?.setError((data)=>({
            ...data,
            item_list:{
                ...data?.item_list,
                [`${e.target.name}${props?.index}`]:""
            }
        }))
    }
  return (
    <div className='card mb-2'>
        <div className='card-body'>
            <div className='row mr-0 pr-4 d-flex-center'>
                <InputGroup
                    formClassName={"col-12 col-lg-3 col-sm-6 m-0"}
                    label={"Product Name"}
                    placeholder={"Product Name"}
                    onChange={onChange}
                    value={formData?.product_name}
                    error={error[`product_name${props?.index}`]}
                    name={"product_name"}
                    required
                />
                 <InputGroup
                    formClassName={"col-12 col-lg-3 col-sm-6 m-0"}
                    label={"Rate Valume"}
                    placeholder={"Rate Valume"}
                    onChange={onChange}
                    value={formData?.rate}
                    error={error[`rate${props?.index}`]}
                    name={"rate"}
                    type='number'
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-3 col-sm-6 m-0"}
                    label={"Quantity"}
                    placeholder={"Quantity"}
                    onChange={onChange}
                    value={formData?.quantity}
                    error={error[`quantity${props?.index}`]}
                    name={"quantity"}
                    type='number'
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-3 col-sm-6 m-0"}
                    label={"Total"}
                    placeholder={"Total"}
                    onChange={onChange}
                    value={formData?.total_amount}
                    error={error[`total_amount${props?.index}`]}
                    name={"total_amount"}
                    type='number'
                    readOnly
                    required
                />{console.log("formData?.srno", formData?.srno)}
                <Icon disable={formData?.srno ? true:false} onClick={props?.deleteVariation} button className={"sm "} classNameButton={"btn-danger position-right-center"} attr={App_url.Icon.Delete}/>
            </div>
        </div>
    </div>
  )
}
