import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "./../components/MainNavigation";

function RootLayout() {
    const navigation = useNavigation(); //with useNavigation hook we can get the state of the route transition, this will return a object which has a attribute called state
    //loading is added on visible component not the one yet to be loaded
    return (
        <>
            <MainNavigation></MainNavigation>
            <main>
                {navigation.state === 'loading' && <p>Loading...</p>} 
                <Outlet />
                {/* Outlet will tell react to load the children component here */}
            </main>
        </>
    )
}

export default RootLayout;