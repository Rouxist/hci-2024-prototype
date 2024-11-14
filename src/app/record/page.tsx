"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UploadImagePopup from "./imageUploadPopup";
import { Tags } from "./tags";
import { useRecords } from "../../context/RecordsContext";
import { format } from "date-fns";

const UploadPage: React.FC = () => {
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  // const [file, setFile] = useState<File | null>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State for the image URL
  const [res, setRes] = useState<string[]>([]);
  const [isExtracted, setIsExtracted] = useState(false);

  const { records, addRecord } = useRecords();

  const [problemNum, setProblemNum] = useState("");
  const [problemDesc, setProblemDesc] = useState("");

  const handleTagDelete = (index: number) => {
    setRes((prevRes) => prevRes.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const currentTime = new Date();
    const formattedTime = format(currentTime, "yyyy-MM-dd HH:mm:ss");
    if (typeof imageUrl == "string") {
      await addRecord({
        date: formattedTime,
        title: "신기능 테스트 기록 " + (records.length - 1).toString(),
        subject: "미적분",
        desc: "피드백 내용 예시",
        score: 100,
        rank: 1,
        tags: res,
        imageData: imageUrl,
        problemNum: problemNum,
        problemDesc: problemDesc,
      });

      router.push("..");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center bg-white">
        <div className="h-[93vh] w-[46vh] pt-4 bg-gray-50 shadow-lg p-4">
          {/* Score and Date Inputs */}
          <div className="overflow-x-auto whitespace-nowrap my-4">
            <ul className="flex space-x-4">
              <li className="flex flex-col items-center">
                <p className="w-[10vh] max-w-[80px] text-gray-400">점수</p>
                <div className="flex items-center justify-center mt-1 w-[10vh] max-w-[80px] h-[5vh] max-h-[45px] text-center border rounded-md bg-white">
                  <div className="flex items-center ml-3 w-full h-[3vh] text-left text-xl"></div>
                  <span className="flex items-center mr-3 pl-2 h-[3vh] text-gray-400 text-sm">
                    점
                  </span>
                </div>
              </li>
              <li className="flex flex-col items-center">
                <p className="w-[10vh] max-w-[80px] text-gray-400">등급</p>
                <div className="flex items-center justify-center mt-1 w-[10vh] max-w-[80px] h-[5vh] max-h-[45px] text-center border rounded-md bg-white">
                  <div className="flex items-center ml-3 w-full h-[3vh] text-left text-xl"></div>
                  <span className="flex items-center mr-3 pl-2 h-[3vh] text-gray-400 text-sm">
                    등급
                  </span>
                </div>
              </li>
              <li className="flex flex-col items-center">
                <p className="w-[10vh] max-w-[80px] text-gray-400">백분위</p>
                <div className="flex items-center justify-center mt-1 w-[10vh] max-w-[80px] h-[5vh] max-h-[45px] text-center border rounded-md bg-white">
                  <div className="flex items-center ml-3 w-full h-[3vh] text-left text-xl"></div>
                  <span className="flex items-center mr-3 pl-2 h-[3vh] text-gray-400 text-sm">
                    %
                  </span>
                </div>
              </li>
              <li className="flex flex-col items-center">
                <p className="w-[10vh] max-w-[80px] text-gray-400">표준점수</p>
                <div className="flex items-center justify-center mt-1 w-[10vh] max-w-[80px] h-[5vh] max-h-[45px] text-center border rounded-md bg-white">
                  <div className="flex items-center ml-3 w-full h-[3vh] text-left text-xl"></div>
                  <span className="flex items-center mr-3 pl-2 h-[3vh] text-gray-400 text-sm">
                    점
                  </span>
                </div>
              </li>
            </ul>
          </div>
          {/* Date and Time Inputs */}
          <div className="overflow-x-auto whitespace-nowrap my-4">
            <ul className="flex space-x-6">
              <li className="flex flex-col items-center">
                <p className="w-[20vh] max-w-[140px] text-gray-400">
                  응시 일자
                </p>
                <div className="flex items-center justify-center mt-1 w-[20vh] max-w-[140px] h-[5vh] p-2 text-center border rounded-md bg-white">
                  2024. 11. 14. (목)
                </div>
              </li>
              <li className="flex flex-col items-center">
                <p className="w-[13vh] max-w-[120px] text-gray-400">
                  응시 시작 시각
                </p>
                <div className="flex items-center justify-center mt-1 w-[13vh] max-w-[120px] h-[5vh] p-2 text-center border rounded-md bg-white">
                  오전 8:49
                </div>
              </li>
              <li className="flex flex-col items-center">
                <p className="w-[8vh] max-w-[70px] text-gray-400">응시 시간</p>
                <div className="flex items-center justify-center mt-1 w-[8vh] max-w-[70px] h-[5vh] p-2 text-center border rounded-md bg-white">
                  22
                  <span className="pl-2 text-gray-400">분</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-400">틀린 문제</span>
            <div className="flex items-center justify-center mt-1 w-[80px] h-[4.5vh] p-2 text-center text-gray-500 border rounded-full bg-white text-sm">
              번호 입력
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-400">피드백</span>
            <div className="mt-1 w-full p-2 h-[80px] text-sm border rounded-md bg-white text-gray-500">
              시험 운영은 계획한 대로 되었는지, 준비한 전략들은 잘 해냈는지,
              새로 알게 된 문제점은 없었는지 생각해 보세요.
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-400">복습할 문제</span>
            {!isExtracted || !imageUrl ? (
              <button
                className="w-full h-[25vh] shadow-sm bg-white rounded-md flex items-center justify-center text-gray-400 shadow-color-silgam animate-pulse-fast"
                onClick={() => setShowPopup(true)}
              >
                + 추가하기
              </button>
            ) : (
              <div className="bg-white rounded-b-lg">
                <div className="relative w-full h-[30vh] shadow-sm flex items-center justify-center text-gray-400">
                  <Image
                    src={imageUrl}
                    alt="uploaded_img"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                  ></Image>
                </div>
                <div className="p-2 flex flex-col bg-white rounded-b-lg h-[100%]">
                  <Tags tags={res} onDelete={handleTagDelete}></Tags>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center my-4">
            <ul className="text-sm text-gray-400 list-disc">
              <li>
                본 테스트 페이지에서는 복습할 문제 항목만 입력이 가능합니다.
              </li>
              <li>이미지를 업로드하지 않으면 기록이 저장되지 않습니다.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[46vh] h-[7vh] bg-white shadow-md">
        <button className="w-[23vh] h-[7vh] px-6 py-2 text-gray-500">
          <Link href="/">취소</Link>
        </button>
        <button
          // href="/problems"
          onClick={handleSubmit}
          className="w-[23vh] h-[7vh] px-6 py-2 text-blue-500"
        >
          저장
        </button>
      </div>
      {showPopup ? (
        <UploadImagePopup
          setShowPopup={setShowPopup}
          setResArray={setRes}
          setIsExtracted={setIsExtracted}
          setParentImageUrl={setImageUrl}
          setProblemNum={setProblemNum}
          setProblemDesc={setProblemDesc}
        ></UploadImagePopup>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UploadPage;
