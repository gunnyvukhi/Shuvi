import { useState } from 'react';
import ProfileDropdown from '../../UI/ProfileDropdown/ProfileDropDown';
import './SideBar.scss';
import PropTypes from 'prop-types';
import demouser from '../../../assets/demo_user.jpeg';
const navBtnList1 = [
    { name: 'Trang Chủ', icon: 'fas fa-house-user' },
    { name: 'Tập luyện', icon: 'fas fa-dumbbell' },
    { name: 'Dinh dưỡng', icon: 'fas fa-utensils' }]
const navBtnList2 = [
    { name: 'Lịch trình', icon: 'fas fa-calendar-alt' },
    { name: 'Công cụ khác', icon: 'fas fa-tools' },
    { name: 'Cửa hàng', icon: 'fas fa-shopping-cart' }]
const navBtnList3 = [
    { name: 'Premium', icon: 'fas fa-gem' },
    { name: 'Premium', icon: 'fas fa-gem' },
];

const Sidebar = ({ selected, data, removeTokens}) => {
    const [selectedBtn, setSelectedBtn] = useState(selected);

    const default_highlight = (selectedBtn === undefined || selectedBtn === null || selectedBtn < 1) 
        ? `-70px` 
        : `calc(var(--nav-button-height) * ${selectedBtn - 1} + var(--navbar-spacing) * ${selectedBtn} + 16px)`;

    const [hover, setHover] = useState(false);
    return (
        <div id="nav-bar" style={{'--default-highlight' : 'var(--nav-btn1-pos)'}}>
            <input id="nav-toggle" type="checkbox" />
            <div id="nav-header">
                <a id="nav-title" href="#" target="_blank">
                    My<i className="fas fa-star"></i>Logo
                </a>
                <label htmlFor="nav-toggle"><span id="nav-toggle-burger"></span></label>
            </div>
            <div id="nav-content" style={{'--default-highlight': default_highlight}}>
                <hr />
                {navBtnList1.map((link, index) => (
                    <div className={index + 1 === selectedBtn ? (hover ? "nav-button" : "nav-button selected-btn") : "nav-button"} 
                        key={index} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                        onClick={() => {setSelectedBtn(index + 1)}}
                        >
                        <i className={link.icon} alt={`${link.name} icon`} />
                        <span>{link.name}</span>
                    </div>
                ))}
                <hr style={{ transform: "translateY(-2.2px)" }} />
                {navBtnList2.map((link, index) => (
                    <div className={index + 4 === selectedBtn ? (hover ? "nav-button" : "nav-button selected-btn") : "nav-button"} 
                        key={index} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                        onClick={() => {setSelectedBtn(index + 4)}}
                        >
                        <i className={link.icon} alt={`${link.name} icon`} />
                        <span>{link.name}</span>
                    </div>
                ))}
                <hr style={{ transform: "translateY(-2.2px)" }} />
                {navBtnList3.map((link, index) => (
                    <div className={index + 7 === selectedBtn ? (hover ? "nav-button" : "nav-button selected-btn") : "nav-button"} 
                        key={index} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                        onClick={() => {setSelectedBtn(index + 7)}}
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
                    <ProfileDropdown removeTokens={removeTokens}/>
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