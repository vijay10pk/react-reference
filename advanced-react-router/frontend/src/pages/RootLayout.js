import { Outlet } from "react-router-dom";
import MainNavigation from "./../components/MainNavigation";

function RootLayout() {
    return (
        <>
            <MainNavigation></MainNavigation>
            <main>
                <Outlet />
                {/* Outlet will tell react to load the children component here */}
            </main>
        </>
    )
}

export default RootLayout;