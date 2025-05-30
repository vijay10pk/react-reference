import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const logoutHandler = () => {
//as a method here because as youll learned in the last core section, these auto-generated actions which you get here, are actually action creator methods, which you have to execute and when you execute them, they return action objects. So it's then this returned action object which we dispatch here.
    dispatch(authActions.logout()); //dispatching the action
  }


  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuth && 
          <nav>
            <ul>
              <li>
                <a href="/">My Products</a>
              </li>
              <li>
                <a href="/">My Sales</a>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          </nav>
          }
    </header>
  );
};

export default Header;
