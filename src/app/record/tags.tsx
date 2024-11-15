"use client";
import { FiX } from "react-icons/fi";

type Props = {
  tags: string[];
  onDelete: (index: number) => void;
};

export function Tags({ tags, onDelete }: Props) {
  const bgColors = [
    "bg-color-mathematics-300",
    "bg-color-mathematics-200",
    "bg-color-mathematics-100",
  ];

  const textColors = [
    "text-color-mathematics-300",
    "text-color-mathematics-200",
    "text-color-mathematics-100",
  ];

  if (typeof tags == "object") {
    return (
      <div className="">
        {tags.map((tag, idx) => (
          <div
            className={`inline-flex items-center py-1 px-2 min-w-10 mr-2 mb-1 text-md font-mono rounded-full text-white w-fit whitespace-nowrap inline-block ${
              bgColors[idx % bgColors.length]
            }`}
            key={"tag_" + tag}
          >
            <div className="inline-block">{tag}</div>
            <div
              className={`inline-block w-4 h-4 opacity-75 rounded-full flex items-center justify-center ml-1 bg-white font-bold w-[1rem] ${
                textColors[idx % textColors.length]
              }`}
              onClick={() => onDelete(idx)}
            >
              <FiX />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
