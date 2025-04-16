import {FaBell } from "react-icons/fa";

const Header = () => {
    return (
        <header className="header">
                  <nav className="nav-links">
                    <a href="#">Trang chủ</a>
                    <a href="#">Tập luyện</a>
                    <a href="#">Chế độ ăn</a>
                    <a href="#">Theo dõi</a>
                    <a href="#">Hồ sơ</a>
                  </nav>
                  <div className="header-right">
                    <FaBell className="icon" />
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="avatar"
                      className="avatar"
                    />
                  </div>
                </header>
    )
}

export default Header
