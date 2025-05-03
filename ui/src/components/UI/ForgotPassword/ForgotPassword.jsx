import React, { useState } from 'react';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
const ForgotPassword = ({goBack}) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate API call
        try {
            // Replace with actual API call
            setMessage('Đã gửi link đặt lại mật khẩu vào email của bạn!');
        } catch (error) {
            setMessage('Không tìm thấy tài khoản này!');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '12px' }}>
            <h2 style={{color: "#464646"}}>Đặt lại mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: "#464646" }}>
                        Tài khoản Email
                    </label>
                    <Input id="email" name="email" type="email" placeholder="Email" value={email} setValue={setEmail} validate={validateEmail} warning={"Email không hợp lệ"} />
                </div>
                <button type="submit" style={{ padding: '10px 16px', cursor: 'pointer', border: 'none', backgroundColor: '#2980b9', color: '#fff', borderRadius: '8px' }}>
                    Đặt lại mật khẩu
                </button>
            </form>
            {message && <p style={{ marginTop: '12px', color: 'green' }}>{message}</p>}
            <button type='button' onClick={() => goBack(false)} style={{ padding: '8px 16px', cursor: 'pointer', border: 'none', backgroundColor: '#2980b9', color: '#fff', borderRadius: '8px' }}>
                Quay lại
            </button>
        </div>
    );
};
ForgotPassword.propTypes = {
    goBack: PropTypes.func.isRequired,
};

export default ForgotPassword;