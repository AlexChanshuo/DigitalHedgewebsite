
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

// ==========================================
// [設定] 請在此處填入您的 GitHub 資訊
// ==========================================
// 1. 您的 GitHub 帳號名稱
const GITHUB_USERNAME = "YOUR_GITHUB_USERNAME"; 
// 2. 您存放圖片的倉庫名稱
const GITHUB_REPO = "digital-hedge-assets";
// 3. 分支名稱 (通常是 main 或 master)
const GITHUB_BRANCH = "main";
// ==========================================

interface AIGeneratedImageProps {
  prompt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
  staticImage?: string; // 這裡只需要傳入檔名，例如 "hero.png"
}

const AIGeneratedImage: React.FC<AIGeneratedImageProps> = ({ prompt, className, aspectRatio = "1:1", staticImage }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [usingAI, setUsingAI] = useState(false);

  // 建構 GitHub Raw 連結
  const getGitHubUrl = (filename: string) => {
    // 移除路徑中的 assets/ 前綴，確保只保留檔名
    const cleanFilename = filename.replace(/^assets\//, '');
    return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/${cleanFilename}`;
  };

  const generateImage = useCallback(async (forceRegenerate = false) => {
    // 如果是強制重繪，或是沒有 staticImage，才使用 AI
    try {
      setUsingAI(true);
      setLoading(true);
      setError(false);
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
          },
        },
      });

      let foundImage = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Image = `data:image/png;base64,${part.inlineData.data}`;
          setImageUrl(base64Image);
          foundImage = true;
          break;
        }
      }
      if (!foundImage) setError(true);
    } catch (err) {
      console.error("Image generation failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [prompt, aspectRatio]);

  useEffect(() => {
    if (staticImage) {
      setLoading(true);
      const githubUrl = getGitHubUrl(staticImage);
      
      // 嘗試載入 GitHub 圖片
      const img = new Image();
      img.src = githubUrl;
      img.onload = () => {
        // 成功載入 GitHub 圖片
        console.log(`Loaded from GitHub: ${githubUrl}`);
        setImageUrl(githubUrl);
        setLoading(false);
        setUsingAI(false);
      };
      img.onerror = () => {
        // GitHub 載入失敗 (可能是還沒上傳，或檔名錯誤)，轉為 AI 生成
        console.warn(`GitHub asset not found: ${githubUrl}. Falling back to AI.`);
        generateImage(); 
      };
    } else {
      generateImage();
    }
  }, [staticImage, generateImage]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    // 如果是 GitHub 圖片，下載時嘗試保持原檔名
    const downloadName = staticImage ? staticImage.replace(/^assets\//, '') : `ai-generated-${Date.now()}.png`;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 強制使用 AI 重繪
    generateImage(true);
  };

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#FAF9F6] border border-[#E0E0E0] rounded-2xl ${className}`}>
        <div className="text-[#D4A373]/50 mb-2">
          <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[#2C2420]/40 font-medium">
          {usingAI ? "AI Generating..." : "Fetching Asset..."}
        </span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#FAF9F6] border border-red-500/20 rounded-2xl p-4 text-center ${className}`}>
        <span className="text-[#2C2420]/50 text-xs mb-2">Image Missing</span>
        <button 
          onClick={handleRegenerate}
          className="px-3 py-1 bg-white border border-[#E0E0E0] hover:border-[#D4A373] text-xs text-[#2C2420] rounded-md transition-colors"
        >
          Generate with AI
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`relative group overflow-hidden bg-[#FAF9F6] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={imageUrl} 
        alt={prompt} 
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
        // 只有 AI 生成的圖片才加 sepia 濾鏡，如果是自己上傳的圖通常希望保持原色
        style={{ filter: usingAI ? 'sepia(0.2)' : 'none' }}
      />
      
      {/* 只有 hover 時顯示琥珀色濾鏡 */}
      <div className="absolute inset-0 bg-[#D4A373] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>
      
      {/* Control Overlay */}
      <div className={`absolute top-4 right-4 flex space-x-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={handleRegenerate}
          title="Force AI Regenerate"
          className="p-2 bg-white/90 backdrop-blur-md hover:bg-[#D4A373] hover:text-white text-[#2C2420] rounded-full transition-all border border-[#E0E0E0] shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <button 
          onClick={handleDownload}
          title="Save Image"
          className="p-2 bg-white/90 backdrop-blur-md hover:bg-[#D4A373] hover:text-white text-[#2C2420] rounded-full transition-all border border-[#E0E0E0] shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIGeneratedImage;
