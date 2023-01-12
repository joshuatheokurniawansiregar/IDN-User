import { useState, useEffect } from 'react';
import { TopNavLayoutLoggedIn } from '../layout/TopNavigationLoggedIn';
import { TopNavLayout } from '../layout/TopNavigation';
export function NavLinks() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const localStorage = window.localStorage.getItem("user");
        if (localStorage) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn])
    if (isLoggedIn === true) {
        return (
            <TopNavLayoutLoggedIn />
        )
    }
    return (
        <TopNavLayout />
    )
}