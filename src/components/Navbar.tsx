import React, { PropsWithChildren } from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { removeToken } from "../redux/auth/token";

import Logo from "./../assets/vh-logo.png";

interface NavbarProps {}

const Navbar: React.FC<PropsWithChildren<NavbarProps>> = ({}) => {
  const authToken = useAppSelector((state) => state.user.access.token);
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(removeToken({ action: "LOG ME OUT" }));

  return (
    <>
      <nav className="navbar navbar-expand-lg border-bottom bg-white">
        <div className="container-fluid">
          <a
            href="/"
            className="navbar-brand d-flex align-align-items-center gap-2 d-flex align-items-center"
          >
            {/* <img src={Logo} alt="logo" width="180px" height="60px" /> */}
            <span className="p-2 fw-bold lh-sm text-primary border-primary-subtle text-primary-gradient">
              Survey Management
            </span>
          </a>

          {authToken ? (
            <span
              onClick={() => handleLogout()}
              className="btn btn-outline-info px-4 btn-sm navbar-text fw-bold"
            >
              Logout
            </span>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
