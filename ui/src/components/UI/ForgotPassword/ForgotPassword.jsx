import React, { useState } from 'react';
import axios from 'axios';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './ForgotPassword.scss';
import OtpInput from '../OtpInput/OtpInput';
import Loading from '../Loading/Loading';
const ForgotPassword = ({ goBack }) => {

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [resetPassword, setResetPassword] = useState('');
    const [resetPassword2, setResetPassword2] = useState('');
    const [accessToken, setAccessToken] = useState('');
    
    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    const validatePassword = (password) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return pattern.test(password);
    }
    const validatePassword2 = React.useCallback((password) => {
        return password === resetPassword;
    }, [resetPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/",
            data: { email }
        }).then((response) => {
            console.log(response.data);
            setStep(2);
        }).catch((error) => {
            if (error.response) {
                setMessage('Không tìm thấy tài khoản này!');
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }).finally(() => {
            setIsSubmitting(false);
        })
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: { password: resetPassword, email: email }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }).finally(() => {
            setIsSubmitting(false);
        })
    }
    return (
        <>
            {step === 1 &&
                <div className='forgot-password-box' style={{ marginBottom: '108px' }}>
                    <h2 className='forgot-password-title'>Đặt lại mật khẩu</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ margin: '12px 0 0 0' }}>
                            <Input id="email" name="email" type="email" placeholder="Email đã đăng kí" value={email} setValue={setEmail} validate={validateEmail} warning={"Email không hợp lệ"} />
                        </div>
                        <Button label={!isSubmitting ? 'Gửi yêu cầu' : <Loading width={'24px'} height={'24px'} />} type='submit' bgColor='#3498db' color='#fff' className='send-button' isValid={validateEmail(email)} />
                    </form>
                    {message && <p style={{ marginTop: '12px', color: '#c0392b' }}>{message}</p>}
                    <Button label={'Quay Lại'} onClick={() => goBack(false)} bgColor='#e74c3c' className='return-btn' />
                </div>
            }

            {step === 2 && <OtpInput email={email} goBack={() => setStep(1)} goOn={() =>setStep(3)}/>}

            {step === 3 && <div className='forgot-password-box' style={{marginBottom: '48px'}}>
                <h2 className='forgot-password-title'>Đặt lại mật khẩu</h2>
                <form onSubmit={handleResetPassword}>
                    <div style={{ margin: '12px 0 0 0' }}>
                        <Input id="resetPassword" name="resetPassword" type="password" placeholder="Mật khẩu" value={resetPassword} setValue={setResetPassword} validate={validatePassword} warning={"Mật khẩu phải dài trên 8 và bao gồm ít nhất 1 ký tự in hoa, ký tự thường, ký tự đặc biệt và số"} />
                        <Input id="resetPassword2" name="resetPassword2" type="password" placeholder="Nhập lại mật khẩu" value={resetPassword2} setValue={setResetPassword2} validate={validatePassword2} warning={"Mật khẩu nhập không trùng khớp"} />
                    </div>
                    <Button label={!isSubmitting ? 'Đặt lại mật khẩu' : <Loading width={'24px'} height={'24px'} />} type='submit' bgColor='#3498db' color='#fff' className='send-button' isValid={validatePassword(resetPassword) && validatePassword2(resetPassword2)}/>
                </form>
            </div>}
        </>

    );
};
ForgotPassword.propTypes = {
    goBack: PropTypes.func.isRequired,
};

export default ForgotPassword;