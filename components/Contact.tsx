import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { submitContactForm } from '../services/api';

interface ContactProps {
  onOpenChat: () => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenChat }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ type: 'error', message: t('contact.fillAll') });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message || t('contact.success') });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: result.error || t('contact.error') });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: t('contact.networkError') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-6 font-bold">{t('contact.badge')}</h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
            {t('contact.title1')}<br />{t('contact.title2')}
          </h3>
          <p className="text-xl text-[#2C2420]/60 mb-12 font-light leading-relaxed">
            {t('contact.description')}
          </p>

          <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t('contact.name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
                className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-6 py-4 rounded-xl outline-none focus:border-[#D4A373] focus:bg-white transition-all text-sm text-[#2C2420] disabled:opacity-50"
              />
              <input
                type="email"
                placeholder={t('contact.email')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
                className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-6 py-4 rounded-xl outline-none focus:border-[#D4A373] focus:bg-white transition-all text-sm text-[#2C2420] disabled:opacity-50"
              />
            </div>
            <textarea
              placeholder={t('contact.message')}
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              disabled={isSubmitting}
              className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-6 py-4 rounded-xl outline-none focus:border-[#D4A373] focus:bg-white transition-all text-sm text-[#2C2420] disabled:opacity-50"
            ></textarea>

            {submitStatus.type && (
              <div className={`p-4 rounded-xl text-sm ${submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-[#2C2420] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#D4A373] transition-all text-sm shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('contact.submitting') : t('contact.submit')}
            </button>
          </form>
        </div>

        <div className="relative">
          <div className="card-coffee rounded-[2.5rem] p-12 text-center group cursor-pointer" onClick={onOpenChat}>
            <div className="w-24 h-24 bg-[#FAF9F6] border border-[#E0E0E0] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <svg className="w-10 h-10 text-[#D4A373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-4 text-[#2C2420] font-serif">{t('contact.voiceTitle')}</h4>
            <p className="text-[#2C2420]/60 font-light mb-8 max-w-xs mx-auto">
              {t('contact.voiceDesc')}
            </p>
            <div className="flex flex-col items-center space-y-4">
              <button className="px-10 py-3 bg-[#FAF9F6] border border-[#D4A373]/30 text-[#D4A373] uppercase text-xs tracking-widest font-bold rounded-full hover:bg-[#D4A373] hover:text-white transition-all">
                {t('contact.voiceCta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
