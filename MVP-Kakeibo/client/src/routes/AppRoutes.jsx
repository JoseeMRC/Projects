import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";

import { Login } from "../pages/auth/Login/Login";
import { Register } from "../pages/auth/Register/Register";
import { Verify } from "../pages/auth/Verify/Verify";

import { Users } from "../pages/User/User";
import { PassResetLink } from "../pages/User/EditUser/PassResetLink";
import { ChangePass } from "../pages/User/EditUser/ChangePass";
import { EditAnswer } from "../pages/User/EditUser/EditAnswer";

import { Admin } from "../pages/Admin/Admin";
import { Questions } from "../pages/Admin/Questions/Questions";
import { AllUsers } from "../pages/Admin/AllUsers/AllUsers";
import { AllCategories } from "../pages/Admin/Categories/AllCategories";
import { CreateCategoryForm } from "../pages/Admin/Categories/CreateCategoryForm";

import { GalleryCategories } from "../pages/Categories/GalleryCategories";

import { AllObjetives } from "../pages/Objetives/AllObjetives";
import { OneObjetive } from "../pages/Objetives/OneObjetive";
import { CreateObjetive } from "../pages/Objetives/CreateObjetive/CreateObjetive";
import { EditObjetive } from "../pages/Objetives/EditObjetive";

import { EditUser } from "../pages/User/EditUser/EditUser";

import { GalleryMovements } from "../pages/Movements/GalleryMovements";
import { GalleryMovementsCategory } from "../pages/Movements/GalleryMovementsCategory";
import { CreateMovementForm } from "../pages/Movements/CreateMovementForm";
import { Analisis } from "../pages/Analisis/Analisis";
import { LayOutConNavbar } from "../components/Navbar/LayOutConNavbar";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { ErrorPage } from "../pages/Home/PageError/ErrorPage";

export const AppRoutes = () => {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />

        <Route element={<LayOutConNavbar />}>
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={<ErrorPage />} />
            </>
          )}
          <Route path="/users/passResetLink" element={<PassResetLink />} />
          <Route path="/users/changePass/:token" element={<ChangePass />} />
          <Route path="/users/verify/:token" element={<Verify />} />
          {user?.rol == 2 && (
            <>
              <Route path="/users" element={<Users />} />
              <Route path="/users/editUser/:id" element={<EditUser />} />
              <Route path="/users/editAnswer/:id" element={<EditAnswer />} />

              <Route
                path="/categories/allcategories"
                element={<GalleryCategories />}
              />
              <Route
                path="/objetives/allObjetives/:id"
                element={<AllObjetives />}
              />
              <Route
                path="/objetives/oneObjetive/:id"
                element={<OneObjetive />}
              />
              <Route
                path="/objetives/create/:id"
                element={<CreateObjetive />}
              />
              <Route
                path="/objetives/editObjetive/:id"
                element={<EditObjetive />}
              />
              <Route
                path="/movements/allmovements"
                element={<GalleryMovements />}
              />
              <Route
                path="/movements/:selectedCategory_id"
                element={<GalleryMovementsCategory />}
              />
              <Route path="/analisis" element={<Analisis />} />
              <Route
                path="/movements/create"
                element={<CreateMovementForm />}
              />
              <Route
                path="/*"
                element={<ErrorPage />}
              />
            </>
          )}
          {user?.rol === 1 && (
            <>
              <Route path="/admin/home" element={<Admin />} />
              <Route path="/admin/allUsers" element={<AllUsers />} />
              <Route path="/admin/questions" element={<Questions />} />
              <Route path="/admin/allcategories" element={<AllCategories />} />
              <Route
                path="/admin/createcategory"
                element={<CreateCategoryForm />}
              />
              <Route
                path="/*"
                element={<ErrorPage />}
              />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
