import { useState, useEffect } from 'react';
import { TopNavLayoutLoggedIn } from '../layout/TopNavigationLoggedIn';
import { TopNavLayout } from '../layout/TopNavigation';
export function NavLinks() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // const localStorage = window.localStorage.getItem("user");
        if (window.localStorage.getItem("user")) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn])
    if (isLoggedIn === true) {
        // alert("alert")
        return (
            <TopNavLayoutLoggedIn />
        )
    } else {
        return (
            <TopNavLayout />
        )
    }
}