import { Route, Routes } from "react-router";
import Admin from "../pages/Admin";
import Category from "../pages/Category";
import Home from "../pages/Home";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categorie/:category" element={<Category />} />
      <Route path={import.meta.env.URL_ADMIN} element={<Admin />} />
    </Routes>
  );
};

export default AppRoutes;
