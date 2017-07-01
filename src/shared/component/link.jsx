import React from 'react'

const Link = (props) => {
  const aProps = Object.assign({}, props)
  const text = aProps.text
  delete aProps.dispatch
  delete aProps.text
  return (
    <div className="dropdown">
      <a href="#" className="btn btn-link dropdown-toggle" tabIndex="0">
        Login <i className="icon icon-caret"></i>
      </a>
      <ul id="auth_menu" className="menu">
        <li className="auth_item">
          <a href="/auth/facebook"><img src="https://www.facebook.com/images/fb_icon_325x325.png" className="auth_icon" />Facebook</a>
        </li>
        <li className="auth_item">
          <a href="/auth/google"><img src="https://maxcdn.icons8.com/Share/icon/Logos//google_logo1600.png" className="auth_icon" />Google</a>
        </li>
        <li className="auth_item">
          <a href="/auth/twitter"><img src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/512/Twitter-icon.png" className="auth_icon" />Twitter</a>
        </li>
      </ul>
    </div>
  )
}

export default Link


// <select onChange={(e) => window.location.href = e.target.value}>
//   <option>{text}</option>
//   <option value={'/auth/twitter'}>Twitter</option>
//   <option value={'/auth/facebook'}>Facebook</option>
//   <option value={'/auth/google'}>Google</option>
// </select>
