import { useRouter } from "next/router";

export default function Camera() {
  const router = useRouter();

  const handleFooterClick = () => {
    router.push("/home");
  };

  return (
    <div
      className="min-h-screen bg-[#000] flex flex-col"
    >
      {/* ヘッダー画像 */}
      <div className="w-[95%]">
        <img
          src="/images/title_camera.webp"
          className="block"
        />
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col items-center justify-start p-8 pt-16">
        {/* lock.webp */}
        <div className="mb-24">
          <img
            src="/images/lock.webp"
            alt="Lock"
            width={230}
            height={80}
          />
        </div>

        {/* 白い枠の中にnot.webp */}
        <div className="bg-white w-[80%] h-96 flex items-center justify-center">
          <img
            src="/images/not.webp"
            width={400}
            height={200}
          />
        </div>
      </div>

      {/* フッター */}
      <footer
        onClick={handleFooterClick}
        className="w-full bg-black py-8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img
          src="/images/logo.webp"
          alt="Logo"
          width={150}
          height={70}
          className="object-contain"
        />
      </footer>
    </div>
  );
}
