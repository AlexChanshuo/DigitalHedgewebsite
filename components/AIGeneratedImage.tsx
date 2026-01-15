
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

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

  const generateImage = useCallback(async () => {
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
          setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
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
      const img = new Image();
      img.src = staticImage;
      img.onload = () => {
        setImageUrl(staticImage);
        setLoading(false);
        setUsingAI(false);
      };
      img.onerror = () => {
        console.log(`Static asset not found: ${staticImage}, falling back to GenAI.`);
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
    const suggestedName = staticImage ? staticImage.split('/').pop() : `digital-hedge-asset-${Date.now()}.png`;
    link.download = suggestedName || 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    generateImage();
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
          {usingAI ? "Brewing Assets..." : "Pouring..."}
        </span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#FAF9F6] border border-red-500/20 rounded-2xl p-4 text-center ${className}`}>
        <span className="text-[#2C2420]/50 text-xs mb-2">Extraction failed</span>
        <button 
          onClick={handleRegenerate}
          className="px-3 py-1 bg-white border border-[#E0E0E0] hover:border-[#D4A373] text-xs text-[#2C2420] rounded-md transition-colors"
        >
          Re-brew
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
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 sepia-[0.2]" 
      />
      
      {/* 琥珀色濾鏡效果 */}
      <div className="absolute inset-0 bg-[#D4A373] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>
      
      {/* Control Overlay */}
      <div className={`absolute top-4 right-4 flex space-x-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={handleRegenerate}
          title="Regenerate (Use AI)"
          className="p-2 bg-white/90 backdrop-blur-md hover:bg-[#D4A373] hover:text-white text-[#2C2420] rounded-full transition-all border border-[#E0E0E0] shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <button 
          onClick={handleDownload}
          title="Save to Assets"
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
