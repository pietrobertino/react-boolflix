import { Outlet } from "react-router-dom";



export default function DefaultLayout() {

    return (
        <>
            <AppHeader />
            <main>
                <Outlet />
            </main>
        </>
    )
}