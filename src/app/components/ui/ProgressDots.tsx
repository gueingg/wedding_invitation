'use client';

interface Props {
  total: number;
  current: number;
  onNavigate: (idx: number) => void;
}

export default function ProgressDots({ total, current, onNavigate }: Props) {
  return (
    <nav
      aria-label="섹션 이동"
      className="fixed right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50"
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          aria-label={`${i + 1}번째 섹션으로 이동`}
          aria-current={current === i ? 'true' : undefined}
          className={`rounded-full transition-all duration-300 ${
            current === i
              ? 'w-1.5 h-5 bg-[#2b3f6c]'
              : 'w-1.5 h-1.5 bg-[#2b3f6c]/30 hover:bg-[#2b3f6c]/60'
          }`}
        />
      ))}
    </nav>
  );
}
