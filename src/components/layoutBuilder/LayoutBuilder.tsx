import React, { Suspense } from "react";
import { Router } from "../../services/router/types";
import PageWrapper from "../pageWrapper";

interface Props extends Router.RouteComponentProps {
  component: Router.RouteComponent;
  componentSettings: Router.ComponentSettings;
}

export default function LayoutBuilder(props: Props) {
  const { component: Component, componentSettings } = props;

  function renderBasingOnSettings() {
    const component = <Component subRoutes={props.subRoutes} />;

    if (componentSettings.usePageWrapper) {
      return <PageWrapper withHeader={componentSettings.useHeader}>{component}</PageWrapper>;
    }

    return component;
  }

  // TODO: fallback
  return <Suspense fallback={<p>Loading</p>}>{renderBasingOnSettings()}</Suspense>;
}
