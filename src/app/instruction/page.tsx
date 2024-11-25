export default function Instruction() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center h-screen w-[46vh] py-16 px-4 bg-gray-100 shadow-lg">
        <h1 className="text-2xl h-sm:text-xl">테스트 참가 방법 안내</h1>
        <h1 className="text-base h-sm:text-sm py-4">
          안녕하세요, 실감의 <span className="font-bold">신기능 테스트</span>에
          참여해주셔서 감사합니다 😀
        </h1>
        <h1 className="text-base h-sm:text-sm pb-4">
          아래의 설명에 따라서 테스트를 진행해주세요. 조사에 참여해주신 분들 중
          추첨을 통해 총 10분께{" "}
          <span className="font-bold">스타벅스 기프티콘</span>을 증정해드릴
          예정입니다 🎁
        </h1>

        <div className="flex justify-center my-2 px-8">
          <ul className="text-base h-sm:text-sm list-decimal">
            <li>
              먼저{" "}
              <a
                className="text-color-silgam underline"
                target="_blank"
                href="https://forms.gle/V15u41QpDVn9P1c3A"
                rel="noopener noreferrer"
              >
                사전조사
              </a>
              에 답변 및 제출해주세요.
            </li>
            <li>
              <a
                className="text-color-silgam underline"
                target="_blank"
                href="https://suneung-math-keyword-test.vercel.app/"
                rel="noopener noreferrer"
              >
                신기능 체험 페이지
              </a>
              에서 새로운 기능을 테스트해주세요.
              <a
                className="text-color-silgam underline"
                target="_blank"
                href="https://drive.google.com/drive/folders/17WXP-VHPs3aZGWJI-rWjl_vIpC_Yiy0p?usp=sharing"
                rel="noopener noreferrer"
              >
                사전에 준비된 문제 사진
              </a>
              을 다운받아서 테스트를 진행해주셔도 괜찮습니다.
            </li>
            <li>
              <a
                className="text-color-silgam underline"
                target="_blank"
                href="https://forms.gle/DoLfXL7RTM6fnBhHA"
                rel="noopener noreferrer"
              >
                사후조사
              </a>
              를 <span className="font-bold">반드시!!</span> 답변 및
              제출해주시면 테스트가 끝나게 됩니다 🙂
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
