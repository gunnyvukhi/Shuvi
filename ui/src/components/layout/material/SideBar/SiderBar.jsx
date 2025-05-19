import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import ProfileDropdown from '../ProfileDropdown/ProfileDropDown.jsx';
import './SideBar.scss';
import PropTypes from 'prop-types';
import demouser from '../../../../assets/images/demo_user.jpeg';
import logo from '../../../../assets/images/logo.png';
const navBtnList1 = [
    { name: 'Trang Chủ', icon: 'fas fa-house-user', url: 'home' },
    { name: 'Tập luyện', icon: 'fas fa-dumbbell', url: 'exercise' },
    { name: 'Dinh dưỡng', icon: 'fas fa-utensils', url: 'nutrition' }]
const navBtnList2 = [
    { name: 'Lịch trình', icon: 'fas fa-calendar-alt', url: 'home' },
    { name: 'Công cụ khác', icon: 'fas fa-tools', url: 'home' },
    { name: 'Cửa hàng', icon: 'fas fa-shopping-cart', url: 'home' }]
const navBtnList3 = [
    { name: 'Premium', icon: 'fas fa-gem', url: 'home' },
    { name: 'Premium', icon: 'fas fa-gem', url: 'home' },
];

const Sidebar = ({ selected, data}) => {
    const navigate = useNavigate();

    const [selectedBtn, setSelectedBtn] = useState(selected);

    const default_highlight = (selectedBtn === undefined || selectedBtn === null || selectedBtn < 1) 
        ? `-70px` 
        : `calc(var(--nav-button-height) * ${selectedBtn - 1} + var(--navbar-spacing) * ${selectedBtn} + 16px)`;

    const [hover, setHover] = useState(false);
    return (
        <div id="nav-bar" style={{'--default-highlight' : 'var(--nav-btn1-pos)'}}>
            <input id="nav-toggle" type="checkbox" />
            <div id="nav-header">
                <a id="nav-title" href="#" target="_blank" style={{height: '100%'}}>
                    <img src={logo} alt="Logo" style={{height: '56px', margin: '12px 12px 12px 0px'}} />
                </a>
                <label htmlFor="nav-toggle"><span id="nav-toggle-burger"></span></label>
            </div>
            <div id="nav-content" style={{'--default-highlight': default_highlight}}>
                <hr />
                {navBtnList1.map((link, index) => (
                    <div className={index + 1 === selectedBtn ? (hover ? "nav-button" : "nav-button selected-btn") : "nav-button"} 
                        key={index} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                        onClick={() => {setSelectedBtn(index + 1); navigate(`/apps/${link.url}`)}}
                        >
                        <i className={link.icon} alt={`${link.name} icon`} />
                        <span>{link.name}</span>
                    </div>
                ))}
                <hr style={{ transform: "translateY(-2.2px)" }} />
                {navBtnList2.map((link, index) => (
                    <div className={index + 4 === selectedBtn ? (hover ? "nav-button" : "nav-button selected-btn") : "nav-button"} 
                        key={index} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                        onClick={() => {setSelectedBtn(index + 4); navigate(`/apps/${link.url}`)}}
                        >
                        <i className={link.icon} alt={`${link.name} icon`} />
                        <span>{link.name}</span>
                    </div>
                ))}
                <hr style={{ transform: "translateY(-2.2px)" }} />
                {navBtnList3.map((link, index) => (
                    <div className={index + 7 === selectedBtn ? (hover ? "nav-button" : "nav-button selected-btn") : "nav-button"} 
                        key={index} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                        onClick={() => {setSelectedBtn(index + 7); navigate(`/apps/${link.url}`)}}
                        >
                        <i className={link.icon} alt={`${link.name} icon`} />
                        <span>{link.name}</span>
                    </div>
                ))}

                <div id="nav-content-highlight"></div>
            </div>
            <input id="nav-footer-toggle" type="checkbox" />
            <div id="nav-footer">
                <div id="nav-footer-heading">
                    <div id="nav-footer-avatar">
                        <img src={demouser} alt="User Avatar" />
                    </div>
                    <div id="nav-footer-titlebox">
                        <a id="nav-footer-title" href="#" target="_blank">{`${data?.first_name || "Your"} ${data?.last_name || "Name"}`}</a>
                        <span id="nav-footer-subtitle">User</span>
                    </div>
                    <label htmlFor="nav-footer-toggle"><i className="fas fa-angle-up"></i></label>
                </div>
                <div id="nav-footer-content">
                    <ProfileDropdown/>
                </div>
            </div>
        </div>
    )
}
Sidebar.propTypes = {
    selected: PropTypes.number,
    data: PropTypes.object.isRequired,
    removeTokens: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
    selected: 0
};
export default Sidebar