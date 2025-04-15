import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { FaDumbbell, FaBell } from "react-icons/fa";

const Home = ({removeToken, token}) => {

    Home.propTypes = {
      removeToken: PropTypes.func.isRequired,
      token: PropTypes.string.isRequired
      };
  
    const [data, setData] = useState({})
  
    useEffect(() => {
      axios({
        method: "GET",
        url:"http://127.0.0.1:5000/get",
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then((response) => {
          setData(response.data)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
    }, [token]);

    return (
      <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">FitLife</h2>
        <ul className="sidebar-menu">
          <li>🏠 Tổng quan</li>
          <li>📅 Lịch tập</li>
          <li>📝 Ghi chú</li>
          <li>🎯 Mục tiêu</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
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

        {/* Dashboard */}
        <main className="dashboard">
          <h1 className="dashboard-title">Tổng quan hôm nay</h1>
          <div className="card-grid">
            <Card title="Calo đã đốt" value="530 kcal" icon={<FaDumbbell />} />
            <Card title="Bước chân" value="8,421 bước" icon="🥾" />
            <Card title="Thời gian tập" value="45 phút" icon="⏱" />
          </div>

          <div className="dashboard-rows">
            <div className="panel">📆 Lịch tập tuần</div>
            <div className="panel">💡 Gợi ý bài tập hôm nay</div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div>
        <p className="card-title">{title}</p>
        <p className="card-value">{value}</p>
      </div>
    </div>
  );
}
export default Home;