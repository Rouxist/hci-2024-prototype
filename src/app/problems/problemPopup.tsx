"use client";
import Image from "next/image";
import { useState } from "react";
import { ExamData } from "@/interfaces/examData";
import { Tags } from "../record/tags";

type ProblemPopupProps = {
  setShowPopup: (show: boolean) => void;
  recordInfo: ExamData;
  problemIdx: number;
  title: string;
  imageData: string;
  keywords: string[];
  problemNum: string;
  problemDesc: string;
  updateRecord: (index: number, newData: Partial<ExamData>) => void;
};

const ProblemPopup: React.FC<ProblemPopupProps> = ({
  setShowPopup,
  recordInfo,
  problemIdx,
  updateRecord,
}) => {
  const [selectedTagIdxToDelete, setSelectedTagIdxToDelete] = useState(3);
  const [keywordArray, setKeywordArray] = useState(recordInfo.tags);

  const handleTagDelete = (index: number) => {
    setSelectedTagIdxToDelete(index);
    setKeywordArray((prevRes) => prevRes.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedTagIdxToDelete != 3) {
      updateRecord(problemIdx, {
        tags: recordInfo.tags.filter(
          (t: string, i: number) => i != selectedTagIdxToDelete
        ),
      });
    }
    setShowPopup(false);
  };

  return (
    <div className="fixed h-screen w-[46vh] flex flex-col items-center justify-center">
      <div className="fixed h-screen w-[46vh] bg-black opacity-50"></div>
      <div className="flex flex-col fixed pt-4 pb-2 px-6 w-[36vh] h-[70vh] min-h-[600px] bg-gray-50 rounded-md shadow-xl">
        <div className="flex-grow w-full h-[65vh] min-h-[400px] overflow-y-scroll">
          <h1 className="text-2xl h-sm:text-xl font-bold">
            {recordInfo.title}
          </h1>
          <h3 className="text-base h-sm:text-sm text-gray-500 mt-4">
            문제 정보
          </h3>
          <h1 className="text-xl h-sm:text-base font-bold">
            {recordInfo.problemNum}번
          </h1>
          <h1 className="text-xl h-sm:text-base">{recordInfo.problemDesc}</h1>
          <h3 className="text-base h-sm:text-sm text-gray-500 mt-4">
            문제 사진
          </h3>
          <div className="flex-grow relative w-full min-h-[150px] shadow-sm flex items-center justify-center text-gray-400">
            <Image
              src={recordInfo.imageData}
              alt="uploaded_img"
              fill
              style={{ objectFit: "cover" }}
            ></Image>
          </div>
          <h3 className="text-base h-sm:text-sm text-gray-500 mt-4">태그</h3>
          <Tags tags={keywordArray} onDelete={handleTagDelete}></Tags>
          <div className="flex justify-center my-2 px-6">
            <ul className="text-sm h-sm:text-xs text-gray-400 list-disc">
              <li>
                문제 사진으로부터 AI를 사용해 생성한 태그입니다. 잘못 생성된
                태그가 있다면 삭제해주세요.
              </li>
              <li>
                태그를 직접 작성해서 업로드하는 기능은 구현되지 않았습니다 🥲
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="mx-8 text-gray-500"
            onClick={() => setShowPopup(false)}
          >
            취소
          </button>
          <button
            className="mx-8 my-1 w-[6vh] h-[6vh] text-xl text-color-silgam"
            onClick={handleSubmit}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemPopup;
