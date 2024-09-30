'use client';

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export const ShotSelector = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <p className="text-xl font-semibold text-gray-700 mb-4">Shot Number</p>
      <Slider
        min={1}
        max={8}
        step={1}
        value={[value]}
        onValueChange={(values) => setValue(values[0])}
      />
      <div className="text-center mt-2">
        Selected shot: {value}
      </div>
    </div>
  );
};
