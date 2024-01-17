import React from 'react'

export default function CustomerDetails(props) {
    const { data } = props;
    // console.log("props", props)
  return (
    <div className='customer-details'>
        <div className='content-wrapper'>
            <div className='d-flex w-100 row m-0'>
                {data?.code && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">Customer Code</p>
                        <h5 className="fs-13 mb-0">{data?.code}</h5>
                    </div>
                )}
                {data?.name && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">Customer Name</p>
                        <h5 className="fs-13 mb-0">{data?.name}</h5>
                    </div>
                )}
                {data?.email && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">Email</p>
                        <h5 className="fs-13 mb-0">{data?.email}</h5>
                    </div>
                )}
                {data?.phone1 && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">Phone</p>
                        <h5 className="fs-13 mb-0">{data?.phone1}</h5>
                    </div>
                )}
                {data?.address && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">Address</p>
                        <h5 className="fs-13 mb-0">{data?.address}</h5>
                    </div>
                )}
                {data?.city && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">City</p>
                        <h5 className="fs-13 mb-0">{data?.city}</h5>
                    </div>
                )}
                {data?.state && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">state</p>
                        <h5 className="fs-13 mb-0">{data?.state}</h5>
                    </div>
                )}
                {data?.GST_no && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">GST No</p>
                        <h5 className="fs-13 mb-0">{data?.GST_no}</h5>
                    </div>
                )}
                {data?.fax && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">fax</p>
                        <h5 className="fs-13 mb-0">{data?.fax}</h5>
                    </div>
                )}
                {data?.tally_name && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">Tally Name</p>
                        <h5 className="fs-13 mb-0">{data?.tally_name}</h5>
                    </div>
                )}
                {data?.status && (
                    <div className='col-lg-3 col-6 mb-2'>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">Status</p>
                        <h5 className={`badge bg-${data?.status !== "Active"?"secondary":"primary"}-subtle ${data?.status !== "Active"?"td":"tp"} fs-11`}>{data?.status}</h5>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
