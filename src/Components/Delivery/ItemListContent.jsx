import React from 'react'
import InputGroup from '../Common/InputGroup';
import Icon from '../Common/Icon';
import App_url from '../Common/constant';

export default function ItemListContent(props) {
    const { formData, error, onChangeItem } = props;
    const onChange = (e) =>{
        const oldData = formData;
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
                    label={"Item"}
                    placeholder={"Item"}
                    onChange={onChange}
                    value={formData?.item}
                    error={error[`item${props?.index}`]}
                    name={"item"}
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
                    label={"Qty Valume"}
                    placeholder={"Qty Valume"}
                    onChange={onChange}
                    value={formData?.quantity_volume}
                    error={error[`quantity_volume${props?.index}`]}
                    name={"quantity_volume"}
                    type='number'
                    required
                />
                <InputGroup
                    formClassName={"col-12 col-lg-3 col-sm-6 m-0"}
                    label={"Total"}
                    placeholder={"Total"}
                    onChange={onChange}
                    value={formData?.line_total}
                    error={error[`line_total${props?.index}`]}
                    name={"line_total"}
                    type='number'
                    required
                />
                <Icon onClick={props?.deleteVariation} button className={"sm "} classNameButton={"btn-danger position-right-center"} attr={App_url.Icon.Delete}/>
            </div>
        </div>
    </div>
  )
}
