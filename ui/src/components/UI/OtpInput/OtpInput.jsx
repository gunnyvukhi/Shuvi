import React, { useState, useRef} from 'react';
import './OtpInput.css';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Button from '../Button/Button';
import axios from 'axios';
const OtpInput = ({email, goBack, goOn}) => {
    const [otp, setOtp] = useState(new Array(6).fill('')); // State to store OTP values
    const inputsRef = useRef([]); // Ref to store input elements

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        const isValidInput = value.match(/[0-9a-z]/gi);
        const newOtp = [...otp];
        newOtp[index] = isValidInput ? value[0] : ''; // Only allow valid input
        setOtp(newOtp);

        // Move focus to the next input if valid input is entered
        if (isValidInput && index < otp.length - 1) {
            inputsRef.current[index + 1].focus();
        }

        // Handle backspace to move focus to the previous input
        if (e.key === 'Backspace' && index > 0 && !value) {
            inputsRef.current[index - 1].focus();
        }

        // Submit OTP if all fields are filled
        if (index === otp.length - 1 && isValidInput) {
            submitOtp(newOtp);
        }
    };

    const handlePaste = (e) => {
        const data = e.clipboardData.getData('text').split('');
        if (data.length === otp.length) {
            setOtp(data);
            inputsRef.current[otp.length - 1].focus(); // Focus the last input
            submitOtp(data);
        }
    };

    const submitOtp = (otpArray) => {
        inputsRef.current.forEach((input) => {
            input.disabled = true;
            input.classList.add('disabled');
        });
        const otpValue = otpArray.join('');
        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/users/otp/check/",
            headers: {
                'Content-Type': 'application/json',
            },
            data: { email: email , otp_code: otpValue }
        }).then((response) => {
            console.log(response.data);
            goOn({data: response.data}); // Call the goOn function to proceed
        }).catch((error) => {
            if (error.response) {
                setOtp(new Array(6).fill('')); // Reset OTP input
                inputsRef.current[0].focus(); // Focus the first input
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    };

    return (
        <div className="otp-container">
            <h1>Nhập mã OTP</h1>
            <div className="otp-field" onPaste={handlePaste}>
                {otp.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={value}
                        style={index === (6 / 2) ? { marginLeft: '8px' } : {}}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpChange(e, index)}
                        ref={(el) => (inputsRef.current[index] = el)}
                    />
                ))}
            </div>
            <p className='otp-email'>Mã OTP đã được gửi về email <b>{email}</b></p>
            <p className="otp-resend">Gửi lại mã OTP?</p>
            <Button label={'Quay Lại'} onClick={goBack} bgColor='#e74c3c'/>
        </div>
    );
};

OtpInput.propTypes = {
    email: PropTypes.string.isRequired,
    goBack: PropTypes.func,
    goOn: PropTypes.func,
};

OtpInput.defaultProps = {
    email: '',
    goBack: () => {},
    goOn: () => {},
};

export default OtpInput;