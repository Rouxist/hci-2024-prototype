"use client";

type Props = {
  tags: string[];
  onDelete: (index: number) => void;
};

export function Tags({ tags, onDelete }: Props) {
  if (typeof tags == "object") {
    return (
      <div className="">
        {tags.map((tag, idx) => (
          <div
            className="inline-flex items-center py-1 px-2 min-w-10 mr-2 mb-1 text-md font-mono bg-color-mathematics rounded-full text-white w-fit whitespace-nowrap inline-block"
            key={"tag_" + tag}
          >
            <div className="inline-block">{tag}</div>
            <div
              className="inline-block w-4 h-4 opacity-75 rounded-full flex items-center justify-center ml-1 bg-white text-color-mathematics font-bold w-[1rem]"
              onClick={() => onDelete(idx)}
            >
              &#x2715;
            </div>
          </div>
        ))}
      </div>
    );
  }
}
