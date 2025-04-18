import React, { useState, useEffect } from 'react';
import './Login.scss';
import loginBg from '../../assets/images/login_bg.png';
import Input from '../../components/UI/Input/Input';
import SocialMedia from '../../components/UI/SocialMedia/SocialMedia';
import OtpInput from '../../components/UI/OtpInput/OtpInput';
import Loading from '../../components/UI/Loading/Loading';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaRegUser } from "react-icons/fa";
import { FiUnlock } from "react-icons/fi";

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sighInName, setSighInName] = useState('');
    const [sighInEmail, setSighInEmail] = useState('');
    const [sighInPassword, setSighInPassword] = useState('');
    const [sighInPassword2, setSighInPassword2] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoginFormValid, setIsLoginFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmitLogin = () => {
        if (!email || !password) return;
        setIsSubmitting(true);
        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/api/token/",
            data: {
                "username": email,
                "password": password
            }
        }).then((response) => {
            setToken(response.data.access)
            document.querySelector(".container").classList.add("active");
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
            setIsSubmitting(false);
        })
    }


    const onSubmitSignIn = () => {
        if (!isFormValid) return;
        console.log("Sign Up Form Submitted");
        console.log(sighInName)
        console.log(sighInEmail)
        console.log(sighInPassword)
        setIsSignUp(true);
        setTimeout(() => {
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/login",
                data: values
            })
                .then((response) => {
                    setToken(response.data.access_token)
                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                })

        }, 1000)
    }

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    const validatePassword = (password) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return pattern.test(password);
    }
    const validatePassword2 = (password) => {
        return password === sighInPassword;
    }

    const handleInfoItemClick = () => {
        document.querySelector(".container").classList.toggle("log-in");
    };

    useEffect(() => {
        const isSignUpFormValid =
            sighInName &&
            validateEmail(sighInEmail) &&
            validatePassword(sighInPassword) &&
            validatePassword2(sighInPassword2);

        setIsFormValid(isSignUpFormValid);

        const isLoginValid = validateEmail(email) && validatePassword(password);
        setIsLoginFormValid(isLoginValid);

    }, [sighInName, sighInEmail, sighInPassword, sighInPassword2, email, password]);

    return (
        <div className='loginPage' style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="container">
                <div className="box"></div>
                <div className="container-forms">
                    <div className="container-info">
                        <div className="info-item">
                            <div className="table">
                                <div className="table-cell">
                                    <FiUnlock className='icon1' />
                                    <p>
                                        Đã có tài khoản?
                                    </p>
                                    <div className="btn" onClick={handleInfoItemClick}>
                                        Đăng nhập ngay
                                    </div>
                                    <div className="divider">hoặc</div>
                                    <SocialMedia color={"#323264"} bgColor={"#FFFFFF"} />
                                </div>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="table">
                                <div className="table-cell">
                                    <FaRegUser className='icon1' />
                                    <p>
                                        Chưa có tài khoản?
                                    </p>
                                    <div className="btn" onClick={handleInfoItemClick}>
                                        Đăng kí tại đây
                                    </div>
                                    <div className="divider">hoặc</div>
                                    <SocialMedia color={"#000000"} bgColor={"#FFFFFF"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-form">
                        <div className="form-item log-in">
                            <div className="table">
                                <div className="table-cell">
                                    <h2 className="title">Đăng nhập</h2>
                                    <Input id="email" name="email" type="email" placeholder="Email" value={email} setValue={setEmail} validate={validateEmail} warning={"Email không hợp lệ"} />
                                    <Input id="password" name="password" type="password" placeholder="Mật khẩu" value={password} setValue={setPassword} validate={validatePassword} warning={"Mật khẩu không hợp lệ"} />
                                    <div className="btn" onClick={onSubmitLogin} style={isLoginFormValid ? (isSubmitting ? { cursor: "not-allowed" } : {}) : { opacity: 0.5, cursor: "not-allowed" }}>
                                        {!isSubmitting ? 'Đăng nhập' : <Loading width={'24px'} height={'24px'} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-item sign-up">
                            <div className="table">
                                {isSignUp ?
                                    <div className="table-cell">
                                        <OtpInput email={sighInEmail} />
                                        <div className="btn" onClick={() => setIsSignUp(false)}>
                                            Quay lại
                                        </div>
                                    </div>
                                    :
                                    <div className="table-cell">
                                        <h2 className="title">Tạo tài khoản</h2>
                                        <Input id="sighInName" name="sighInName" type="text" placeholder="Họ và tên" value={sighInName} setValue={setSighInName} />
                                        <Input id="sighInEmail" name="sighInEmail" type="email" placeholder="Email" value={sighInEmail} setValue={setSighInEmail} validate={validateEmail} warning={"Email không hợp lệ"} />
                                        <Input id="sighInPassword" name="sighInPassword" type="password" placeholder="Mật khẩu" value={sighInPassword} setValue={setSighInPassword} validate={validatePassword} warning={"Mật khẩu phải dài trên 8 và bao gồm ít nhất 1 ký tự in hoa, ký tự thường, ký tự đặc biệt và số"} />
                                        <Input id="sighInPassword2" name="sighInPassword2" type="password" placeholder="Nhập lại mật khẩu" value={sighInPassword2} setValue={setSighInPassword2} validate={validatePassword2} warning={"Mật khẩu nhập không trùng khớp"} />
                                        <div className="btn" onClick={onSubmitSignIn} style={isFormValid ? {} : { opacity: 0.5, cursor: "not-allowed" }}>
                                            Đăng kí
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default Login;