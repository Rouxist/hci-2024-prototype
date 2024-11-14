"use client";

type Props = {
  tags: string[];
};

export function Tags({ tags }: Props) {
  if (typeof tags == "object") {
    return (
      <div className="">
        {tags.map((tag) => (
          <div
            className="inline-flex items-center py-1 px-2 min-w-10 mr-2 mb-1 text-md font-mono bg-color-mathematics rounded-full text-white w-fit whitespace-nowrap inline-block hover:border-black"
            key={"tag_" + tag}
          >
            <div>{tag}</div>
          </div>
        ))}
      </div>
    );
  }
}
