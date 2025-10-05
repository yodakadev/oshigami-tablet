import { useRouter } from "next/router";
import { useState, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(0); // -1: 左, 0: 中央, 1: 右
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const handleResetClick = () => {
    setClickCount((prev) => prev + 1);

    // 既存のタイマーをクリア
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    // 10回クリックでモーダル表示
    if (clickCount + 1 >= 10) {
      setShowModal(true);
      setClickCount(0);
    } else {
      // 2秒後にカウントをリセット
      clickTimerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("cameraProgress");
    router.push("/");
  };

  const handleCancel = () => {
    setShowModal(false);
    setClickCount(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.touches[0].clientX);
    const offset = e.touches[0].clientX - touchStart;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragOffset(0);

    const distance = touchStart - touchEnd;
    const threshold = 50; // スワイプと判定する最小距離

    if (Math.abs(distance) > threshold) {
      if (distance > 0 && currentPage < 1) {
        // 左にスワイプ（右のページへ）
        setCurrentPage(currentPage + 1);
      } else if (distance < 0 && currentPage > -1) {
        // 右にスワイプ（左のページへ）
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const getTranslateX = () => {
    // currentPage: -1=左, 0=中央, 1=右
    // 中央ページを表示するためには -100vw の位置にする必要がある
    const baseOffset = -(currentPage + 1) * 100;
    const dragPercentage = isDragging ? (dragOffset / window.innerWidth) * 100 : 0;
    return baseOffset + dragPercentage;
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-between relative overflow-hidden"
      style={{ backgroundImage: "url('/images/home_bg.webp')" }}
    >
      {/* リセットボタン - 左上 */}
      <button
        onClick={handleResetClick}
        className="absolute top-0 left-0 w-16 h-16 bg-transparent bg-red-500 z-50"
        aria-label="Reset"
      />

      {/* リセット確認モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4">
            <h2 className="text-2xl font-bold text-center text-black mb-12">リセットしますか？</h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
              >
                いいえ
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                はい
              </button>
            </div>
          </div>
        </div>
      )}

      {/* スワイプ可能なコンテンツエリア */}
      <div
        className="flex-1 w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${getTranslateX()}vw)`,
            width: "300vw",
          }}
        >
          {/* 左のページ */}
          <div className="w-screen h-full flex items-center justify-center p-8"></div>

          {/* 中央のページ（メインコンテンツ） */}
          <div className="w-screen h-full flex flex-col justify-end pt-[250px] pl-[120px] pb-32">
            <div className="flex flex-col gap-16 w-full max-w-4xl">
              {/* 上の行: icon_kucho、icon_bgm、icon_rinen */}
              <div className="flex justify-start gap-8">
                <button className="flex-shrink-0" onClick={() => router.push("/kucho")}>
                  <img
                    src="/images/icon_kucho.webp"
                    width={150}
                    height={150}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>
                <button className="flex-shrink-0" onClick={() => router.push("/bgm")}>
                  <img
                    src="/images/icon_bgm.webp"
                    width={150}
                    height={150}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>
                <button className="flex-shrink-0" onClick={() => router.push("/rinen")}>
                  <img
                    src="/images/icon_rinen.webp"
                    width={150}
                    height={150}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>
              </div>

              {/* 下の行: icon_camera */}
              <div className="flex justify-start">
                <button className="flex-shrink-0" onClick={() => router.push("/camera")}>
                  <img
                    src="/images/icon_camera.webp"
                    width={150}
                    height={150}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 右のページ */}
          <div className="w-screen h-full flex items-center justify-center p-8"></div>
        </div>
      </div>

      {/* フッター */}
      <footer className="w-full bg-black py-8 flex items-center justify-center">
        <img src="/images/logo.webp" alt="Logo" width={150} height={70} className="object-contain" />
      </footer>
    </div>
  );
}
