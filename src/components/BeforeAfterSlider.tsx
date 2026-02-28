"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";

export default function BeforeAfterSlider() {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
            alt="Dirty grill grates before professional cleaning in Cincinnati"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80"
            alt="Clean grill grates after professional cleaning service"
          />
        }
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              backdropFilter: undefined,
              background: "#f97316",
              border: 0,
              color: "#fff",
              width: 40,
              height: 40,
              borderRadius: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            linesStyle={{
              width: 3,
              color: "#f97316",
            }}
          />
        }
        position={50}
        style={{ aspectRatio: "16/10" }}
      />
      <div className="flex justify-between px-4 py-2 bg-gray-900 text-sm font-semibold">
        <span className="text-red-400">Before</span>
        <span className="text-green-400">After</span>
      </div>
    </div>
  );
}
