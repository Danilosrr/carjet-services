import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used inside a AuthContext Provider");
    }

    return authContext;
}