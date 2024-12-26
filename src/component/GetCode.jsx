import QRCode from "react-qr-code"

const GetCode = ({ voucherCode }) => {

    return (
        <div className="row text-center py-3" style={{borderRadius:"10px" , backgroundColor: "rgb(237, 223, 199)" }}>
            <h1 style={{ color: "red" }}>Chúc mừng bạn đã đăng ký thành công nhận mã Voucher!!!</h1>
            <br />
            <h3 style={{ color: "red" }}>Đây là mã giảm giá dành riêng cho bạn</h3>
            <br />
            {!voucherCode ?
                <h3>!!!Không tồn tại Voucher!!!</h3> :
                <div className="d-flex flex-column">
                    <h3>Mã Code</h3>
                    <span className="bg-success text-light p-1 fs-1" style={{margin:"10px auto", wordWrap:"break-word", maxWidth:"100%"}}>{voucherCode.Code}</span>
                    <h3>QR Code</h3>
                    <div className="d-flex my-2" style={{ width: "100%" }}>
                        <QRCode
                            style={{ height: "auto", margin: "auto auto", borderStyle: "solid" }}
                            value={voucherCode.Code}
                            viewBox={`0 0 256 256`} />
                    </div>

                </div>}
        </div>
    )
}

export default GetCode