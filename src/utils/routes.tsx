import React from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import FormBuilderPage from "../pages/FormBuilderPage";
import TemplatesPage from "../pages/TemplatesPage";
import Error404 from "../pages/Error404";
import Users from "../pages/Users";
import Groups from "../pages/Groups";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      {
        path: "formbuilder/:formId",
        element: <FormBuilderPage />,
      },
      {
        path: "/",
        element: <TemplatesPage />,
      },

      {
        path: "/users",
        element: <Users />,
      },

      {
        path: "/groups",
        element: <Groups />,
      },
    ],
  },
];

export default routes;
