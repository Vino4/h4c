import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

export default UserAuthWrapper({
    /* state.authentication is implemented using immutable */
    authSelector: state => state.authentication.get("jwtToken"),
    redirectAction: routerActions.replace,
    failureRedirectPath: '/activity',
    wrapperDisplayName: 'UserIsAuthenticated'
})
