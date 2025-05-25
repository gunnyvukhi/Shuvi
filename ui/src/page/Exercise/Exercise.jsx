import PropTypes from 'prop-types';
import './Exercise.css';
import DefaultStyle from '../../components/layout/defaultStyle/defaultStyle.jsx';
import useData from '../../components/hooks/useData.js';
const Exercise = () => {
  const { data, loading, error } = useData('http://127.0.0.1:8000/users/profile/');

  if (loading) return (<DefaultStyle selected={1} data={data}><p>Loading...</p></DefaultStyle>);
  if (error) return (<DefaultStyle selected={1} data={data}><p>Error: {error.message}</p></DefaultStyle>);
  return (
    <DefaultStyle selected={2} data={data}>
      <h1>Exercise</h1>
    </DefaultStyle>
  );
}

Exercise.PropTypes = {
  accessToken: PropTypes.string.isRequired,
  handleAccessTokenExpired: PropTypes.func.isRequired,
  removeTokens: PropTypes.func.isRequired,
};

export default Exercise;