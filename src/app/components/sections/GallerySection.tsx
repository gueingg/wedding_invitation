'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PrefixedImage from '../PrefixedImage';
import { wedding } from '../../data/invitation';

interface Props {
  isActive: boolean;
}

export default function GallerySection({ isActive }: Props) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const photos = wedding.photos;

  // 섹션 비활성화 시 첫 번째 사진으로 초기화
  useEffect(() => {
    if (!isActive) setPhotoIdx(0);
  }, [isActive]);

  const prev = () =>
    setPhotoIdx((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setPhotoIdx((i) => (i + 1) % photos.length);

  // 수평 스와이프로 사진 전환 (수직 스와이프는 상위 컴포넌트가 처리)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      if (dx < 0) next();
      else prev();
    }
  };

  return (
    <div
      className="relative w-full max-w-[640px] mx-auto flex flex-col"
      style={{ aspectRatio: '799/1400' }}
    >
      {/* 헤더 */}
      <div
        className={`text-center pt-8 pb-4 transition-all duration-500 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <h2
          className="text-sm tracking-widest"
          style={{ color: '#2b3f6c', fontFamily: "'Cafe24Font'" }}
        >
          갤러리
        </h2>
        <div className="w-8 h-px bg-[#2b3f6c]/25 mx-auto mt-2" />
      </div>

      {/* 사진 캐러셀 */}
      <div
        className="relative flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {photos.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              i === photoIdx
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-[0.97] z-0'
            }`}
          >
            <PrefixedImage
              src={src}
              alt={`웨딩 사진 ${i + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ))}

        {/* 이전 버튼 */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
          aria-label="이전 사진"
        >
          <ChevronLeft className="w-4 h-4 text-[#2b3f6c]" />
        </button>

        {/* 다음 버튼 */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
          aria-label="다음 사진"
        >
          <ChevronRight className="w-4 h-4 text-[#2b3f6c]" />
        </button>

        {/* 사진 번호 */}
        <div className="absolute top-3 right-3 z-20 bg-black/30 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
          {photoIdx + 1} / {photos.length}
        </div>
      </div>

      {/* 도트 인디케이터 */}
      <div className="flex justify-center gap-1.5 py-4">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setPhotoIdx(i)}
            aria-label={`사진 ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === photoIdx
                ? 'w-4 h-1.5 bg-[#2b3f6c]'
                : 'w-1.5 h-1.5 bg-[#2b3f6c]/25 hover:bg-[#2b3f6c]/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
