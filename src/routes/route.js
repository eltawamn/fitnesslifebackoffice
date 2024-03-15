import { Routes, Route } from "react-router-dom";
import { HomePage } from '../pages/Home'
import { AboutPage } from '../pages/About/About'
import { AuthPage } from '../pages/Auth/Auth'
import { DefaultHeader } from '../components/Header/Header'
import { useUserContext } from "../context/userContext";

export const AppRoutes = () => {
    const { isAuthenticated } = useUserContext();

    return isAuthenticated ? (
        <DefaultHeader>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/avis" element={<AboutPage/>} />
                <Route path="/contacts" element={<>CONTACTS</>} />
                <Route path="*" element={<HomePage/>} />
            </Routes>
        </DefaultHeader>
    ) :  (
    <Routes>
        <Route path="*" element={<AuthPage />} />
    </Routes>
    )       
}