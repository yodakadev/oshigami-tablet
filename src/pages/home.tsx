import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-between"
      style={{ backgroundImage: "url('/images/home_bg.webp')" }}
    >
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col gap-16 w-full max-w-4xl">
        {/* 上の行: icon_kucho、icon_bgm、icon_rinen */}
        <div className="flex justify-center gap-8">
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

      {/* フッター */}
      <footer className="w-full bg-black py-8 flex items-center justify-center">
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
