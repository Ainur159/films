import classNames from "classnames";
import { autobind } from "core-decorators";
import React, { ChangeEventHandler } from "react";
import { BaseControlProps, BaseControlState } from "../../../utils/utils";

export interface TextControlProps extends BaseControlProps {
  value?: string;
  onChange?: (value?: string) => void;
  placeholder?: string;
  realTime?: boolean;
}

export interface TextControlState extends BaseControlState<string> {}

export class TextControl extends React.Component<TextControlProps, TextControlState> {
  inputRef?: HTMLInputElement;

  constructor(props: TextControlProps) {
    super(props);

    this.state = {
      value: "",
    };
  }

  componentDidMount(): void {
    this.setState({value: this.props.value || ""})
  }

  componentWillReceiveProps(nextProps: Readonly<TextControlProps>, nextContext: any): void {
    this.setState({value: nextProps.value || ""}) 
  }  
  

  @autobind
  onBlur(e: React.FocusEvent<HTMLInputElement>) {
    this.props.onChange && this.props.onChange(this.state.value);
  }

  @autobind
  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value || "";
    this.setState({value});
  }
  
  render() {
    const {style, children, realTime, disabled, readonly = false, className, value = "", placeholder} = this.props;
    return (
      <input
        ref={ref => ref && (this.inputRef = ref)}
        type={"text"}
        style={style}
        value={this.state.value}
        className={classNames("form-control", className)}
        placeholder={placeholder}
        onChange={this.onChange}
        disabled={disabled}
        readOnly={readonly}
        onBlur={this.onBlur}
      />
    )
  }
}