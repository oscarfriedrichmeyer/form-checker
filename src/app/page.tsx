"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [exploded, setExploded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setLoading(true);
      setShowResult(false);
      setExploded(false);
      setTimeout(() => {
        setExploded(true);
        setTimeout(() => {
          setLoading(false);
          setShowResult(true);
        }, 900); // explosion duration
      }, 1200); // loading duration
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f7f7f7] to-[#e9e6f7] p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center font-mono text-black">
        Physique Checker
      </h1>
      <p className="mb-8 text-center text-lg font-mono text-pink-700 max-w-xl">
        Lade ein Foto deiner beeindruckenden Muckis hoch und erlebe, wie unsere
        hochmoderne, absolut übertriebene KI mit mehr Rechenpower als ein Toaster
        deine Form analysiert! Nach nur wenigen Sekunden bekommst du ein gnadenlos ehrliches Urteil. Bereit
        für die Wahrheit? 🚀🤖
      </p>
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-8 flex flex-col items-center w-full max-w-md">
        <button
          onClick={handleUploadClick}
          className="px-8 py-3 bg-black text-white font-mono text-xl rounded-xl shadow-lg hover:bg-gray-900 transition mb-4"
        >
          Foto hochladen
        </button>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {previewUrl && (
          <div className="relative w-64 h-64 mt-4 flex items-center justify-center">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className={`object-contain rounded-2xl transition-all duration-700 ${
                exploded ? "scale-0 blur-2xl opacity-0" : ""
              }`}
              style={{ zIndex: 1 }}
            />
            {loading && !exploded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="w-16 h-16 border-8 border-blue-300 border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="text-lg font-mono text-blue-500">
                  Analysiere...
                </span>
              </div>
            )}
            {exploded && (
              <div className="absolute inset-0 flex items-center justify-center z-20 animate-bounce">
                <span className="text-6xl">💥</span>
              </div>
            )}
          </div>
        )}
        {showResult && (
          <div className="flex flex-col items-center mt-6">
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Preview"
                width={220}
                height={220}
                className="rounded-2xl object-contain mb-4 border-4 border-black"
              />
            )}
            <div className="text-2xl font-bold text-center text-green-700 font-mono bg-green-100 px-6 py-3 rounded-xl border-2 border-green-300 shadow-lg">
              Ahh, du bist ein Spargel
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
