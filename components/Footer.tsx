import React from 'react';

interface FooterProps {
  onAdminLogin?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminLogin }) => {
  return (
    <footer className="py-16 bg-[#2C2420] text-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border border-[#FAF9F6]/20 rounded-lg flex items-center justify-center font-serif font-bold text-xs text-[#D4A373]">PP</div>
          <span className="text-xl font-bold tracking-tight">PAIN POINT</span>
        </div>
        
        <div className="text-xs text-[#FAF9F6]/50 tracking-widest uppercase">
          © {new Date().getFullYear()} Pain Point Technologies Co., Ltd. 痛點科技
        </div>

        <div className="flex space-x-8 text-xs text-[#FAF9F6]/60 uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-[#D4A373] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#D4A373] transition-colors">Terms of Service</a>
          <button 
            onClick={() => window.location.href = '/login'}
            className="hover:text-[#D4A373] transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
