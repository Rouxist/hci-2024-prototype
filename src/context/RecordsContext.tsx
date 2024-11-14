"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ExamData } from "@/interfaces/examData";
// Define the context structure
type RecordsContextType = {
  records: ExamData[];
  updateRecord: (index: number, newData: Partial<ExamData>) => void;
  addRecord: (newRecord: ExamData) => void;
};

// Create the context with an initial value of `undefined`
const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

// Define the provider component's props
type RecordsProviderProps = {
  children: ReactNode;
};

// RecordsProvider component to manage and provide the records context
export const RecordsProvider = ({ children }: RecordsProviderProps) => {
  const [records, setRecords] = useState<ExamData[]>([
    {
      date: "2024-11-01 10:30:00",
      title: "미적분 기록 예시 1",
      subject: "미적분",
      desc: "피드백 내용 예시",
      score: 92,
      rank: 1,
      tags: [],
      imageData: "",
      problemNum: "",
      problemDesc: "",
    },
    {
      date: "2024-11-03 11:45:25",
      title: "미적분 기록 예시 2",
      subject: "미적분",
      desc: "피드백 내용 예시",
      score: 85,
      rank: 2,
      tags: [],
      imageData: "",
      problemNum: "",
      problemDesc: "",
    },
  ]);

  // Function to update a record by merging `newData` into the record at the specified `index`
  const updateRecord = (index: number, newData: Partial<ExamData>) => {
    setRecords((prevRecords) =>
      prevRecords.map((record, i) =>
        i === index ? { ...record, ...newData } : record
      )
    );
  };

  const addRecord = async (newRecord: ExamData) => {
    setRecords((prevRecords) => [...prevRecords, newRecord]);
  };

  return (
    <RecordsContext.Provider value={{ records, updateRecord, addRecord }}>
      {children}
    </RecordsContext.Provider>
  );
};

// Custom hook to use the RecordsContext in components
export const useRecords = (): RecordsContextType => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return context;
};
