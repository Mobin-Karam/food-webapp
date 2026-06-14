'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const MOCK_OTP = '1234';

type Step = 'phone' | 'otp';

export default function LoginModal() {
  const { showModal, closeModal, login } = useAuth();

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Reset on open
  useEffect(() => {
    if (showModal) {
      setStep('phone');
      setPhone('');
      setOtp(['', '', '', '']);
      setError('');
      setCountdown(0);
      setTimeout(() => phoneInputRef.current?.focus(), 80);
    }
  }, [showModal]);

  // Close on Escape
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal, closeModal]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeModal();
  }, [closeModal]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits, max 11
    const val = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhone(val);
    setError('');
  };

  const sendCode = async () => {
    if (phone.length !== 11) return;
    setSending(true);
    setError('');
    // Mock API delay
    await new Promise(r => setTimeout(r, 800));
    setSending(false);
    setStep('otp');
    setCountdown(90);
    setTimeout(() => otpRefs[0].current?.focus(), 80);
  };

  const handleOtpChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError('');

    if (digit && index < 3) {
      otpRefs[index + 1].current?.focus();
    }

    // Auto-verify when all filled
    if (digit && index === 3) {
      const code = [...next.slice(0, 3), digit].join('');
      if (code.length === 4) verifyOtp(code);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const verifyOtp = (code?: string) => {
    const entered = code ?? otp.join('');
    if (entered === MOCK_OTP) {
      login(phone);
    } else {
      setError('کد وارد شده اشتباه است');
      setOtp(['', '', '', '']);
      otpRefs[0].current?.focus();
    }
  };

  const resendCode = async () => {
    if (countdown > 0) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 600));
    setSending(false);
    setOtp(['', '', '', '']);
    setCountdown(90);
    setError('');
    setTimeout(() => otpRefs[0].current?.focus(), 80);
  };

  if (!showModal) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full mx-4"
        style={{ maxWidth: 360 }}
        role="dialog"
        aria-modal="true"
        aria-label="ورود"
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-3 left-3 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="بستن"
        >
          <X size={18} />
        </button>

        <div className="p-6 pt-5 text-right">
          {/* TFC logo mark */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <Phone size={22} className="text-brand-red" />
            </div>
          </div>

          {step === 'phone' ? (
            <>
              <h2 className="text-lg font-bold text-gray-800 mb-1 text-center">ورود / ثبت‌نام</h2>
              <p className="text-sm text-gray-400 text-center mb-5">
                شماره موبایل خود را وارد کنید
              </p>

              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                شماره موبایل
              </label>
              <input
                ref={phoneInputRef}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={phone}
                onChange={handlePhoneChange}
                onKeyDown={e => e.key === 'Enter' && phone.length === 11 && sendCode()}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-lg tracking-widest font-mono outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 transition-all bg-gray-50 text-gray-800 placeholder-gray-300"
                style={{ direction: 'ltr' }}
                autoComplete="tel"
              />

              {error && <p className="text-xs text-red-500 text-center mt-2">{error}</p>}

              <button
                onClick={sendCode}
                disabled={phone.length !== 11 || sending}
                className={`mt-4 w-full py-3 rounded-xl font-bold text-sm transition-all
                  ${phone.length === 11 && !sending
                    ? 'bg-brand-red text-white hover:bg-brand-red-dark active:scale-95 shadow-sm'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    در حال ارسال...
                  </span>
                ) : 'دریافت کد تأیید'}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
                با ورود، <span className="text-brand-red">قوانین و مقررات</span> را می‌پذیرید
              </p>
            </>
          ) : (
            <>
              {/* Back button */}
              <button
                onClick={() => { setStep('phone'); setOtp(['', '', '', '']); setError(''); }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-red transition-colors mb-4"
              >
                <span>تغییر شماره</span>
                <ArrowRight size={13} />
              </button>

              <h2 className="text-lg font-bold text-gray-800 mb-1 text-center">کد تأیید</h2>
              <p className="text-sm text-gray-400 text-center mb-1">
                کد ۴ رقمی ارسال شده به
              </p>
              <p className="text-sm font-bold text-gray-700 text-center mb-5 ltr" style={{ direction: 'ltr' }}>
                {phone}
              </p>

              {/* OTP inputs */}
              <div className="flex justify-center gap-3 mb-2" style={{ direction: 'ltr' }}>
                {otpRefs.map((ref, i) => (
                  <input
                    key={i}
                    ref={ref}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={otp[i]}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
                      ${otp[i]
                        ? 'border-brand-red bg-red-50 text-brand-red'
                        : 'border-gray-200 bg-gray-50 text-gray-800'
                      }
                      focus:border-brand-red focus:ring-2 focus:ring-red-100`}
                  />
                ))}
              </div>

              {error && <p className="text-xs text-red-500 text-center mt-1 mb-2">{error}</p>}

              <button
                onClick={() => verifyOtp()}
                disabled={otp.join('').length !== 4}
                className={`mt-3 w-full py-3 rounded-xl font-bold text-sm transition-all
                  ${otp.join('').length === 4
                    ? 'bg-brand-red text-white hover:bg-brand-red-dark active:scale-95 shadow-sm'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
              >
                تأیید و ورود
              </button>

              {/* Resend */}
              <div className="text-center mt-3">
                {countdown > 0 ? (
                  <p className="text-xs text-gray-400">
                    ارسال مجدد کد تا{' '}
                    <span className="text-brand-red font-bold tabular-nums" style={{ direction: 'ltr', display: 'inline-block' }}>
                      {String(Math.floor(countdown / 60)).padStart(2, '0')}:{String(countdown % 60).padStart(2, '0')}
                    </span>
                  </p>
                ) : (
                  <button
                    onClick={resendCode}
                    disabled={sending}
                    className="text-xs text-brand-red font-medium hover:text-brand-red-dark transition-colors"
                  >
                    {sending ? 'در حال ارسال...' : 'ارسال مجدد کد'}
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-300 text-center mt-3">کد آزمایشی: ۱۲۳۴</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
