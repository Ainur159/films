import classNames from "classnames";
import { autobind } from "core-decorators";
import React from "react";
import { BaseControlProps } from "../../../utils/utils";
import "./Modal.less";

export interface ModalProps extends BaseControlProps {
  onClose?: () => void;
  customButtons?: JSX.Element[];
  header?: string;
}

export class Modal extends React.Component<ModalProps> {
  modalContainerRef?: HTMLDivElement;

  componentDidMount(): void {}

  @autobind
  onClose() {
    this.props.onClose && this.props.onClose();
  }

  @autobind
  onApply() {
    this.onClose();
  }

  render() {
    const { className, style, children, header, customButtons } = this.props;
    return (
      <div ref={(ref) => ref && (this.modalContainerRef = ref)}>
        <div
          className={classNames("modal", "fade", className)}
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{header}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={this.onClose}
                ></button>
              </div>
              <div className="modal-body">{children}</div>
              {customButtons?.length && (
                <div className="modal-footer">{customButtons}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
