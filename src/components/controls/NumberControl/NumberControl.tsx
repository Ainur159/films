import classNames from "classnames";
import { autobind } from "core-decorators";
import React, { ChangeEventHandler } from "react";
import { BaseControlProps, BaseControlState, parseToInt } from "../../../utils/utils";

export interface NumberControlProps extends BaseControlProps {
  value?: number;
  onChange?: (value?: number) => void;
  placeholder?: string;
  realTime?: boolean;
  min?: number;
  max?: number;
}

export interface NumberControlState  extends BaseControlState<number> {}

export class NumberControl extends React.Component<NumberControlProps, NumberControlState> {
  inputRef?: HTMLInputElement;

  constructor(props: NumberControlProps) {
    super(props);

    this.state = {
      value: 0,
    }
  }

  componentDidMount(): void {
    this.setState({value: this.props.value || this.props.min || 0})
  }

  componentWillReceiveProps(nextProps: Readonly<NumberControlProps>, nextContext: any): void {
    this.setState({value: nextProps.value || nextProps.min || 0})
  }

  @autobind
  onBlur(e: React.FocusEvent<HTMLInputElement>) {
    this.props.onChange && this.props.onChange(this.state.value);
  }

  @autobind
  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseToInt(e.target.value || "") || 0;
    this.setState({value});
  }
  
  render() {
    const {style, min, max, children, realTime, disabled, readonly = false, className, value = "", placeholder} = this.props;
    return (
      <input
        ref={ref => ref && (this.inputRef = ref)}
        type={"number"}
        value={this.state.value}
        className={classNames("form-control", className)}
        placeholder={placeholder}
        onChange={this.onChange}
        disabled={disabled}
        readOnly={readonly}
        onBlur={this.onBlur}
        min={min}
        max={max}
      />
    )
  }
}