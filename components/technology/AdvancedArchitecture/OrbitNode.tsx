import React from "react";
import { OrbitingNodeData } from "./constants";
import { handleMouseEnter, handleMouseLeave } from "./utils";

interface OrbitNodeProps {
  node: OrbitingNodeData;
}

export default function OrbitNode({ node }: OrbitNodeProps) {
  const isCol = node.layout === "col";
  const isRowReverse = node.layout === "row-reverse";

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 scale-[0.65] sm:scale-75 md:scale-90 xl:scale-100"
      style={{ left: node.pos.left, top: node.pos.top }}
    >
      <div className="orbit-node-inner relative group ">
        {/* Icon Container (Anchor Point) */}
        <div className="node-icon-container w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#FFF0F0] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300">
          <node.icon className="w-5 h-5 md:w-6 md:h-6 text-brand-red" />
        </div>

        {/* Label (Positioned relative to Icon center) */}
        <span
          className={`font-body font-normal text-[13px] md:text-[14px] text-[#444444] leading-tight absolute max-sm:w-25 md:whitespace-nowrap md:text-nowrap  ${
            isCol
              ? "top-[-8px] left-1/2 -translate-x-1/2 -translate-y-full pb-2 text-center"
              : isRowReverse
                ? "right-full mr-4 top-1/2 -translate-y-1/2 text-right"
                : "left-full ml-4 top-1/2 -translate-y-1/2 text-left"
          }`}
        >
          {node.label}
        </span>
      </div>
    </div>
  );
}
