import React from 'react';
import './ProfileDropDown.scss';
import { FaUser, FaQuestionCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const navBtnList = [
    { name: 'Trang cá nhân', icon: <FaUser className='profile-dropdown-icon'/> },
    { name: 'Cài đặt', icon: <FaCog className='profile-dropdown-icon'/> },
    { name: 'Đăng xuất', icon: <FaSignOutAlt className='profile-dropdown-icon'/> },
];

const ProfileDropdown = () => {
    return (
        <div className="profile-dropdown">
            {navBtnList.map((link, index) => (
                    <div className="profile-dropdown-button">{link.icon}<span>{link.name}</span></div>
                ))}
        </div>
    );
};

export default ProfileDropdown;