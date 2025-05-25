import PropTypes from 'prop-types';
import './Nutrition.css';
import DefaultStyle from '../../components/layout/defaultStyle/defaultStyle.jsx';
import useData from '../../components/hooks/useData.js';
const Nutrition = () => {
  const { data, loading, error } = useData('http://127.0.0.1:8000/users/profile/');

  if (loading) return (<DefaultStyle selected={1} data={data}><p>Loading...</p></DefaultStyle>);
  if (error) return (<DefaultStyle selected={1} data={data}><p>Error: {error.message}</p></DefaultStyle>);
  return (
    <DefaultStyle selected={2} data={data}>
      <h1>Nutrition</h1>
    </DefaultStyle>
  );
}

Nutrition.PropTypes = {
  accessToken: PropTypes.string.isRequired,
  handleAccessTokenExpired: PropTypes.func.isRequired,
  removeTokens: PropTypes.func.isRequired,
};

export default Nutrition;