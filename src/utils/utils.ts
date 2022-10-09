import React, { ReactNode } from "react";
import { IOption } from "../components/controls/SelectControl/SelectControl";

export interface BaseControlProps {
  children?: JSX.Element | JSX.Element[] | string | ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  readonly?: boolean;
}

export interface BaseControlState<T> {
  value?: T;
}

export const GENRES = [
  {value: "mult", name: "Мультфильмы"},
  {value: "horor", name: "Ужасы"},
  {value: "comedy", name: "Комедия"},
  {value: "war", name: "Боевик"},
  {value: "rus", name: "Русский"},
  {value: "serial", name: "Сериал"},
] as IOption[]

export function parseToInt(value: any, radix: number = 10): number | undefined {
  const res = parseInt(value, radix)
  if (isNaN(res)) {
    return undefined;
  }
  return res;
}