import "../../import.js"

export function Dashboard() {
    return(
        <>
        <div className="container-lg">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="card mb-4 text-white bg-primary">
                <div className="card-body pb-0 d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fs-4 fw-semibold">26K <span className="fs-6 fw-normal">(-12.4%
                        <svg className="icon">
                          <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-arrow-bottom"></use>
                        </svg>)</span></div>
                    <div>Users</div>
                  </div>
                  <div className="dropdown">
                    <button className="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <svg className="icon">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-options"></use>
                      </svg>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Action</a><a className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else here</a></div>
                  </div>
                </div>
                <div className="c-chart-wrapper mt-3 mx-3" style={{height: "70px"}}>
                  <canvas className="chart" id="card-chart1" height="70"></canvas>
                </div>
              </div>
            </div>
            {/* <!-- /.col--> */}
            <div className="col-sm-6 col-lg-3">
              <div className="card mb-4 text-white bg-info">
                <div className="card-body pb-0 d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fs-4 fw-semibold">$6.200 <span className="fs-6 fw-normal">(40.9%
                        <svg className="icon">
                          <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-arrow-top"></use>
                        </svg>)</span></div>
                    <div>Income</div>
                  </div>
                  <div className="dropdown">
                    <button className="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <svg className="icon">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-options"></use>
                      </svg>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Action</a><a className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else here</a></div>
                  </div>
                </div>
                <div className="c-chart-wrapper mt-3 mx-3" style={{height: "70px"}}>
                  <canvas className="chart" id="card-chart2" height="70"></canvas>
                </div>
              </div>
            </div>
            {/* <!-- /.col--> */}
            <div className="col-sm-6 col-lg-3">
              <div className="card mb-4 text-white bg-warning">
                <div className="card-body pb-0 d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fs-4 fw-semibold">2.49% <span className="fs-6 fw-normal">(84.7%
                        <svg className="icon">
                          <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-arrow-top"></use>
                        </svg>)</span></div>
                    <div>Conversion Rate</div>
                  </div>
                  <div className="dropdown">
                    <button className="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <svg className="icon">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-options"></use>
                      </svg>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Action</a><a className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else here</a></div>
                  </div>
                </div>
                <div className="c-chart-wrapper mt-3" style={{height: "70px"}}>
                  <canvas className="chart" id="card-chart3" height="70"></canvas>
                </div>
              </div>
            </div>
            {/* <!-- /.col--> */}
            <div className="col-sm-6 col-lg-3">
              <div className="card mb-4 text-white bg-danger">
                <div className="card-body pb-0 d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fs-4 fw-semibold">44K <span className="fs-6 fw-normal">(-23.6%
                        <svg className="icon">
                          <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-arrow-bottom"></use>
                        </svg>)</span></div>
                    <div>Sessions</div>
                  </div>
                  <div className="dropdown">
                    <button className="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <svg className="icon">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-options"></use>
                      </svg>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Action</a><a className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else here</a></div>
                  </div>
                </div>
                <div className="c-chart-wrapper mt-3 mx-3" style={{height: "70px"}}>
                  <canvas className="chart" id="card-chart4" height="70"></canvas>
                </div>
              </div>
            </div>
            {/* <!-- /.col--> */}
          </div>
        </div>
        </>
    )
}