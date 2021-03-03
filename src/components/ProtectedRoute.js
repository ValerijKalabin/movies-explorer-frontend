import { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import CurrentUserContext from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ component: Component, ...props  }) => {
  const currentUser = useContext(CurrentUserContext);
  const loggedIn = !!currentUser.email;

  return (
    <Route path={props.path}>
      {
        () => loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>
  );
}

export default ProtectedRoute;
