"use client";
import Image from "next/image";
import { Tags } from "./tags";
import { ExamData } from "@/interfaces/examData";

type ProblemListProps = {
  selectedSubject: string;
  selectedTag: string;
  records: ExamData[];
  setShowPopup: (showPopup: boolean) => void;
  setProblemIdxToShow: (idx: number) => void;
};

const ProblemList: React.FC<ProblemListProps> = ({
  selectedSubject,
  selectedTag,
  records,
  setShowPopup,
  setProblemIdxToShow,
}) => {
  const handleCardClick = (showPopup: boolean, index: number) => {
    setShowPopup(true);
    setProblemIdxToShow(index);
  };

  return (
    <div className="flex-grow h-[1vh] w-full space-y-4 p-4 overflow-y-auto">
      {records
        .filter(
          (record) =>
            record.subject === selectedSubject &&
            record.tags.includes(selectedTag) &&
            record.imageData.length > 0
        )
        .map((record, index) => (
          <div key={index}>
            <div className="flex flex-row items-end">
              <h3 className="text-2xl font-semibold leading-tight mt-1 mr-2">
                {record.title}
              </h3>
              <div className="text-color-mathematics-300 text-md">
                {record.subject}
              </div>
            </div>
            <div
              className="relative w-full h-[250px] shadow-sm flex items-center justify-center text-gray-400"
              onClick={() =>
                handleCardClick(
                  true,
                  records.findIndex((element) => element.title === record.title)
                )
              }
            >
              <Image
                src={record.imageData}
                alt="uploaded_img"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-t-lg"
              ></Image>
            </div>
            <div className="p-2 bg-white h-[100%] rounded-b-lg">
              <h1 className="text-xl font-bold">{record.problemNum}번</h1>
              <h2 className="text-xl mb-2">
                {record.problemDesc.slice(0, 23)}
              </h2>
              <Tags tags={record.tags}></Tags>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProblemList;
