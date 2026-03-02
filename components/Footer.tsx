import React from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  onAdminLogin?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminLogin }) => {
  const { t } = useTranslation();
  
  return (
    <footer className="py-16 bg-[#2C2420] text-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border border-[#FAF9F6]/20 rounded-lg flex items-center justify-center font-serif font-bold text-xs text-[#D4A373]">PP</div>
          <span className="text-xl font-bold tracking-tight">PAIN POINT</span>
        </div>
        
        <div className="text-center">
          <a 
            href="tel:+886903502479" 
            className="text-xs text-[#FAF9F6]/70 hover:text-[#D4A373] transition-colors flex items-center justify-center gap-2 mb-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+886 903 502 479</span>
          </a>
          <div className="text-xs text-[#FAF9F6]/50 tracking-widest uppercase">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </div>
        </div>

        <div className="flex space-x-8 text-xs text-[#FAF9F6]/60 uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-[#D4A373] transition-colors">{t('footer.privacy')}</a>
          <a href="#" className="hover:text-[#D4A373] transition-colors">{t('footer.terms')}</a>
          <button 
            onClick={() => window.location.href = '/login'}
            className="hover:text-[#D4A373] transition-colors"
          >
            {t('footer.admin')}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
