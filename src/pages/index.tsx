import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (inputValue === "しちまるあたる" || inputValue === "シチマルアタル") {
      // 正解の場合、homeページへ移動
      router.push("/home");
    } else {
      // 不正解の場合、×を1.5秒表示
      setShowError(true);
      setInputValue("");
      setTimeout(() => {
        setShowError(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#000] flex flex-col items-center justify-between p-8">
      {/* 画面中央にtop.webpを配置 */}
      <div className="flex-1 flex items-center justify-center">
        <img src="/images/top.webp" alt="Top" className="max-w-full h-auto" />
      </div>

      {/* 画面下部に入力エリアとsend_btnを配置 */}
      <div className="w-full max-w-2xl flex items-center gap-4 pb-32">
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
  );
}
