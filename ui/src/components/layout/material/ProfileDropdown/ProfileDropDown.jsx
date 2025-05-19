import React from 'react';
import './ProfileDropDown.scss';
import PropTypes from 'prop-types';
import { FaUser, FaQuestionCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Toggle from '../Toggle/Toggle.jsx';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken.js';
const ProfileDropdown = () => {
    const navigate = useNavigate();
    const { removeTokens } = useToken();
    const handleLogout = () => {
        removeTokens();
        navigate('/login');
    };
    const navBtnList = [
        { name: 'Trang cá nhân', icon: <FaUser className='profile-dropdown-icon'/>, onclick: () => {}, side: false },
        { name: 'Cài đặt', icon: <FaCog className='profile-dropdown-icon'/> , onclick: () => {}, side: <Toggle/> },
        { name: 'Đăng xuất', icon: <FaSignOutAlt className='profile-dropdown-icon'/>, onclick: handleLogout, side: false },
    ];

    return (
        <div className="profile-dropdown">
            {navBtnList.map((link, index) => (
                    <div key={index} className="profile-dropdown-button" onClick={link.onclick}>{link.icon}<span>{link.name}</span>{link.side && <div className='profile-dropdown-side'>{link.side}</div>}</div>
                ))}
        </div>
    );
};
ProfileDropdown.propTypes = {
    removeTokens: PropTypes.func.isRequired,
};
export default ProfileDropdown;