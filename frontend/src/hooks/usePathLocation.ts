import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const usePathLocation = (basePath: string) => {
    const location = useLocation();
    const fromPath: string = useMemo((): string => {
        const path: string | undefined = location.state?.from?.pathname;
        if (path) {
            return path;
        }
        return basePath;
    }, []);
    console.log(fromPath);
    return { fromPath };
};

export default usePathLocation;
