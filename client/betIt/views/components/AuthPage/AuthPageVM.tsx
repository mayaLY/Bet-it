import { useEffect, useState } from "react";


interface UseAuthOutput {
    error: string | null;
    loading: boolean;
    handleRegister: () => void;
}
export function goToRegister(): UseAuthOutput {
    try {
        const [loading, setLoading] = useState<boolean>(false);
        function handleREgister(){}
       
    } catch (error: any) {
        return {
            loading: false,
            handleRegister: () => { }
        }

    }
}
