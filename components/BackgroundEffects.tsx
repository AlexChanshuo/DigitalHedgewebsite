
import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      {/* 基礎蒸氣白背景 */}
      <div className="absolute inset-0 bg-[#FAF9F6]"></div>
      
      {/* 模擬香氣擴散的動態光暈 */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#D4A373] rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.08] animate-[pulse_8s_ease-in-out_infinite]"></div>
      
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-[#2C2420] rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.03] animate-[pulse_12s_ease-in-out_infinite_2s]"></div>

      {/* 緩慢上升的蒸氣效果 (Parallax Steam) */}
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white rounded-full filter blur-xl opacity-40 animate-[float_10s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-white rounded-full filter blur-2xl opacity-40 animate-[float_15s_ease-in-out_infinite_1s]"></div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-20px) scale(1.05); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default BackgroundEffects;
