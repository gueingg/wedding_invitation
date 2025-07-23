'use client';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import ImageZoom from './components/ImageSection';
import PrefixedImage from './components/PrefixedImage';
export default function InvitationPage() {
  const photos = [
    {
      src: 'https://cloud.bojagicard.com/scene/si/sinyu999/dfc45045965aac0b4fbc55c4cf41bd49.jpg',
      topCaption: '',
      bottomCaption: '',
    },
    {
      src: '',
      topCaption: `${'<p>함께할 날이 많아졌다는 사실에</p><p>하루하루가 고맙고 설렙니다.</p><p>친구처럼 서로를 아끼며 걸어가려 합니다.</p><p>저희의 진심 어린 시작,</p><p>얼마나 서로 좋아하는지,</p><p>오셔서 따뜻한 마음으로 봐주세요.</p>'}`,
      bottomCaption: `${'아들 <span class="font-bold">박현규</span> 딸 <span class="font-bold">신유진</span>'}`,
    },
  ];

  const [current, setCurrent] = useState(0);

  // 슬라이드 이동 함수 (중복 방지)
  const goTo = useCallback(
    (idx: number) => setCurrent(Math.max(0, Math.min(idx, photos.length))),
    [photos.length]
  );

  // 휠/키보드/스와이프 이벤트
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && current < photos.length) goTo(current + 1);
      if (e.deltaY < 0 && current > 0) goTo(current - 1);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goTo(current - 1);
    };
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      if (startY - endY > 50 && current < photos.length) goTo(current + 1);
      if (endY - startY > 50 && current > 0) goTo(current - 1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [current, goTo, photos.length]);

  return (
    <main className="relative w-full min-h-[100dvh] overflow-hidden bg-zinc-50">
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
            // ...existing code...
            <div
              id="scene_wrapper"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 640,
                margin: '0 auto',
              }}
            >
              {/* 캡션 표기 */}
              {photo.topCaption && photo.topCaption.trim() !== '' ? (
                <div
                  id="scene_slider"
                  className="relative w-full aspect-[799/1400] justify-center items-center flex flex-col pt-30"
                >
                  {/* 위쪽 문구 */}
                  <div
                    className="text-center leading-loose mb-6"
                    dangerouslySetInnerHTML={{
                      __html: photo.topCaption,
                    }}
                  />
                  {/* 아래쪽 가족소개 */}
                  <div
                    className="flex gap-x-2 space-x-5"
                    dangerouslySetInnerHTML={{
                      __html: photo.bottomCaption,
                    }}
                  />
                </div>
              ) : (
                // 슬라이드 이미지
                <div
                  id="scene_slider"
                  className="relative w-full aspect-[799/1400] overflow-hidden"
                >
                  <Image
                    className="object-cover blur-none block"
                    src={photo.src}
                    alt="슬라이드 이미지"
                    fill
                    unoptimized
                    quality={100}
                    priority
                    sizes="(max-width: 535px) 100vw, 795px"
                  />
                </div>
              )}

              {/* 스킨 PNG (반투명 오버레이 등) */}
              <PrefixedImage
                className="absolute inset-0 object-cover"
                id="skin_png"
                src="/103.png"
                alt="스킨 PNG"
                fill
                priority={false}
                unoptimized
                quality={100}
                sizes="(max-width: 480px) 100vw, 480px"
              />
              {/* 스킨 인포 (정보 오버레이) */}
              <PrefixedImage
                id="skin_info"
                src="/skin_info.png"
                alt="스킨 인포"
                fill
                className="absolute inset-0 z-20"
                style={{
                  pointerEvents: 'none',
                  objectFit: 'cover',
                }}
                priority={false}
                unoptimized
                quality={100}
                sizes="(max-width: 480px) 100vw, 480px"
              />
            </div>
          ) : (
            // ...existing code...
            <div className="w-full h-full flex flex-col items-center min-h-0">
              <ImageZoom />
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
                  신랑 혼주 : 농협 302-1103-3171-81 박노훈
                  <button
                    className="ml-3 px-4 py-1 text-white rounded shadow text-xs bg-[#2b3f6c] hover:bg-[#204080]"
                    onClick={() => {
                      navigator.clipboard.writeText('농협 3021103317181');
                      alert('계좌번호가 복사되었습니다.');
                    }}
                  >
                    복사
                  </button>
                </p>
                <p
                  className="font-semibold text-sm  mb-2 text-center"
                  style={{
                    color: '#2b3f6c',
                    fontFamily:
                      "'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
                    letterSpacing: '-0.02em',
                  }}
                >
                  신부 혼주: 우리 245-0348-0312-001 신현걸
                  <button
                    className="ml-3 px-4 py-1 text-white rounded shadow text-xs bg-[#2b3f6c] hover:bg-[#204080]"
                    onClick={() => {
                      navigator.clipboard.writeText('우리 24503480312001');
                      alert('계좌번호가 복사되었습니다.');
                    }}
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
            setCurrent((c) => {
              const next = Math.min(c + 1, photos.length);
              if (next === photos.length) {
                // 마지막 페이지에 도달하면 스크롤을 맨 위로 이동
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              return next;
            });
          }}
          aria-label="다음"
          type="button"
        >
          <svg width={32} height={32} fill="none" viewBox="0 0 24 24">
            <path d="M12 16l-6-6h12l-6 6z" fill="#091c46" />
          </svg>
        </button>
      )}
    </main>
  );
}
