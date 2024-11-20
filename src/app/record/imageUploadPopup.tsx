"use client";
import Image from "next/image";
import { ChangeEvent, useState, useRef } from "react";
import { ProblemInfo } from "@/interfaces/problemInfo";
import { FiX } from "react-icons/fi";

type UploadImagePopupProps = {
  setShowPopup: (show: boolean) => void;
  setResArray: (resArray: string[]) => void;
  setIsExtracted: (isExtracted: boolean) => void;
  setParentImageUrl: (imageUrl: null | string) => void;
  setProblemNum: (problemNum: string) => void;
  setProblemDesc: (problemDesc: string) => void;
};

const UploadImagePopup: React.FC<UploadImagePopupProps> = ({
  setShowPopup,
  setResArray,
  setIsExtracted,
  setParentImageUrl,
  setProblemNum,
  setProblemDesc,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State for the image URL
  const [res, setRes] = useState<string[]>([]);
  const [extractionStatus, setExtractionStatus] = useState<string>("");

  const [problemInfo, setProblemInfo] = useState<ProblemInfo>({
    problemNum: "",
    problemDesc: "",
  });

  const handleExamDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProblemInfo({
      ...problemInfo,
      [name]: value,
    });
  };

  // Uploading image
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const url = URL.createObjectURL(uploadedFile); // Create a URL for the file
      setImageUrl(url); // Set the image URL state
      setParentImageUrl(url);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (
      file &&
      problemInfo.problemNum.length > 0 &&
      problemInfo.problemDesc.length > 0
    ) {
      formData.append("file", file); // Append the file to FormData
    } else {
      setExtractionStatus("제목, 메모와 사진을 모두 입력해주세요.");
      return;
    }

    try {
      setRes([]);
      setExtractionStatus(
        "(키워드 추출은 5초 가량 소요될 수 있습니다. 잠시 기다려주세요.)"
      );

      const response = await fetch("/api/proxy?endpoint=get_keywords", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRes(data);
      setExtractionStatus("");
      setShowPopup(false);
      setIsExtracted(true);
      setResArray(data);
      setProblemNum(problemInfo.problemNum);
      setProblemDesc(problemInfo.problemDesc);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="fixed h-screen w-[46vh] flex flex-col items-center justify-center">
      <div className="fixed h-screen w-[46vh] bg-black opacity-50"></div>
      <div className="flex flex-col fixed w-[36vh] h-[40vh] min-h-[425px] bg-gray-50 rounded-md shadow-xl">
        <div className="flex-grow p-6">
          <h1 className="text-xl h-sm:text-base">복습할 문제 추가</h1>
          <h3 className="text-xs text-gray-500">
            (제목, 메모 모두 입력해주세요.)
          </h3>
          <form>
            <input
              type="text"
              name="problemNum"
              value={problemInfo.problemNum}
              onChange={handleExamDataChange}
              className="flex items-center justify-start my-2 w-full h-[4vh] px-4 h-sm:px-2 text-sm text-gray-500 border rounded-md bg-white"
              placeholder="제목 (문제 번호)"
            />
            <textarea
              name="problemDesc"
              value={problemInfo.problemDesc}
              onChange={handleExamDataChange}
              className="flex items-center justify-start my-2 w-full h-[7vh] min-h-[75px] p-2 px-4 h-sm:px-2 text-sm text-gray-500 border rounded-md bg-white  resize-none"
              placeholder="메모 (이 문제를 틀린 이유, 복습할 점을 적어보세요.)"
            />
          </form>

          <h3 className="text-sm text-gray-500">사진</h3>
          <h3 className="text-xs text-gray-500">
            (한 장의 이미지까지만 업로드 가능합니다.)
          </h3>
          <div>
            <div
              className="relative flex items-center justify-center my-1 w-[6vh] h-[6vh] text-xl font-thin text-gray-400 border rounded-md bg-white shadow-color-silgam animate-pulse-fast"
              onClick={() => {
                if (!imageUrl) {
                  fileInputRef.current?.click();
                }
              }}
            >
              {imageUrl ? (
                <div className="relative w-full h-[6vh] rounded-md">
                  <div
                    className="absolute text-black z-10"
                    onClick={() => {
                      setImageUrl(null);
                      setParentImageUrl(null);
                    }}
                  >
                    <FiX />
                  </div>
                  <Image
                    src={imageUrl}
                    alt="uploaded_img"
                    fill
                    style={{ objectFit: "cover" }}
                  ></Image>
                </div>
              ) : (
                <h1>+</h1>
              )}
            </div>
            <input
              className="hidden"
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex justify-center min-h-[2rem] text-gray-400 px-6 text-sm h-sm:text-xs">
          {extractionStatus}
        </div>
        <div className="flex justify-center text-gray-500 px-6">{res}</div>
        <div className="flex justify-end">
          <button
            className="mx-8 text-gray-500 text-xl h-sm:text-base"
            onClick={() => setShowPopup(false)}
          >
            취소
          </button>
          <button
            className={`mx-8 my-1 w-[6vh] h-[6vh] text-xl h-sm:text-base text-color-silgam ${
              typeof imageUrl === "string" ? "animate-pulse-fast" : ""
            }`}
            onClick={handleUpload}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImagePopup;
