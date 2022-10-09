import React from "react";
import { Label } from "../controls/Label/Label";
import moment from "moment";

export interface PageClockProps {}

export class PageClock extends React.Component<PageClockProps> {
  
  timeValue: string = ""

  timeInterval: any

  componentDidMount(): void {
    this.timeInterval = setInterval(() => {
      this.resetTime();
    }, 60*1000);
    this.resetTime();
  }

  componentDidUpdate(prevProps: Readonly<PageClockProps>, prevState: Readonly<{}>, snapshot?: any): void {
    this.timeInterval && clearInterval(this.timeInterval);
  }

  resetTime() {
    this.timeValue = moment().format("HH:mm D MMM YYYY года");
    this.forceUpdate();
  }

  render() {
    return (
      <div className="page-clock">
        <Label className="fs-5">{this.timeValue}</Label>
      </div>
    );
  }
}
