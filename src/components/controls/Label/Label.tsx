import classNames from "classnames";
import React from "react";
import { BaseControlProps } from "../../../utils/utils";

export interface LabelProps extends BaseControlProps {}

export class Label extends React.Component<LabelProps> {
  render() {
    const { className, style, children } = this.props;
    return (
      <label className={classNames("form-label", className)} style={style}>
        {children}
      </label>
    );
  }
}
