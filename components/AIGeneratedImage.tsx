import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// ==========================================
// [設定] 請在此處填入您的 GitHub 資訊
// ==========================================
const GITHUB_USERNAME = "AlexChanshuo"; 
const GITHUB_REPO = "digital-hedge-assets";
const GITHUB_BRANCH = "main";
// ==========================================

interface AIGeneratedImageProps {
  prompt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
  staticImage?: string;
}

const AIGeneratedImage: React.FC<AIGeneratedImageProps> = ({ prompt, className, aspectRatio = "1:1", staticImage }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [usingAI, setUsingAI] = useState(false);

  const getGitHubUrl = (filename: string) => {
    const cleanFilename = filename.replace(/^assets\//, '');
    return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/${cleanFilename}`;
  };

  const generateImage = useCallback(async (forceRegenerate = false) => {
    try {
      setUsingAI(true);
      setLoading(true);
      setError(false);
      
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error("No API key found");
        setError(true);
        setLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      
      const result = await model.generateContent([
        `Generate an image: ${prompt}. Aspect ratio: ${aspectRatio}`
      ]);
      
      const response = await result.response;
      const text = response.text();
      
      console.log("AI Response:", text);
      setError(true);
      
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
      
      const img = new Image();
      img.src = githubUrl;
      img.onload = () => {
        console.log(`Loaded from GitHub: ${githubUrl}`);
        setImageUrl(githubUrl);
        setLoading(false);
        setUsingAI(false);
      };
      img.onerror = () => {
        console.warn(`GitHub asset not found: ${githubUrl}. Showing placeholder.`);
        setError(true);
        setLoading(false);
      };
    } else {
      setError(true);
      setLoading(false);
    }
  }, [staticImage]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    const downloadName = staticImage ? staticImage.replace(/^assets\//, '') : `ai-generated-${Date.now()}.png`;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF9F6] to-[#E8E4DF] border border-[#E0E0E0] rounded-2xl ${className}`}>
        <div className="text-[#D4A373] mb-4">
          <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-[#2C2420]/40 text-xs uppercase tracking-widest">Image Placeholder</span>
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
        style={{ filter: usingAI ? 'sepia(0.2)' : 'none' }}
      />
      
      <div className="absolute inset-0 bg-[#D4A373] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>
      
      <div className={`absolute top-4 right-4 flex space-x-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
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
