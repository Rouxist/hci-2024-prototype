"use client";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import ProblemList from "./recordList";
import { useRecords } from "../../context/RecordsContext";
import ProblemPopup from "./problemPopup";
import { ExamData } from "@/interfaces/examData";

const surveyUrl = process.env.NEXT_PUBLIC_SURVEY_URL as string;

export default function Problems() {
  const [subject, setSubject] = useState("미적분");
  const [tag, setTag] = useState("");

  const subjects = ["언어와매체", "미적분"];
  const { records, updateRecord } = useRecords();
  const allTags = records.map((value: ExamData) => value.tags);
  const tags = Array.from(new Set(allTags.flat()));

  // Popup
  const [showPopup, setShowPopup] = useState(false);
  const [problemIdxToShow, setProblemIdxToShow] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col h-[93vh] w-[46vh] pt-16 bg-gray-50 shadow-lg p-4">
          <div className="flex items-center mb-6">
            <Link className="mr-3" href="/">
              <FiArrowLeft
                className="h-6 w-6 text-black animate-pulse-fast"
                color="black"
              />
            </Link>
            <h1 className="text-2xl h-sm:text-xl font-semibold">
              틀린 문제 모아보기
            </h1>
          </div>
          <h1 className="pb-2">기록한 문제 개수 : {records.length - 2} 개</h1>

          {/* Dropdowns */}
          <div className="flex gap-6 pb-8">
            {/* Subject Dropdown */}
            <div className="w-1/2">
              <label className="block mb-2 text-gray-700">과목</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {subjects.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag Dropdown */}
            <div className="w-1/2">
              <label className="block mb-2 text-gray-700">태그</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">태그 선택하기</option>
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col h-[100%] justify-center items-center">
            <ProblemList
              selectedSubject={subject}
              selectedTag={tag}
              records={records}
              setShowPopup={setShowPopup}
              setProblemIdxToShow={setProblemIdxToShow}
            ></ProblemList>
          </div>
        </div>
        <div className="flex justify-center  h-sm:text-sm w-[46vh] h-[7vh] bg-white shadow-md whitespace-nowrap overflow-hidden z-10">
          <Link
            className="flex justify-center items-center text-center text-color-silgam font-bold w-[23vh] animate-pulse-fast"
            href={surveyUrl}
          >
            사후 조사 바로 참여하기 <br />
            (사후 조사에 참여해야 테스트가 완료됩니다.)
          </Link>
        </div>
      </div>
      {showPopup ? (
        <ProblemPopup
          setShowPopup={setShowPopup}
          recordInfo={records[problemIdxToShow]}
          problemIdx={problemIdxToShow}
          title={records[problemIdxToShow].title}
          imageData={records[problemIdxToShow].imageData}
          keywords={records[problemIdxToShow].tags}
          problemNum={records[problemIdxToShow].problemNum}
          problemDesc={records[problemIdxToShow].problemDesc}
          updateRecord={updateRecord}
        ></ProblemPopup>
      ) : (
        <></>
      )}
    </div>
  );
}
