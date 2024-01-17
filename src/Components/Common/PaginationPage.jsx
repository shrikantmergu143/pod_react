/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function PaginationPage(props) {
  let active = props?.pagination?.current_page;
  const length = Math.ceil(parseFloat(props?.pagination?.total_records)  / parseFloat(props?.pagination?.records_per_page));
  let items = [];

  const Pagination = (item) =>{
    return(
        <li className="page-item">
            <Link onClick={item?.onClick} className="page-link">
                <span aria-hidden="true">{item?.data}</span>
            </Link>
        </li>
    )
  }
  const PaginationItem = (item) =>{
    return(
        <li className={`page-item ${item?.number == active?"active":""}`}>
            <Link onClick={item?.onClick} className="page-link">
                {item?.children}
            </Link>
        </li>
    )
  }
  for (let number = 1; number <= length ; number++) {
    items.push(
      <PaginationItem number={number} onClick={function(e){
        e.preventDefault();
        e.stopPropagation()
        if(number === active){
          return null;
        }else{
          props?.onChange(number)
        }
      }} key={number} active={number === active}>
        {number}
      </PaginationItem>,
    );
  }

  return(
    <div className="CommonPagination">
        <div className="pagination" >
            <Pagination
                onClick={function(){
                    if(active === 1){
                        return null;
                    }else{
                        props?.onChange(active - 1)
                    }
                }}
                data={"‹"}
            />
                {items}
            <Pagination
                onClick={function(){
                    if(active === length){
                        return null;
                    }else{
                        props?.onChange(active + 1)
                    }
                }}
                data={"›"}
            />
        </div>
    </div>
  );
}
PaginationPage.propTypes = {
    onChange: PropTypes.func,
    pagination: PropTypes.any,
}
PaginationPage.defaultProps = {
    onChange:()=>{},
    pagination:{
        current_page:"",
        total_records:0,
        records_per_page:0
    }
}
export default PaginationPage;