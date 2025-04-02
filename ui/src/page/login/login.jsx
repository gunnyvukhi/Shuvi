import React, { useState, useEffect } from 'react';
import './login.scss';
import loginBg from '../../assets/images/login_bg.png';
import Input from '../../components/Input/Input';
import SocialMedia from '../../components/SocialMedia/SocialMedia';
import OtpInput from '../../components/OtpInput/OtpInput';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sighInName, setSighInName] = useState('');
    const [sighInEmail, setSighInEmail] = useState('');
    const [sighInPassword, setSighInPassword] = useState('');
    const [sighInPassword2, setSighInPassword2] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const onSubmitSignIn = () =>{
        if (!isFormValid) return;
        console.log("Sign Up Form Submitted");
        console.log(sighInName)
        console.log(sighInEmail)
        console.log(sighInPassword)
        setIsSignUp(true);
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

    const handleContainerFormClick = () => {
        document.querySelector(".container").classList.add("active");
    };
    
    useEffect(() => {
        const isSignUpFormValid =
            sighInName &&
            validateEmail(sighInEmail) &&
            validatePassword(sighInPassword) &&
            validatePassword2(sighInPassword2);

        setIsFormValid(isSignUpFormValid);
    }, [sighInName, sighInEmail, sighInPassword, sighInPassword2]);

    return (
        <div className='loginPage' style={{ backgroundImage: `url(${loginBg})`}}>
            <div className="container">
                <div className="box"></div>
                <div className="container-forms">
                    <div className="container-info">
                        <div className="info-item">
                            <div className="table">
                                <div className="table-cell">
                                    <p>
                                        Đã có tài khoản?
                                    </p>
                                    <div className="btn" onClick={handleInfoItemClick}>
                                        Đăng nhập ngay
                                    </div>
                                    <hr />
                                    <SocialMedia />
                                </div>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="table">
                                <div className="table-cell">
                                    <p>
                                        Chưa có tài khoản?
                                    </p>
                                    <div className="btn" onClick={handleInfoItemClick}>
                                        Đăng kí tại đây
                                    </div>
                                    <hr />
                                    <SocialMedia />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-form">
                        <div className="form-item log-in">
                            <div className="table">
                                <div className="table-cell">
                                    <h2 className="title">Đăng nhập</h2>
                                        <Input id="email" name="email" type="email" placeholder="Email" value={email} setValue={setEmail}/>
                                        <Input id="password" name="password" type="password" placeholder="Mật khẩu" value={password} setValue={setPassword}/>
                                    <div className="btn" onClick={handleContainerFormClick}>
                                        Đăng nhập
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-item sign-up">
                            <div className="table">
                                {isSignUp ?
                                <div className="table-cell">
                                    <OtpInput email={sighInEmail}/>
                                    <div className="btn" onClick={() => setIsSignUp(false)}>
                                        Quay lại
                                    </div>
                                </div> 
                                :
                                <div className="table-cell">
                                <h2 className="title">Tạo tài khoản</h2>
                                <Input id="sighInName" name="sighInName" type="text" placeholder="Họ và tên" value={sighInName} setValue={setSighInName}/>
                                <Input id="sighInEmail" name="sighInEmail" type="email" placeholder="Email" value={sighInEmail} setValue={setSighInEmail} validate={validateEmail} warning={"Email không hợp lệ"}/>
                                <Input id="sighInPassword" name="sighInPassword" type="password" placeholder="Mật khẩu" value={sighInPassword} setValue={setSighInPassword} validate={validatePassword} warning={"Mật khẩu phải dài trên 8 và bao gồm ít nhất 1 ký tự in hoa, ký tự thường, ký tự đặc biệt và số"}/>
                                <Input id="sighInPassword2" name="sighInPassword2" type="password" placeholder="Nhập lại mật khẩu" value={sighInPassword2} setValue={setSighInPassword2} validate={validatePassword2} warning={"Mật khẩu nhập không trùng khớp"}/>
                                    <div className="btn" onClick={onSubmitSignIn} style={isFormValid ? {} : { opacity: 0.5, cursor: "not-allowed"}}>
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

export default Login;