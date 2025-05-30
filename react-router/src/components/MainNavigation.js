import {NavLink} from 'react-router-dom'
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
        <nav>
            <ul className={classes.list}>
                <li>
                    <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined}>Home</NavLink> 
                    {/* NavLink has a special class property, which is unlike normal class it will takes in a function, which by
                        default receives a object that has isActive property in it which we can use to conditionally set css classes
                     */}
                </li>
                <li>
                    <NavLink to="/products" className={({isActive}) => isActive ? classes.active : undefined}>Products</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default MainNavigation