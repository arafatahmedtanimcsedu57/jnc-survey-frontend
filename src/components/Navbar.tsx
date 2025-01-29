import React, { PropsWithChildren, useState } from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { removeToken } from "../redux/auth/token";

import Logo from "./../assets/vh-logo.png";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {}

const Navbar: React.FC<PropsWithChildren<NavbarProps>> = ({}) => {
  const authToken = useAppSelector((state) => state.user.access.token);
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(removeToken({ action: "LOG ME OUT" }));

  const location = useLocation();
  let currentActivePath = 1;

  switch (location.pathname) {
    case "/users":
      currentActivePath = 2;
      break;

    case "/groups":
      currentActivePath = 3;
      break;

    default:
      break;
  }

  const [active, setActive] = useState(currentActivePath);

  return (
    <>
      <nav className="navbar navbar-expand-lg border-bottom bg-white">
        <div className="container-fluid">
          {/* brand */}
          <a
            href="/"
            // className="navbar-brand d-flex align-align-items-center gap-2 d-flex align-items-center"
            className="navbar-brand"
          >
            {/* <img src={Logo} alt="logo" width="180px" height="60px" /> */}
            <span className="p-2 fw-bold lh-sm text-primary border-primary-subtle text-primary-gradient">
              Survey Management
            </span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse text-center" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2" onClick={() => setActive(1)}>
                <Link
                  to="/"
                  className={`nav-link ${active === 1 ? "active" : ""}`}
                >
                  Form Builder
                </Link>
              </li>

              <li className="nav-item mx-2" onClick={() => setActive(2)}>
                <Link
                  to="/users"
                  className={`nav-link ${active === 2 ? "active" : ""}`}
                >
                  Users
                </Link>
              </li>
              <li className="nav-item mx-2" onClick={() => setActive(3)}>
                <Link
                  to="/groups"
                  className={`nav-link ${active === 3 ? "active" : ""}`}
                >
                  Groups
                </Link>
              </li>

              {authToken ? (
                <li className="nav-item mx-2">
                  <span
                    onClick={() => handleLogout()}
                    className="btn btn-outline-info px-4 btn-sm navbar-text fw-bold"
                  >
                    Logout
                  </span>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
