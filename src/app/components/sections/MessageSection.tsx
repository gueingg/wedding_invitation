import { wedding } from '../../data/invitation';

interface Props {
  isActive: boolean;
}

const BODY_FONT =
  "'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";

export default function MessageSection({ isActive }: Props) {
  return (
    <div
      className="relative w-full max-w-[640px] mx-auto flex flex-col justify-center items-center px-10"
      style={{ aspectRatio: '799/1400' }}
    >
      {/* 초대 문구 */}
      <div className="text-center mb-10">
        {wedding.message.map((line, i) => (
          <p
            key={i}
            className={`text-sm leading-8 text-[#3d3d3d] transition-all duration-500 ${
              isActive
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              fontFamily: BODY_FONT,
              transitionDelay: isActive ? `${i * 80}ms` : '0ms',
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* 구분선 */}
      <div
        className={`w-10 h-px bg-[#2b3f6c]/25 mb-8 transition-all duration-500 ${
          isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
        style={{ transitionDelay: isActive ? '650ms' : '0ms' }}
      />

      {/* 신랑·신부 이름 */}
      <div
        className={`flex items-center gap-8 transition-all duration-500 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: isActive ? '750ms' : '0ms' }}
      >
        <div className="text-center">
          <p
            className="text-[10px] text-gray-400 mb-1"
            style={{ fontFamily: BODY_FONT }}
          >
            {wedding.groom.parent}의 아들
          </p>
          <p
            className="text-base font-bold"
            style={{ color: '#2b3f6c', fontFamily: "'Cafe24Font'" }}
          >
            {wedding.groom.name}
          </p>
        </div>

        <div className="text-[#2b3f6c]/30 text-lg select-none">♥</div>

        <div className="text-center">
          <p
            className="text-[10px] text-gray-400 mb-1"
            style={{ fontFamily: BODY_FONT }}
          >
            {wedding.bride.parent}의 딸
          </p>
          <p
            className="text-base font-bold"
            style={{ color: '#2b3f6c', fontFamily: "'Cafe24Font'" }}
          >
            {wedding.bride.name}
          </p>
        </div>
      </div>
    </div>
  );
}
