import "./PageWrapper.scss";
import React from "react";
import Header from "../header";

interface Props {
  withHeader?: boolean;
  children: React.ReactNode;
}

PageWrapper.defaultProps = {
  withHeader: false,
} as Partial<Props>;

export default function PageWrapper(props: Props) {
  return (
    <div className="page-wrapper">
      {props.withHeader && <Header />}
      <div className="page-wrapper__main">{props.children}</div>
    </div>
  );
}
