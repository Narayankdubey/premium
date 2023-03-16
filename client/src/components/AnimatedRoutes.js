import React from "react";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { Home, Illustration, NotFound, Login, Registration } from "../pages";
import { AppSkeleton, PrivateRoute } from ".";
import { ROUTES } from "../utils/constants";
import Input from "../pages/input";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
      <Route
        path={"/"}
        element={
          <PrivateRoute>
            <AppSkeleton />
          </PrivateRoute>
        }
      >
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ILLUSTRATION} element={<Illustration />} />
        <Route path={ROUTES.INPUT} element={<Input />} />
      </Route>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTRATION} element={<Registration />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AnimatedRoutes;
