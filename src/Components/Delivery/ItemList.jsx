import React from 'react'
import ItemListContent from './ItemListContent';
import Button from '../Common/Button';

export default function ItemList(props) {
    const { formData, error, setFormData } = props;
    const onChangeItem= (item, index)=>{
        const variation = formData?.item_list?.map((item1, index1)=>{
          if(index1 === index){
              return item
          }
          return item1
        })
  
        setFormData((data)=>({
            ...data,
            item_list:variation
        }))
    }
    const deleteVariation= (item, index)=>{
        const variation = formData?.item_list?.filter((item1, index1)=>{
          if(index1 === index){
              return false
          }
          return item1
        })
  
        setFormData((data)=>({
            ...data,
            item_list:variation
        }))
    }
    const CallAddVariation =()=>{
        const variation = formData?.item_list?.length<=0?[]:formData?.item_list
        const payload = {
            line_no: 2,
            item: "",
            rate: 0,
            quantity: '',
            quantity_volume: '',
            line_total: '',
            line_tax_rate: 0,
            line_tax: 0
        }
        variation.push(payload);
        setFormData((data)=>({
          ...data,
          item_list:variation,
        }))
      }
  return (
    <React.Fragment>
        {formData?.item_list?.map((item, index)=>(
          <ItemListContent formData={item} key={index?.toString()} error={error} setError={props?.setError} deleteVariation={()=>deleteVariation(item, index)} index={index} onChangeItem={(item)=>onChangeItem(item, index)} />
        ))}
         <div className='pt-4'>
            <Button variant={"secondary"} onClick={CallAddVariation}> + Add Item</Button>
        </div>
    </React.Fragment>
  )
}
