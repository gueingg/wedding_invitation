'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function InvitationPage() {
  const withPrefix = (path: string) => {
    const prefix =
      process.env.NODE_ENV === 'production' ? '/wedding_invitation' : '';
    return `${prefix}${path}`;
  };

  const [isShort, setIsShort] = useState(false);
  const photos = [
    { src: '/photo1.jpg', caption: '박현규 & 신유진, 첫 인연' },
    { src: '/photo2.jpg', caption: '함께한 시간, 사랑으로' },
    { src: '/photo3.jpg', caption: '2025년 8월 23일, 함께해 주세요' },
  ];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  useEffect(() => {
    const handleResize = () => {
      setIsShort(window.innerHeight < 700);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    // <main className="bg-black text-white">
    //   <ImageSection
    //     src="/photo1.jpg"
    //     alt="우리의 첫 만남"
    //     caption="Hyun-gyu & Yu-jin, 첫 인연"
    //   />
    //   <ImageSection
    //     src="/photo2.jpg"
    //     alt="우리의 사랑"
    //     caption="함께한 시간, 사랑으로"
    //   />
    //   <ImageSection
    //     src="/photo3.jpg"
    //     alt="결혼식 초대"
    //     caption="2025년 8월 23일, 함께해 주세요"
    //   />
    // </main>
    <main className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      {photos.map((photo, idx) => (
        <section
          ref={ref}
          key={idx}
          className={`relative min-h-screen flex flex-col justify-center items-center  pt-[50%] transition-opacity duration-1000 ${
            inView ? 'opacity-100' : 'opacity-30'
          }`}
        >
          <Image
            src={`${
              process.env.NODE_ENV === 'production' ? '/wedding_invitation' : ''
            }/${photo.src}`}
            alt={photo.caption}
            fill
            className="absolute w-full h-full object-cover"
          />
          <div className="relative z-10 bg-black/50 text-white p-6 rounded-xl text-center">
            <h2 className="text-2xl font-semibold">{photo.caption}</h2>
          </div>
        </section>
      ))}
      <section className="min-h-screen flex flex-col text-center mx-3">
        <div className="p-1">
          <h1 className="m-2 font-bold text-2xl text-amber-800 font-serif tracking-widest">
            함께가는길
          </h1>
        </div>
        <div className="text-gray-800 bg-gray-50 w-full flex-1">
          <div className="flex justify-between items-start text-left">
            <div>
              <h2 className="font-semibold text-lg py-2 px-1">
                안산 AW컨벤션웨딩 6층 테라스홀
              </h2>
              <p className="text-gray-600 text-sm py-1 px-1">
                경기 안산시 단원구 광덕1로 171
              </p>
            </div>
          </div>
          <div
            className={`relative rounded-md overflow-hidden w-full ${
              isShort ? 'h-[50vw]' : 'h-[100vw]'
            }`}
          >
            <Image
              src={withPrefix('/map.jpg')}
              alt="aw"
              fill
              className="object-cover"
              sizes="100vw"
            ></Image>
          </div>
        </div>
        <div className="p-1">
          <h2 className="m-2 font-bold text-xl">지하철 안내</h2>
          <div className="m-1">
            <span className="text-lg font-semibold">4호선 고잔역 2번 출구</span>
            <p className="text-sm m-1">
              셔틀버스는 예식 2시간 후까지 운행합니다.
            </p>
            <p className="text-xs m-1 sm:text-sm">
              (셔틀버스 5분~7분 간격 수시운행 / 도보 15~20분)
            </p>
          </div>
          <h2 className="m-2 font-bold text-xl">주차 안내</h2>
          <div className="flex flex-col gap-1 text-left">
            <a href="https://naver.me/F6lsP4wp" target="_blank" rel="noopener">
              <span className="text-lg">
                • 양지주차타워
                <span className="text-sm ml-1">(AW컨벤션주차타워)</span>
              </span>
            </a>
            <a href="https://naver.me/GhbuY5oQ" target="_blank" rel="noopener">
              <span className="text-lg"> • MK주차타워</span>
            </a>
            <a href="https://naver.me/F5D107vU" target="_blank" rel="noopener">
              <span className="text-lg">• AW컨벤션 정문 맞은편 공영주차장</span>
            </a>
          </div>
          <h1 className="m-2 font-bold text-2xl text-amber-800 font-serif tracking-widest overflow-auto">
            신랑신부에게 마음 전하기
          </h1>
          <p className="text-sm">축하의 마음을 담아 축의금을 전달해보세요</p>
          <div className="text-lg flex flex-row">
            <p>국민은행</p>
            <button>복사</button>
          </div>
        </div>
      </section>
      {/* <div>
        <Image src={photos[0].src} alt={photos[0].caption} fill />
      </div> */}
    </main>
  );
}
