"use client";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import ProblemList from "./recordList";
import { useRecords } from "../../context/RecordsContext";
import ProblemPopup from "./problemPopup";

export default function Problems() {
  const [subject, setSubject] = useState("미적분");
  const [tag, setTag] = useState("");

  const subjects = ["언어와매체", "미적분", "사회문화"];
  const tags = [
    "구간별로 정의된 함수",
    "그래프로 둘러싸인 넓이",
    "그래프의 교점 개수",
    "등차수열",
    "로그함수",
    "미분가능성",
    "사인법칙과 코사인법칙",
    "삼각함수",
    "수열의 귀납적 정의",
    "수열의 합",
    "수직선 상의 운동",
    "외접원과 내접원",
    "절댓값 함수",
    "접선의 방정식",
    "정적분",
    "정적분으로 정의된 함수",
    "지수함수",
    "함수의 극한",
    "함수의 연속성",
    "함수의 추론",
  ];

  const { records, updateRecord } = useRecords();

  // Popup
  const [showPopup, setShowPopup] = useState(false);
  const [problemIdxToShow, setProblemIdxToShow] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center bg-white">
        <div className="flex flex-col h-screen w-[46vh] pt-16 bg-gray-50 shadow-lg p-4">
          <div className="flex items-center mb-6">
            <Link className="mr-3" href="/">
              <FiArrowLeft
                className="h-6 w-6 text-black animate-pulse-fast"
                color="black"
              />
            </Link>
            <h1 className="text-2xl font-semibold">틀린 문제 모아보기</h1>
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
            {!tag ? (
              <h1 className="text-gray-500">태그를 선택해주세요</h1>
            ) : (
              <ProblemList
                selectedSubject={subject}
                selectedTag={tag}
                records={records}
                setShowPopup={setShowPopup}
                setProblemIdxToShow={setProblemIdxToShow}
              ></ProblemList>
            )}
          </div>
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
