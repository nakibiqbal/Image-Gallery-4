import { useState, useEffect } from "react";

export default function useSmallScreen() {
    const [isSmallScreen, setIsSmallScreen] = useState(
        typeof window !== "undefined" ? window.innerWidth < 700 : false
    );

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 700);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isSmallScreen;
}
