import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { submitContactForm } from '../services/api';

const Contact: React.FC = () => {
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
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-6 font-bold">{t('contact.badge')}</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
            {t('contact.title1')}{t('contact.title2')}
          </h3>
          <p className="text-xl text-[#2C2420]/60 font-light leading-relaxed max-w-lg mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
    </section>
  );
};

export default Contact;
