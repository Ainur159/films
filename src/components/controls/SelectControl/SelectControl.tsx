import classNames from "classnames";
import { autobind } from "core-decorators";
import React, { ChangeEventHandler } from "react";
import { BaseControlProps, BaseControlState } from "../../../utils/utils";

export interface SelectControlProps extends BaseControlProps {
  options?: IOption[];
  value?: string[];
  onChange?: (value?: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  size?: number;
}

export interface SelectControlState extends BaseControlState<string[]> {}

export interface IOption {
  value: string;
  name: string;
}

export class SelectControl extends React.Component<
  SelectControlProps,
  SelectControlState
> {
  constructor(props: SelectControlProps) {
    super(props);
    this.state = {
      value: undefined,
    };
  }

  componentDidMount(): void {
    this.setState({ value: this.props.value });
  }

  componentWillReceiveProps(
    nextProps: Readonly<SelectControlProps>,
    nextContext: any
  ): void {
    this.setState({ value: nextProps.value });
  }

  @autobind
  onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value: baseValue = [], onChange } = this.props;
    const value: string | undefined = e.target.value;
    let values = [...baseValue];
    const index = values.findIndex((el) => el === value);
    if (value === "default") {
      values = [];
    } else if (index < 0) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }
    onChange && onChange(values);
  }

  render() {
    const {
      style,
      children,
      options = [],
      disabled,
      readonly,
      className,
      value,
      placeholder = "Выберите элемент",
      multiple,
      size = 4,
    } = this.props;
    return (
      <select
        style={{ overflow: options.length + 1 === size ? "hidden" : undefined }}
        className={classNames("form-select", className)}
        disabled={disabled}
        value={value}
        onChange={this.onChange}
        multiple={multiple}
        size={size}
      >
        <option key="undefined-value" value={"default"}>
          <b>{placeholder}</b>
        </option>
        {options.map((el) => {
          return (
            <option key={el.value} value={el.value}>
              {el.name}
            </option>
          );
        })}
      </select>
    );
  }
}
