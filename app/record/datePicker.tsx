"use client";

import { Dispatch, SetStateAction } from "react";

import { DayPicker } from "react-day-picker";

interface DatePickerProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

export function DatePicker(props: DatePickerProps) {
  return (
    <DayPicker
      mode="single"
      selected={props.date}
      onSelect={props.setDate}
    />
  );
}
