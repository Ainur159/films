import classNames from "classnames";
import { autobind } from "core-decorators";
import React from "react";
import { BaseControlProps } from "../../../utils/utils";
import "./Button.less";

export interface ButtonProps extends BaseControlProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  primary?: boolean;
  danger?: boolean;
  withoutBack?: boolean;
  asCircle?: boolean;
  withoutBorder?: boolean;
  size?: "sm" | "lg";
}

export class Button extends React.Component<ButtonProps> {
  @autobind
  onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.props.onClick && this.props.onClick(e);
  }

  get buttonClassName(): string {
    const { primary, danger, size, withoutBack, asCircle, disabled, withoutBorder } = this.props;
    let buttonClass;
    if (primary) {
      buttonClass = withoutBack ? "btn-outline-primary" : "btn-primary";
    } else if (!primary && danger) {
      buttonClass = withoutBack ? "btn-outline-danger" : "btn-danger";
    } else {
      buttonClass = withoutBack ? "btn-outline-secondary" : "btn-secondary";
    }
    return classNames("btn", `btn-${size || "sm"}`, asCircle && "rounded-circle", disabled && "disabled", withoutBorder && "border-0", buttonClass);
  }

  render() {
    const { className, style, children } = this.props;
    const buttonClass = classNames(className, this.buttonClassName);
    return (
      <button onClick={this.onClick} className={buttonClass} style={style}>
        {children}
      </button>
    );
  }
}
