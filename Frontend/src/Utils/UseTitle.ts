import { useEffect } from "react";

// Custom React Hook:
function useTitle(title: string): void {

    
    useEffect(() => {
        document.title = title;
    }, []);
}

export default useTitle;
