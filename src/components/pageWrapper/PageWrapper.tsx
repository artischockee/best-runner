import { css } from "@emotion/core";
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
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: inherit;
      `}
    >
      {props.withHeader && <Header />}
      {props.children}
    </div>
  );
}
