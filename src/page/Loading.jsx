const Loading = () => {
    return (
        <div className='d-flex justify-content-center text-center w-100'>
            <div className="spinner-border m-5" style={{width:"5rem", height:"5rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading