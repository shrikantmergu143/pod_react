import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import App_url from './constant';
import InputGroup from './InputGroup';
import { Link } from 'react-router-dom';
import Button from './Button';
import PaginationPage from './PaginationPage';

const CustomTable = (props) => {
    const { recordData, onChange, Filter, current_page, columnNames, dataItems } = props
    const TableItem = ({recordKey, item, index}) =>{
        const startIdx = parseFloat(current_page - 1) * parseFloat(props?.pagination?.records_per_page);
        const listNumber = startIdx + index + 1
        if(recordKey === 'ID'){
            return (
                <Link href="#">{listNumber}</Link>
            )
        }
        if(recordKey === "status"){
            return (
                <span className={`badge ${ item[recordKey.toLowerCase()] === "Active"?'bg-primary':'bg-secondary-bright text-secondary'} `}>{item[recordKey.toLowerCase()]}</span>
            )
        }
        return(
            <React.Fragment>
                {recordKey === 'Name' && (
                    <Link href="product-detail.html" className="d-flex align-items-center">
                        <span>{item[recordKey.toLowerCase()]}</span>
                    </Link>
                )}
                {recordKey !== 'Name' && <span>{item[recordKey.toLowerCase()]}</span>}
            </React.Fragment>
        )
    }
    const options = [
        {label:"5", value:5},
        {label:"10", value:10},
        {label:"20", value:20},
        {label:"30", value:30},
    ];
  return (
    <React.Fragment>
        <div className={`card ${props?.className}`}>
            <div className={`card-body px-2 pb-2 ${props?.bodyClassName}`}>
                <div id='recent-orders_wrapper' className='dataTables_wrapper dt-bootstrap4 no-footer'>
                        <div className="row">

                            {props?.stateTitle && (
                                <div className="d-flex justify-content-between mb-3">
                                    <h6 className="card-title mb-1">{props?.title}</h6>
                                    <div>
                                        <Button to={props?.addLink} variant={"primary"} size={"sm"}>
                                            {props?.addTitle}
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {props?.stateFilter && (
                                <React.Fragment >
                                    <div className="col-sm-12 col-md-6">
                                        <div className="dataTables_length" id="recent-orders_length">
                                            <label>
                                                Show 
                                                <InputGroup onChange={onChange} name={"records_per_page"} option={options} value={Filter?.records_per_page} type='select' formClassName={"d-flex-inline mb-1 mx-2"}/>
                                                entries
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div id="recent-orders_Filter" className="dataTables_Filter text-right">
                                            <label>Search: <InputGroup name={"search"} onChange={onChange} value={props?.search} formClassName={"d-flex-inline mb-1"} /> </label>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                            <div className='table-responsive'>
                                <table id="recent-orders" className="table table-sm table-striped ">
                                    <thead>
                                        <tr>
                                        {columnNames.map((columnName, index) => (
                                            <th key={index}>{columnName}</th>
                                        ))}
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataItems?.length>0?(
                                            <React.Fragment>
                                                {dataItems?.map((item, index) => (
                                                    <tr key={index}>
                                                        {recordData.map((recordKey, idx) => (
                                                            <td key={idx}>
                                                                <TableItem recordKey={recordKey} index={index} item={item} />
                                                            </td>
                                                        ))}
                                                        <td>
                                                        {props?.view && (
                                                            <Icon attr={App_url.Icon.Eye} title="Default tooltip" data-toggle="tooltip" onClick={(e)=>props?.onView(e, item)}  button hover className={"xsm "} classNameButton={"rounded"}/>
                                                        )}
                                                        {props?.editURL && (
                                                            <Icon attr={App_url.Icon.Edit} onClick={(e)=>props?.editURL(item)}  button hover className={"xsm "} classNameButton={"rounded"}/>
                                                        )}
                                                        {props?.delete && (
                                                            <Icon attr={App_url.Icon.Delete} onClick={(e)=>props?.onClickDelete(e, item)}  button hover className={"xsm "} classNameButton={"rounded"}/>
                                                        )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ):(
                                            <tr >
                                                <td colSpan={recordData?.length+1} align='center'>No Data Found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {props?.pagination &&
                                <PaginationPage pagination={props?.pagination} onChange={props?.onPagination} />
                            }
                        </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  );
};

CustomTable.propTypes = {
    recordData: PropTypes.array.isRequired,
    current_page: PropTypes.number.isRequired,
    columnNames: PropTypes.array.isRequired,
    dataItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func,
    onClickEdit: PropTypes.func,
    editURL: PropTypes.any,
    onClickDelete: PropTypes.func,
    Filter: PropTypes.any,
    stateFilter: PropTypes.bool,
    addTitle: PropTypes.any,
    addLink: PropTypes.any,
    stateTitle: PropTypes.bool,
    delete: PropTypes.bool,
    search: PropTypes?.any,
    className: PropTypes?.any,
    bodyClassName: PropTypes?.any,
    onPagination: PropTypes?.func,
    view: PropTypes?.bool,
    onView: PropTypes?.func,
};

CustomTable.defaultProps = {
    recordData: [],
    current_page: 1,
    columnNames: [],
    dataItems: [],
    onChange: ()=>{},
    onClickEdit: ()=>{},
    editURL: ()=>{},
    onClickDelete: ()=>{},
    Filter: {},
    stateFilter: true,
    addTitle: "",
    addLink: "",
    stateTitle: true,
    search: "",
    className: "",
    bodyClassName: "",
    delete: true,
    onPagination: ()=>{},
    view: false,
    onView: ()=>{},
};

export default CustomTable;
