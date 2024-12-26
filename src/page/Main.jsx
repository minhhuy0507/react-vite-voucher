import Voucher from '../component/Voucher'
import Content from '../component/Content'
import { useState } from 'react';
import GetCode from '../component/GetCode';

const Main = () => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [voucherCode, setVoucherCode] = useState()

  const handleOtpVerification = (voucherCode) => {
    setVoucherCode(voucherCode)
    setOtpVerified(true);
  };

  return (
    <>{otpVerified ? <GetCode voucherCode={voucherCode} /> :
      <div className='row d-flex flex-column flex-lg-row flex-md-row'>
        <div className='col col-lg-5 py-3 rounded-lg-3 shadow my-1' style={{borderRadius:"10px" , backgroundColor: "rgb(225, 221, 221)" }}>
          <Voucher onOtpVerified={handleOtpVerification} />
        </div>
        <div className='col col-lg-7 p-3 shadow my-1' style={{borderRadius:"10px", backgroundColor: "rgb(237, 223, 199)"}}>
          <Content />
        </div>
      </div>}
    </>

  )
}

export default Main