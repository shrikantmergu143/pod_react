import React from 'react'

export default function LoginPage() {
  return (
    <div className='pt-4'>
        <div className="form-wrapper">
            {/* <div hidden id="logo">
                <img className="logo" src="../../assets/media/image/logo.png" alt="image"/>
                <img className="logo-dark" src="../../assets/media/image/logo-dark.png" alt="image"/>
            </div> */}
            <h5>Sign in</h5>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username or email" required="" autofocus=""/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" required=""/>
                </div>
                <div className="form-group d-flex justify-content-between">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked="" id="customCheck1"/>
                        <label className="custom-control-label" for="customCheck1">Remember me</label>
                    </div>
                    <a href="recovery-password.html">Reset password</a>
                </div>
                <button className="btn btn-primary btn-block">Sign in</button>
            </form>

        </div>
    </div>
  )
}
