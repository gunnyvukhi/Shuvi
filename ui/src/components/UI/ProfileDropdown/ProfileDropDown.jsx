import React from 'react';
import './ProfileDropDown.scss';
import PropTypes from 'prop-types';
import { FaUser, FaQuestionCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
const ProfileDropdown = ({removeTokens}) => {
    const navBtnList = [
        { name: 'Trang cá nhân', icon: <FaUser className='profile-dropdown-icon'/>, onclick: () => {} },
        { name: 'Cài đặt', icon: <FaCog className='profile-dropdown-icon'/> , onclick: () => {} },
        { name: 'Đăng xuất', icon: <FaSignOutAlt className='profile-dropdown-icon'/>, onclick: () => {removeTokens()} },
    ];

    return (
        <div className="profile-dropdown">
            {navBtnList.map((link, index) => (
                    <div key={index} className="profile-dropdown-button" onClick={link.onclick}>{link.icon}<span>{link.name}</span></div>
                ))}
        </div>
    );
};
ProfileDropdown.propTypes = {
    removeTokens: PropTypes.func.isRequired,
};
export default ProfileDropdown;