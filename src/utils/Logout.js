import Cookies from 'js-cookie'

const Logout = () => {
  Cookies.remove('sessionStartTime')
  Cookies.remove('JSESSIONID')
  Cookies.remove('SMSESSION')
  Cookies.remove('SMSESSION-DEV')

  window.location = `/fundconnect/logout`
}

export default Logout
