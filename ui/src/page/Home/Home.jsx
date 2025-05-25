import PropTypes from 'prop-types';
import './Home.css';
import DefaultStyle from '../../components/layout/defaultStyle/defaultStyle.jsx';
import useData from '../../components/hooks/useData.js';
import ShowBox from '../../components/UI/ShowBox/ShowBox.jsx';
import { FaFire } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import FullBodyMuscles from '../../components/UI/FullBodyMuscles/FullBodyMuscles.jsx';
import LineChart from '../../components/UI/LineChart/LineChart.jsx';

const Home = () => {
  const { data, loading, error } = useData('http://127.0.0.1:8000/users/profile/');

  if (loading) return (<DefaultStyle selected={1} ><p>Loading...</p></DefaultStyle>);
  if (error) return (<DefaultStyle selected={1}><p>Error: {error.message}</p></DefaultStyle>);

  return (
    <DefaultStyle selected={1} data={data}>
      <div className="section group">
        <div className="col span_2_of_3">
          <div className="col span_1_of_2" style={{marginTop: 0}}>
            <ShowBox header={'Calories tiêu thụ'} icon={<FaFire />} iconWidth="80px" style={{marginBottom: '3.2%'}}>
              <div className="section group">
                <div className="col span_1_of_2">Hôm nay:</div>
                <div className="col span_1_of_2">~2000 Calories</div>
              </div>
              <div className="section group">
                <div className="col span_1_of_2">Tuần này:</div>
                <div className="col span_1_of_2">~14000 Calories</div>
              </div>
            </ShowBox>

            <ShowBox header={'Thời gian tập luyện'} icon={<CgGym />} iconWidth="80px" style={{marginBottom: '1%'}}>
              <div className="section group">
                <div className="col span_1_of_2">Mỗi buổi tập:</div>
                <div className="col span_1_of_2">2 tiếng 15 phút</div>
              </div>
              <div className="section group">
                <div className="col span_1_of_2">Cả Tuần:</div>
                <div className="col span_1_of_2">15 tiếng 47 phút</div>
              </div>
            </ShowBox>
          </div>
          <div className="col span_1_of_2" style={{marginTop: 0}}>
            <ShowBox header={'Calories đã nạp'} icon={<IoFastFood />} iconWidth="80px" style={{marginBottom: '3.2%'}}>
              <div className="section group">
                <div className="col span_1_of_2">Hôm nay:</div>
                <div className="col span_1_of_2">~2000 Calories</div>
              </div>
              <div className="section group">
                <div className="col span_1_of_2">Tuần này:</div>
                <div className="col span_1_of_2">~14000 Calories</div>
              </div>
            </ShowBox>

            <ShowBox header={'placeholder'} icon={<IoFastFood />} iconWidth="80px" style={{marginBottom: '1%'}}>
              <div className="section group">
                <div className="col span_1_of_2">------:</div>
                <div className="col span_1_of_2">~~~</div>
              </div>
              <div className="section group">
                <div className="col span_1_of_2">------:</div>
                <div className="col span_1_of_2">~~~</div>
              </div>
            </ShowBox>
          </div>
          <ShowBox>
              <LineChart />
          </ShowBox>
        </div>
        <div className="col span_1_of_3">
          <ShowBox>
            <FullBodyMuscles />
          </ShowBox>
        </div>
      </div>
    </DefaultStyle>
  );
}

Home.PropTypes = {
  accessToken: PropTypes.string.isRequired,
  handleAccessTokenExpired: PropTypes.func.isRequired,
  removeTokens: PropTypes.func.isRequired,
};

export default Home;