import React from "react";
import { Label } from "../controls/Label/Label";
import { lazyInject } from "../inject/inject";
import { AppStore, APP_STORE_IDENITIFER } from "../store/AppStore";

export interface PageNameProps {
  
}

export class PageName extends React.Component<PageNameProps> {

  @lazyInject(APP_STORE_IDENITIFER)
  appStore?: AppStore;
  
  get pageName() {
    return this.appStore?.pageName;
  }

  render() {
    return (
      <div className="page-name">
        <Label className="fs-3">{this.pageName}</Label>
      </div>
    );
  }
}
