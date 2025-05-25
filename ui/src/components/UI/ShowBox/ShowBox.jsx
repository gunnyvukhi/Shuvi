import './ShowBox.scss'
const Box = ({header, headerCenter, icon, iconWidth , children, style}) => {
  return (
    <div className="box-container" style={style}>
      {icon && <div className="box-icon" style={{width: iconWidth}}>{icon}</div>}
      <div className="box-content">
        {header && (
          <div className="box-header" style={headerCenter ? { textAlign: 'center' } : {}}>
            {header}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default Box