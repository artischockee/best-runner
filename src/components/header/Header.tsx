import "./Header.scss";
import React from "react";
import localiser from "../../services/locale";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <span className="header__logo-text">{localiser.l("header/title")}</span>
        </div>
      </div>
    </header>
  );
}
