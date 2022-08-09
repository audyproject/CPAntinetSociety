export function Toast({message, background, id}){

    const className = "toast align-items-center text-white border-0 fade " + background

    return (
        <>
        <div className="toast-container position-absolute top-0 end-0 p-3 mt-5" style={{'zIndex': 5}}>
                <div id={id} className={className} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            {message}
                        </div>
                        <button className="btn-close btn-close-white me-2 m-auto" type="button" data-coreui-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </>
    )
}