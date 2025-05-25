import PropTypes from 'prop-types'
import './defaultStyle.css'
import SideBar from '../material/SideBar/SiderBar.jsx'
const defaultStyle = ({selected ,data, children}) => {
  return (
    <div className="app-container">
      <div className="app-sidebar">
        <SideBar selected={selected} data={data}/>
      </div>
      <div
        className="app-content"
      >
        {children}
      </div>
    </div>
  )
}
defaultStyle.propTypes = {
  selected: PropTypes.number,
  data: PropTypes.object,
  children: PropTypes.node.isRequired,
}
defaultStyle.defaultProps = {
  selected: 1,
  data: {},
}
export default defaultStyle