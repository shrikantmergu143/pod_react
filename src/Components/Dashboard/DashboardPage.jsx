/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStoreTransporterList } from '../../redux/actions';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
    const { transporterList } = useSelector((state)=>state?.allReducers);
    const dispatch = useDispatch();
    useEffect(()=>{
        loadState();
    },[]);
    const loadState = () =>{
        if(transporterList === undefined){
            dispatch(setStoreTransporterList());
        }
    }
  return (
    <React.Fragment>
        <div className="page-header">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link >New Software</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
            </nav>
        </div>

        <div className="row">
            <div className="col-md-12">

                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <p className="text-muted">Total Sales</p>
                                        <h2 className="font-weight-bold">$58,000</h2>
                                    </div>
                                    <div>
                                        <figure className="avatar">
                                            <span className="avatar-title bg-success-bright text-success rounded-circle">
                                                <i className="ti-bar-chart"></i>
                                            </span>
                                        </figure>
                                    </div>
                                </div>
                                <div className="d-inline-flex align-items-center">
                                    <span className="text-success d-inline-flex align-items-center mr-2">
                                        <span className="ti-arrow-up mr-2"></span> 5.1%
                                    </span> Up from past week
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <p className="text-muted">Total Orders</p>
                                        <h2 className="font-weight-bold">9,621</h2>
                                    </div>
                                    <div>
                                        <figure className="avatar">
                                            <span className="avatar-title bg-info-bright text-info rounded-circle">
                                                <i className="ti-package"></i>
                                            </span>
                                        </figure>
                                    </div>
                                </div>
                                <div className="d-inline-flex align-items-center">
                                    <span className="text-danger d-inline-flex align-items-center mr-2">
                                        <span className="ti-arrow-down mr-2"></span> 2.6%
                                    </span> Down from yesterday
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <p className="text-muted">Total Pending</p>
                                        <h2 className="font-weight-bold">2,217</h2>
                                    </div>
                                    <div>
                                        <figure className="avatar">
                                            <span className="avatar-title bg-warning-bright text-warning rounded-circle">
                                                <i className="ti-reload"></i>
                                            </span>
                                        </figure>
                                    </div>
                                </div>
                                <div className="d-inline-flex align-items-center">
                                    <span className="text-success d-inline-flex align-items-center mr-2">
                                        <span className="ti-arrow-up mr-2"></span> 1.9%
                                    </span> Up from yesterday
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h6 className="card-title">Recent Orders</h6>
                    <div>
                        <Link href="#" className="btn btn-outline-light btn-sm mr-2">
                            <i className="fa fa-refresh"></i>
                        </Link>
                        <div className="dropdown">
                            <Link href="#" data-toggle="dropdown"
                            className="btn btn-outline-light btn-sm"
                            aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link className="dropdown-item" href="#">Action</Link>
                                <Link className="dropdown-item" href="#">Another action</Link>
                                <Link className="dropdown-item" href="#">Something else here</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table id="recent-orders" className="table table-lg">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Customer</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <Link href="#">3145</Link>
                                    </td>
                                    <td>
                                        <Link href="product-detail.html" className="d-flex align-items-center">
                                            <img width="40" src="../../assets/media/image/products/product1.png"
                                                className="rounded mr-3" alt="grape"/>
                                            <span>HP Pavilion 15-EC0005NT AMD</span>
                                        </Link>
                                    </td>
                                    <td>Dollie Bullock</td>
                                    <td>$230</td>
                                    <td>
                                        <span
                                            className="badge bg-secondary-bright text-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>2018/08/28 21:24:36</td>
                                    <td>
                                        <Link href="#" className="text-secondary" data-toggle="tooltip" title="Edit">
                                            <i className="ti-pencil"></i>
                                        </Link>
                                        <Link href="#" className="text-danger ml-2" data-toggle="tooltip" title="Delete">
                                            <i className="ti-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link href="#">7321</Link>
                                    </td>
                                    <td>
                                        <Link href="product-detail.html" className="d-flex align-items-center">
                                            <img width="40" src="../../assets/media/image/products/product2.png"
                                                className="rounded mr-3" alt="banana"/>
                                            <span>Samsung Galaxy A51 128 GB</span>
                                        </Link>
                                    </td>
                                    <td>Holmes Hines</td>
                                    <td>$300</td>
                                    <td>
                                        <span className="badge bg-success-bright text-success">Payment accepted</span>
                                    </td>
                                    <td>2018/08/28 21:24:36</td>
                                    <td>
                                        <Link href="#" className="text-secondary" data-toggle="tooltip" title="Edit">
                                            <i className="ti-pencil"></i>
                                        </Link>
                                        <Link href="#" className="text-danger ml-2" data-toggle="tooltip" title="Delete">
                                            <i className="ti-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link href="#">9342</Link>
                                    </td>
                                    <td>
                                        <Link href="product-detail.html" className="d-flex align-items-center">
                                            <img width="40" src="../../assets/media/image/products/product3.png"
                                                className="rounded mr-3" alt="cherry"/>
                                            <span>Snopy SN-BT96 Pretty</span>
                                        </Link>
                                    </td>
                                    <td>Serena Glover</td>
                                    <td>$250</td>
                                    <td>
                                        <span className="badge bg-danger-bright text-danger">Payment error</span>
                                    </td>
                                    <td>2018/08/28 21:24:36</td>
                                    <td>
                                        <Link href="#" className="text-secondary" data-toggle="tooltip" title="Edit">
                                            <i className="ti-pencil"></i>
                                        </Link>
                                        <Link href="#" className="text-danger ml-2" data-toggle="tooltip" title="Delete">
                                            <i className="ti-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link href="#">6416</Link>
                                    </td>
                                    <td>
                                        <Link href="product-detail.html" className="d-flex align-items-center">
                                            <img width="40" src="../../assets/media/image/products/product4.png"
                                                className="rounded mr-3" alt="papaya"/>
                                            <span>Ultimate Ears Wonderboom</span>
                                        </Link>
                                    </td>
                                    <td>Dianne Prince</td>
                                    <td>$550</td>
                                    <td>
                                        <span className="badge bg-success-bright text-success">Payment accepted</span>
                                    </td>
                                    <td>2018/08/28 21:24:36</td>
                                    <td>
                                        <Link href="#" className="text-secondary" data-toggle="tooltip" title="Edit">
                                            <i className="ti-pencil"></i>
                                        </Link>
                                        <Link href="#" className="text-danger ml-2" data-toggle="tooltip" title="Delete">
                                            <i className="ti-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link href="#">92327</Link>
                                    </td>
                                    <td>
                                        <Link href="product-detail.html" className="d-flex align-items-center">
                                            <img width="40" src="../../assets/media/image/products/product5.png"
                                                className="rounded mr-3" alt="pig"/>
                                            <span>Canon Pixma E3140 Printer</span>
                                        </Link>
                                    </td>
                                    <td>Morgan Pitts</td>
                                    <td>$280</td>
                                    <td>
                                        <span className="badge bg-warning-bright text-warning">Preparing the order</span>
                                    </td>
                                    <td>2018/08/28 21:24:36</td>
                                    <td>
                                        <Link href="#" className="text-secondary" data-toggle="tooltip" title="Edit">
                                            <i className="ti-pencil"></i>
                                        </Link>
                                        <Link href="#" className="text-danger ml-2" data-toggle="tooltip" title="Delete">
                                            <i className="ti-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link href="#">3013</Link>
                                    </td>
                                    <td>
                                        <Link href="product-detail.html" className="d-flex align-items-center">
                                            <img width="40" src="../../assets/media/image/products/product6.png"
                                                className="rounded mr-3" alt="pineapple"/>
                                            <span>Canon 4000D 18-55 MM</span>
                                        </Link>
                                    </td>
                                    <td>Merrill Richardson</td>
                                    <td>$128</td>
                                    <td>
                                        <span className="badge bg-info-bright text-info">Awaiting PayPal payment</span>
                                    </td>
                                    <td>2018/08/28 21:24:36</td>
                                    <td>
                                        <Link href="#" className="text-secondary" data-toggle="tooltip" title="Edit">
                                            <i className="ti-pencil"></i>
                                        </Link>
                                        <Link href="#" className="text-danger ml-2" data-toggle="tooltip" title="Delete">
                                            <i className="ti-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link href="#">10323</Link>
                                    </td>
                                    <td>
                                        <Link href="product-detail.html" className="d-flex align-items-center">
                                            <img width="40" src="../../assets/media/image/products/product7.png"
                                                className="rounded mr-3" alt="pomegranate"/>
                                            <span>Lenovo Tab E10 TB-X104F 32GB 10.1"</span>
                                        </Link>
                                    </td>
                                    <td>Krista Mathis</td>
                                    <td>$500</td>
                                    <td>
                                        <span className="badge bg-secondary-bright text-secondary">Shipped</span>
                                    </td>
                                    <td>2018/08/28 21:24:36</td>
                                    <td>
                                        <Link href="#" className="text-secondary" data-toggle="tooltip" title="Edit">
                                            <i className="ti-pencil"></i>
                                        </Link>
                                        <Link href="#" className="text-danger ml-2" data-toggle="tooltip" title="Delete">
                                            <i className="ti-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link href="#">4218</Link>
                                    </td>
                                    <td>
                                        <Link href="product-detail.html" className="d-flex align-items-center">
                                            <img width="40" src="../../assets/media/image/products/product8.png"
                                                className="rounded mr-3" alt="raspberry"/>
                                            <span>Samsung 55Q60RAT 55"</span>
                                        </Link>
                                    </td>
                                    <td>Frankie Hewitt</td>
                                    <td>$300</td>
                                    <td>
                                        <span className="badge bg-success-bright text-success">Remote payment accepted</span>
                                    </td>
                                    <td>2018/08/28 21:24:36</td>
                                    <td>
                                        <Link href="#" className="text-secondary" data-toggle="tooltip" title="Edit">
                                            <i className="ti-pencil"></i>
                                        </Link>
                                        <Link href="#" className="text-danger ml-2" data-toggle="tooltip" title="Delete">
                                            <i className="ti-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link href="#">3158</Link>
                                    </td>
                                    <td>
                                        <Link href="product-detail.html" className="d-flex align-items-center">
                                            <img width="40" src="../../assets/media/image/products/product9.png"
                                                className="rounded mr-3" alt="strawberry"/>
                                            <span>Toshiba Canvio Basic 1TB 2.5"</span>
                                        </Link>
                                    </td>
                                    <td>Hayden Fitzgerald</td>
                                    <td>$200</td>
                                    <td>
                                        <span className="badge bg-success-bright text-success">Delivered</span>
                                    </td>
                                    <td>2018/08/28 21:24:36</td>
                                    <td>
                                        <Link href="#" className="text-secondary" data-toggle="tooltip" title="Edit">
                                            <i className="ti-pencil"></i>
                                        </Link>
                                        <Link href="#" className="text-danger ml-2" data-toggle="tooltip" title="Delete">
                                            <i className="ti-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link href="#">9610</Link>
                                    </td>
                                    <td>
                                        <Link href="product-detail.html" className="d-flex align-items-center">
                                            <img width="40" src="../../assets/media/image/products/product10.png"
                                                className="rounded mr-3" alt="watermelon"/>
                                            <span>Fms Wireless Controller</span>
                                        </Link>
                                    </td>
                                    <td>Cole Holcomb</td>
                                    <td>$700</td>
                                    <td>
                                        <span
                                            className="badge bg-secondary-bright text-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>2018/08/28 21:24:36</td>
                                    <td>
                                        <Link href="#" className="text-secondary" data-toggle="tooltip" title="Edit">
                                            <i className="ti-pencil"></i>
                                        </Link>
                                        <Link href="#" className="text-danger ml-2" data-toggle="tooltip" title="Delete">
                                            <i className="ti-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}
