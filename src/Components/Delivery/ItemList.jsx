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
    console.log("formData?.item_list", formData?.item_list)
  return (
    <React.Fragment>
        {formData?.item_list?.map((item, index)=>(
          <ItemListContent formData={item} key={index?.toString()} dc_no={props?.dc_no} error={error} setError={props?.setError} deleteVariation={()=>deleteVariation(item, index)} index={index} onChangeItem={(item)=>onChangeItem(item, index)} />
        ))}
         {/* <div className='pt-4'>
            <Button variant={"secondary"} onClick={CallAddVariation}> + Add Item</Button>
        </div> */}
    </React.Fragment>
  )
}
