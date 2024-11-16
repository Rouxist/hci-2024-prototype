"use client";

type Props = {
  tags: string[];
};

export function Tags({ tags }: Props) {
  const bgColors = [
    "bg-color-mathematics-300",
    "bg-color-mathematics-200",
    "bg-color-mathematics-100",
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
            <div>{tag}</div>
          </div>
        ))}
      </div>
    );
  }
}
