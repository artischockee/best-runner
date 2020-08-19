import React from "react";

export default class AppHooks {
  static useConsoleReport() {
    React.useEffect(() => {
      console.group("BestRunner");
      console.log("Demo application");
      console.log(`Version ${process.env.REACT_APP_VERSION}`);
      console.log('Artem "artischocke" Piskarev');
      console.groupEnd();
    }, []);
  }
}
