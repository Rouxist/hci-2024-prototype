"use client";
import { useState } from "react";
import Link from "next/link";
import { useRecords } from "../context/RecordsContext";
import { ExamData } from "@/interfaces/examData";

function rankColorSelector(rank: number) {
  if (rank === 0) {
    return "border-r-2 border-black";
  } else if (rank === 1) {
    return "border-r-2 border-purple-500";
  } else if (rank === 2) {
    return "border-r-2 border-blue-500";
  } else if (rank === 3) {
    return "border-r-2 border-green-500";
  } else if (rank === 4) {
    return "border-r-2 border-yellow-500";
  } else {
    return "border-r-2 border-redblue-500";
  }
}

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("미적분");
  const { records } = useRecords();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center bg-white">
        <div className="flex flex-col h-[93vh] w-[46vh] pt-16 bg-gray-100 shadow-lg">
          {/* Header */}
          <header className="flex items-center justify-between mb-4 h-[3vh] px-4">
            <h1 className="text-2xl font-bold">기록</h1>
            <button className="text-gray-500">↻</button>
          </header>
          {/* Search Bar */}
          <div className="flex items-center p-2 h-[5vh] max-h-[45px] text-gray-400 border rounded-md bg-gray-200 mx-4">
            제목, 피드백 검색
          </div>
          {/* Tabs */}
          <div className="flex gap-2 my-4 overflow-x-scroll mx-4">
            <button className="flex items-center text-gray-500 border border-gray-300 rounded-full px-3 py-1">
              ↻
            </button>
            <button className="flex items-center text-gray-500 border border-gray-300 rounded-full px-3 py-1 mr-4">
              최신순
            </button>
            <button
              onClick={() => setSelectedTab("언어와 매체")}
              className={`px-3 py-1 rounded-full ${
                selectedTab === "언어와 매체"
                  ? "bg-color-language text-white"
                  : "bg-gray-100 text-color-language border border-1 border-color-language"
              }`}
            >
              언어와 매체
            </button>
            <button
              onClick={() => setSelectedTab("미적분")}
              className={`px-3 py-1 rounded-full ${
                selectedTab === "미적분"
                  ? "bg-color-mathematics-300 text-white"
                  : "bg-gray-100 text-color-mathematics-300 border border-1 border-color-mathematics-300"
              }`}
            >
              미적분
            </button>
          </div>
          {/* Record List */}
          <div className="flex-grow space-y-4 px-4">
            {records
              .filter((record: ExamData) => record.subject === selectedTab)
              .map((record: ExamData, index: number) => (
                <div
                  key={index}
                  className={`bg-white p-4 h-[10vh] flex justify-between border-r-2 ${rankColorSelector(
                    record.rank
                  )}`}
                >
                  <div>
                    <div className="text-gray-400 text-xs">{record.date}</div>
                    <div className="flex flex-row items-end">
                      <h3 className="text-xl font-semibold leading-tight mt-1 mb-[-1px] mr-1">
                        {record.title}
                      </h3>
                      <div
                        className={`text-xs ${
                          selectedTab === "미적분"
                            ? "text-color-mathematics-300"
                            : "text-color-language"
                        }`}
                      >
                        {record.subject}
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                      {record.desc}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-row items-end">
                      <span className="text-xl mr-1">{record.score}</span>
                      <span className="text-md text-gray-500">점</span>
                    </div>
                    <div className="flex flex-row items-end">
                      <span className="text-xl mr-1">{record.rank}</span>
                      <span className="text-md text-gray-500">등급</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <h1 className="w-full text-gray-400 flex justify-center">
            본 테스트 페이지에서 시험 기록은 클릭이 되지 않습니다.
          </h1>
          <div className="flex justify-end items-end h-[8vh]">
            <Link
              className="bg-color-silgam text-4xl text-white rounded-full w-[6vh] h-[6vh] m-2 flex items-center justify-center shadow-lg shadow-color-silgam animate-pulse-fast"
              href="/record"
            >
              +
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-[46vh] h-[7vh] bg-white shadow-md">
        <Link
          className="flex justify-center items-center w-[23vh]  animate-pulse-fast"
          href="/problems"
        >
          문제 모아보기
        </Link>
      </div>
    </div>
  );
}
