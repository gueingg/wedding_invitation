'use client';
import { useCallback, useEffect, useState } from 'react';
import CoverSection from './components/sections/CoverSection';
import MessageSection from './components/sections/MessageSection';
import GallerySection from './components/sections/GallerySection';
import MapSection from './components/sections/MapSection';
import AccountSection from './components/sections/AccountSection';
import ProgressDots from './components/ui/ProgressDots';

const TOTAL_SECTIONS = 5;

export default function InvitationPage() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (idx: number) =>
      setCurrent(Math.max(0, Math.min(idx, TOTAL_SECTIONS - 1))),
    []
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) goTo(current + 1);
      else if (e.deltaY < 0) goTo(current - 1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(current + 1);
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goTo(current - 1);
    };

    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = e.changedTouches[0].clientY - startY;
      if (dy < -50) goTo(current + 1);
      else if (dy > 50) goTo(current - 1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [current, goTo]);

  const sections = [
    { key: 'cover', node: <CoverSection isActive={current === 0} /> },
    { key: 'message', node: <MessageSection isActive={current === 1} /> },
    { key: 'gallery', node: <GallerySection isActive={current === 2} /> },
    { key: 'map', node: <MapSection isActive={current === 3} /> },
    { key: 'account', node: <AccountSection isActive={current === 4} /> },
  ];

  return (
    <main className="relative w-full min-h-[100dvh] overflow-hidden bg-[#faf9f7]">
      {sections.map(({ key, node }, idx) => (
        <div
          key={key}
          className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-700 ease-in-out will-change-[opacity,transform] ${
            current === idx
              ? 'opacity-100 scale-100 z-20 pointer-events-auto'
              : 'opacity-0 scale-[0.97] z-10 pointer-events-none'
          }`}
        >
          {node}
        </div>
      ))}

      <ProgressDots
        total={TOTAL_SECTIONS}
        current={current}
        onNavigate={goTo}
      />

      {/* 스크롤 힌트 — 마지막 섹션 제외 */}
      {current < TOTAL_SECTIONS - 1 && (
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 animate-bounce opacity-50 hover:opacity-90 transition-opacity"
          onClick={() => goTo(current + 1)}
          aria-label="다음 섹션으로 이동"
          type="button"
        >
          <svg
            width={28}
            height={28}
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 16l-6-6h12l-6 6z" fill="#2b3f6c" />
          </svg>
        </button>
      )}
    </main>
  );
}
