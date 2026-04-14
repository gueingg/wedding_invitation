'use client';
import { useState } from 'react';
import { MapPin, ZoomIn, X } from 'lucide-react';
import PrefixedImage from '../PrefixedImage';

interface Props {
  isActive: boolean;
}

export default function MapSection({ isActive }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div
        className={`relative w-full max-w-[640px] mx-auto flex flex-col transition-all duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
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
            함께가는 길
          </h2>
          <div className="w-8 h-px bg-[#2b3f6c]/25 mx-auto mt-2" />
        </div>

        {/* 지도 이미지 (클릭 시 확대) */}
        <div
          className="relative flex-1 overflow-hidden cursor-zoom-in group"
          onClick={() => setIsZoomed(true)}
          role="button"
          aria-label="지도 확대"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsZoomed(true)}
        >
          <PrefixedImage
            src="/map.jpg"
            alt="오시는 길 지도"
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            unoptimized
          />
          <div className="absolute bottom-3 right-3 bg-white/70 backdrop-blur-sm rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4 text-[#2b3f6c]" />
          </div>
        </div>

        {/* 주소 */}
        <div
          className={`py-4 px-6 transition-all duration-500 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: isActive ? '300ms' : '0ms' }}
        >
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#2b3f6c]" />
            <span style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              {/* TODO: 실제 결혼식장 주소로 변경 */}
              결혼식장 주소를 여기에 입력하세요
            </span>
          </div>
        </div>
      </div>

      {/* 확대 모달 */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <PrefixedImage
              src="/mapZoom.jpg"
              alt="오시는 길 지도 확대"
              width={1200}
              height={900}
              className="rounded-xl object-contain w-full h-auto shadow-2xl"
              unoptimized
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow hover:bg-red-50 transition-colors"
              aria-label="닫기"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
