'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function InvitationPage() {
  const withPrefix = (path: string) =>
    process.env.NODE_ENV === 'production' ? `/wedding_invitation${path}` : path;

  const photos = [
    { src: '/photo1.jpg', caption: '박현규 & 신유진, 첫 인연' },
    { src: '/photo2.jpg', caption: '함께한 시간, 사랑으로' },
    { src: '/photo3.jpg', caption: '2025년 8월 23일, 함께해 주세요' },
  ];

  const [current, setCurrent] = useState(0);

  // 키보드/휠/스와이프로 넘기기
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && current < photos.length)
        setCurrent((c) => Math.min(c + 1, photos.length));
      if (e.deltaY < 0 && current > 0) setCurrent((c) => Math.max(c - 1, 0));
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [current, photos.length]);

  useEffect(() => {
    let startY = 0;
    let endY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      endY = e.changedTouches[0].clientY;
      if (startY - endY > 50 && current < photos.length) {
        setCurrent((c) => Math.min(c + 1, photos.length));
      }
      if (endY - startY > 50 && current > 0) {
        setCurrent((c) => Math.max(c - 1, 0));
      }
    };

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [current, photos.length]);

  return (
    <main className="relative w-full min-h-[100dvh] overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {[...photos, { isInfo: true }].map((photo, idx) => (
        <div
          key={idx}
          className={`
            absolute inset-0 transition-all duration-700 ease-in-out
            ${
              current === idx
                ? 'opacity-100 scale-100 z-20'
                : 'opacity-0 scale-95 z-10'
            }
            flex flex-col justify-center items-center
          `}
          style={{
            pointerEvents: current === idx ? 'auto' : 'none',
            background:
              'isInfo' in photo && photo.isInfo
                ? 'rgba(255,255,255,0.95)'
                : undefined,
          }}
        >
          {!('isInfo' in photo) ? (
            <div
              className="relative bg-white rounded-2xl shadow-2xl border border-amber-200 p-0 sm:p-2 max-w-lg w-[90vw] mx-auto flex flex-col items-center
              rotate-[-2deg] sm:rotate-[-1deg] hover:rotate-0 transition-transform duration-500"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-2xl">
                <Image
                  src={withPrefix(photo.src)}
                  alt={photo.caption}
                  fill
                  unoptimized
                  className="object-cover"
                  style={{ filter: 'brightness(0.96)' }}
                />
              </div>
              <div className="w-full px-6 py-5 flex flex-col items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-amber-900 font-serif mb-2 drop-shadow-sm">
                  {photo.caption}
                </h2>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-amber-700/70 text-xs">
                {idx + 1} / {photos.length}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center min-h-0">
              <div
                className="relative w-full max-w-lg mx-auto overflow-hidden flex-shrink"
                style={{
                  aspectRatio: '799/1400',
                  maxHeight: '100vh', // 화면의 55%까지만 이미지가 차지
                  minHeight: '120px',
                }}
              >
                <Image
                  src={withPrefix('/photo4.jpg')}
                  alt="오시는 길"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="w-full max-w-sm mx-auto py-5 flex-shrink-0">
                <h1
                  className="text-sm mb-4 text-center"
                  style={{
                    color: '#2b3f6c',
                    fontFamily: "'Cafe24Font'",
                    letterSpacing: '-0.02em',
                  }}
                >
                  함께가는 길
                </h1>
                <p
                  className="font-semibold text-sm  mb-2 text-center"
                  style={{
                    color: '#2b3f6c',
                    fontFamily:
                      "'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
                    letterSpacing: '-0.02em',
                  }}
                >
                  국민은행 123-456-789012 박노훈
                  <button
                    className="ml-3 px-4 py-1 text-white rounded shadow text-xs bg-[#2b3f6c] hover:bg-[#204080]"
                    onClick={() =>
                      navigator.clipboard.writeText('123-456-789012')
                    }
                  >
                    복사
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
      {/* 아래 화살표/버튼 등 네비게이션 */}
      {current < photos.length && (
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-amber-100 transition z-50"
          onClick={() => {
            console.log('다음, current:', current);
            setCurrent((c) => {
              const next = Math.min(c + 1, photos.length);
              console.log('current:', next);
              return next;
            });
          }}
          aria-label="다음"
          type="button"
        >
          <svg width={32} height={32} fill="none" viewBox="0 0 24 24">
            <path d="M12 16l-6-6h12l-6 6z" fill="#b45309" />
          </svg>
        </button>
      )}
    </main>
  );
}
