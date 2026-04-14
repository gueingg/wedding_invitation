import Image from 'next/image';
import PrefixedImage from '../PrefixedImage';
import { wedding } from '../../data/invitation';

interface Props {
  isActive: boolean;
}

export default function CoverSection({ isActive }: Props) {
  return (
    <div
      className="relative w-full max-w-[640px] mx-auto"
      style={{ aspectRatio: '799/1400' }}
    >
      {/* 메인 커버 사진 — 활성 시 살짝 zoom-out 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={wedding.coverSrc}
          alt={`${wedding.groom.name} & ${wedding.bride.name} 커버 사진`}
          fill
          className={`object-cover transition-transform duration-[1400ms] ease-out ${
            isActive ? 'scale-100' : 'scale-110'
          }`}
          unoptimized
          priority
          sizes="(max-width: 640px) 100vw, 640px"
        />
      </div>

      {/* 스킨 PNG 오버레이 */}
      <PrefixedImage
        className="absolute inset-0 object-cover"
        src="/103.png"
        alt=""
        fill
        unoptimized
        sizes="(max-width: 640px) 100vw, 640px"
      />

      {/* 정보 오버레이 (이름·날짜·장소) */}
      <PrefixedImage
        src="/skin_info.png"
        alt={`${wedding.groom.name} & ${wedding.bride.name} 결혼식 정보`}
        fill
        className="absolute inset-0 z-20 object-cover pointer-events-none"
        unoptimized
        sizes="(max-width: 640px) 100vw, 640px"
      />
    </div>
  );
}
