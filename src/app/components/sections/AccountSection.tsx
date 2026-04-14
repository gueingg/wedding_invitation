'use client';
import { Copy } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { BANK_COLORS, wedding } from '../../data/invitation';

interface Props {
  isActive: boolean;
}

export default function AccountSection({ isActive }: Props) {
  const { showToast } = useToast();

  const copyAccount = (raw: string, name: string) => {
    navigator.clipboard.writeText(raw).then(() => {
      showToast(`${name} 계좌번호가 복사되었습니다`);
    });
  };

  return (
    <div
      className="relative w-full max-w-[640px] mx-auto flex flex-col justify-center items-center px-6"
      style={{ aspectRatio: '799/1400' }}
    >
      {/* 헤더 */}
      <div
        className={`text-center mb-8 transition-all duration-500 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <h2
          className="text-sm tracking-widest"
          style={{ color: '#2b3f6c', fontFamily: "'Cafe24Font'" }}
        >
          마음 전하실 곳
        </h2>
        <div className="w-8 h-px bg-[#2b3f6c]/25 mx-auto mt-2" />
      </div>

      {/* 계좌 카드 목록 */}
      <div className="w-full max-w-sm space-y-4">
        {wedding.accounts.map((account, i) => (
          <div
            key={account.raw}
            className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 transition-all duration-500 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isActive ? `${i * 120 + 200}ms` : '0ms' }}
          >
            {/* 카드 헤더: 역할 + 은행 뱃지 */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <span
                  className="text-[10px] text-gray-400"
                  style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  {account.role}
                </span>
                <p
                  className="font-bold text-base mt-0.5"
                  style={{
                    color: '#2b3f6c',
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  {account.name}
                </p>
              </div>
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-white"
                style={{
                  backgroundColor:
                    BANK_COLORS[account.bank] ?? '#2b3f6c',
                }}
              >
                {account.bank}
              </span>
            </div>

            {/* 계좌번호 + 복사 버튼 */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <span
                className="text-sm text-gray-700 tabular-nums tracking-wider"
                style={{ fontFamily: 'ui-monospace, monospace' }}
              >
                {account.number}
              </span>
              <button
                onClick={() => copyAccount(account.raw, account.name)}
                className="ml-3 flex items-center gap-1.5 text-xs text-[#2b3f6c] font-medium hover:text-[#1a2d55] active:scale-95 transition-all"
                aria-label={`${account.name} 계좌번호 복사`}
              >
                <Copy className="w-3.5 h-3.5" />
                복사
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 안내 문구 */}
      <p
        className={`mt-8 text-xs text-gray-400 text-center leading-relaxed transition-all duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transitionDelay: isActive ? '550ms' : '0ms',
          fontFamily: "'Noto Sans KR', sans-serif",
        }}
      >
        참석이 어려우신 분들은
        <br />
        축하의 마음을 전해주시면 감사하겠습니다.
      </p>
    </div>
  );
}
