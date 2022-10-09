import { autobind } from "core-decorators";
import React from "react";
import { BaseControlProps, BaseControlState } from "../../../utils/utils";
import { Button } from "../Button/Button";
import "./FileUploader.less";

export interface FileUploaderProps extends BaseControlProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

export interface FileUploaderState extends BaseControlState<string[]> {}

export class FileUploader extends React.Component<
  FileUploaderProps,
  FileUploaderState
> {
  inputRef?: HTMLInputElement;

  constructor(props: FileUploaderProps) {
    super(props);
    this.state = {
      value: [],
    };
  }

  @autobind
  btnClick(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.inputRef && $(this.inputRef).trigger("click");
    e?.stopPropagation();
  }

  get imagesPath() {
    return "";
  }

  @autobind
  handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    let fileList = e.target.files || [];

    let files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    if (!files.length) {
      return;
    }

    files = files.filter((file) => {
      if (file.size === 0) {
        return false;
      } else {
        return true;
      }
    });

    this.props.onChange && this.props.onChange(files.map((file) => file.name));
  }

  render() {
    const { className, style, value = [] } = this.props;

    let a = this.imagesPath;

    return (
      <div className={className}>
        <input
          multiple={true}
          style={{ width: 0 }}
          ref={(ref) => ref && (this.inputRef = ref)}
          type={"file"}
          name="files[]"
          onChange={this.handleFileChange}
        />
        <Button primary={true} onClick={this.btnClick}>
          {"Выбрать"}
        </Button>
        <div className="images-content d-flex flex-row align-items-center justify-content-around mt-2">
          {value.map((fileName) => {
            return <img key={fileName} src={`/images/${fileName}`} />;
          })}
        </div>
      </div>
    );
  }
}
