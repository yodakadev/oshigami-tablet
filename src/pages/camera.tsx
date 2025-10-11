import { useRouter } from "next/router";
import { useState, useEffect } from "react";

type Status = "start" | "quiz" | "unlock" | "clear";

interface QuizData {
  image: string;
  answers: string[];
  supportText: string;
}

interface SaveData {
  status: Status;
  currentQuizIndex: number;
}

export default function Camera() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("start");
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [showResult, setShowResult] = useState<"correct" | "incorrect" | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // localStorageからデータを復帰
  useEffect(() => {
    const savedData = localStorage.getItem("cameraProgress");
    if (savedData) {
      try {
        const data: SaveData = JSON.parse(savedData);
        setStatus(data.status);
        setCurrentQuizIndex(data.currentQuizIndex);
      } catch (e) {
        console.error("Failed to load saved data:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // ステータスまたはクイズIndexが変更されたら保存
  useEffect(() => {
    if (isLoaded) {
      const saveData: SaveData = {
        status,
        currentQuizIndex,
      };
      localStorage.setItem("cameraProgress", JSON.stringify(saveData));
    }
  }, [status, currentQuizIndex, isLoaded]);

  // クイズデータ（q2~q10の9問）
  const quizzes: QuizData[] = [
    { image: "/images/q2.webp", answers: ["ニシニッポリ", "にしにっぽり"], supportText: "カタカナ6文字" },
    { image: "/images/q3.webp", answers: ["サロマコ", "さろまこ"], supportText: "カタカナ4文字" },
    { image: "/images/q4.webp", answers: ["スガワラノミチザネ", "すがわらのみちざね"], supportText: "カタカナ9文字" },
    { image: "/images/q5.webp", answers: ["スタンダール", "すたんだーる"], supportText: "カタカナ6文字" },
    { image: "/images/q6.webp", answers: ["オットリ", "おっとり"], supportText: "カタカナ4文字" },
    { image: "/images/q7.webp", answers: ["ポストリュード", "ぽすとりゅーど"], supportText: "カタカナ7文字" },
    { image: "/images/q8.webp", answers: ["レバノン", "ればのん"], supportText: "カタカナ4文字" },
    { image: "/images/q9.webp", answers: ["カマキリ", "かまきり"], supportText: "カタカナ4文字" },
    { image: "/images/q10.webp", answers: ["シゲムネユウゾウ", "しげむねゆうぞう"], supportText: "カタカナ8文字" },
  ];

  const handleFooterClick = () => {
    router.push("/home");
  };

  const handleSubmit = () => {
    if (status === "start") {
      // startステータス：答えが"34"かチェック
      if (inputValue === "34" || inputValue === "３４") {
        setInputValue("");
        setStatus("quiz");
        setCurrentQuizIndex(0);
      } else {
        // 不正解の場合、×を1.5秒表示
        setShowError(true);
        setInputValue("");
        setTimeout(() => {
          setShowError(false);
        }, 1500);
      }
    } else if (status === "quiz") {
      // quizステータス：現在のクイズの答えをチェック
      const currentQuiz = quizzes[currentQuizIndex];
      const isCorrect = currentQuiz.answers.some((answer) => inputValue.toLowerCase() === answer.toLowerCase());

      if (isCorrect) {
        // 正解の場合、maruを1秒表示
        setShowResult("correct");
        setInputValue("");
        setTimeout(() => {
          setShowResult(null);
          if (currentQuizIndex < quizzes.length - 1) {
            // 次の問題へ
            setCurrentQuizIndex(currentQuizIndex + 1);
          } else {
            // 全問題終了 - unlockステータスへ
            setStatus("unlock");
          }
        }, 1000);
      } else {
        // 不正解の場合、batuを1秒表示
        setShowResult("incorrect");
        setShowError(true);
        setInputValue("");
        setTimeout(() => {
          setShowResult(null);
          setShowError(false);
        }, 1000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#000] flex flex-col">
      {/* ヘッダー画像 */}
      <div className="w-[95%]">
        <img src="/images/title_camera.webp" className="block" />
      </div>

      {/* メインコンテンツ - ステータスによって切り替え */}
      {status === "start" && (
        <div className="flex-1 flex flex-col items-center justify-start p-8 pt-16">
          {/* lock.webp */}
          <div className="mb-24">
            <img src="/images/lock.webp" alt="Lock" width={230} height={80} />
          </div>

          {/* 白い枠の中に問題画像 */}
          <div className="bg-white w-[80%] h-96 flex items-center justify-center p-3 mb-8">
            <img src="/images/q1.webp" width={600} height={200} />
          </div>

          {/* サポート文章 */}
          <p className="text-3xl mb-2 text-start w-[90%] text-white font-serif">数字</p>

          {/* 入力エリア */}
          <div className="w-full max-w-2xl flex items-center gap-4">
            <input
              type="text"
              value={showError ? "×" : inputValue}
              onChange={(e) => !showError && setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-16 text-3xl text-center text-black bg-white rounded-sm outline-none"
              disabled={showError}
            />
            <button onClick={handleSubmit} className="flex-shrink-0 h-16">
              <img
                src="/images/send_btn.webp"
                alt="Send"
                className="w-auto h-full cursor-pointer hover:opacity-80 transition-opacity"
              />
            </button>
          </div>
        </div>
      )}

      {status === "quiz" && (
        <>
          <div className="flex-1 flex flex-col items-center justify-start p-8 pt-[190px] relative">
            {/* 正解不正解表示 - 画面右上に固定 */}
            {showResult && (
              <div className="absolute top-8 right-8 z-10">
                <img
                  src={showResult === "correct" ? "/images/maru.webp" : "/images/batu.webp"}
                  alt={showResult === "correct" ? "正解" : "不正解"}
                  width={150}
                  height={150}
                />
              </div>
            )}

            {/* クイズ画像 */}
            <div className="w-[80%] h-auto flex items-center justify-center p-3 mb-8">
              <img src={quizzes[currentQuizIndex].image} className="w-full h-auto" />
            </div>

            {/* 入力エリア - 絶対位置配置 */}
            {/* TODO:解答欄位置 */}
            <div className="absolute bottom-20 left-0 right-0 w-full flex flex-col items-center px-8">
              {/* サポート文章 */}
              <p className="text-3xl mb-2 text-start w-[90%] max-w-2xl text-white font-serif">
                {quizzes[currentQuizIndex].supportText}
              </p>

              {/* 入力エリア */}
              <div className="w-full max-w-2xl flex items-center gap-4">
                <input
                  type="text"
                  value={showError ? "×" : inputValue}
                  onChange={(e) => !showError && setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 h-16 text-3xl text-center text-black bg-white rounded-sm outline-none"
                  disabled={showError}
                />
                <button onClick={handleSubmit} className="flex-shrink-0 h-16">
                  <img
                    src="/images/send_btn.webp"
                    alt="Send"
                    className="w-auto h-full cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {status === "unlock" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-12 p-8">
          {/* unlock.webp */}
          <div>
            <img src="/images/unlock.webp" alt="Unlock" width={500} height={300} />
          </div>

          {/* watch_btn.webp */}
          <button onClick={() => setStatus("clear")}>
            <img
              src="/images/watch_btn.webp"
              alt="Watch"
              width={350}
              height={180}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </button>
        </div>
      )}

      {status === "clear" && (
        <div className="flex-1 flex items-center justify-center p-8">
          {/* photo.webp */}
          <img src="/images/photo.webp" alt="Photo" className="max-w-full h-auto" />
        </div>
      )}

      {/* フッター */}
      <footer
        onClick={handleFooterClick}
        className="w-full bg-black py-8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img src="/images/logo.webp" alt="Logo" width={150} height={70} className="object-contain" />
      </footer>
    </div>
  );
}
