import {NavLink} from 'react-router-dom'
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
        <nav>
            <ul className={classes.list}>
                <li>
                    <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined} end>Home</NavLink> 
                    {/* NavLink has a special class property, which is unlike normal class it will takes in a function, which by
                        default receives a object that has isActive property in it which we can use to conditionally set css classes.
                        end - if we don't add end, since it's a root route path all the child route also will stay active even though if we are not in the / path or page.
                        so it will make only the route that ends with / as active
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