'use client';
import { Dialog } from '@headlessui/react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePrefix } from '../context/PrefixContext';

export default function ImageZoom() {
  const [isOpen, setIsOpen] = useState(false);
  const prefix = usePrefix();

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div
        className="relative inline-block cursor-zoom-in group w-full mx-auto overflow-hidden max-w-lg aspect-[799/1400]"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={`${prefix}/photo4.jpg`}
          alt="미리보기 이미지"
          fill
          className="object-contain"
          unoptimized
        />
        {/* 돋보기 아이콘 (hover 시만 표시) */}
        <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition">
          <Search className="w-5 h-5 text-gray-700" />
        </div>
      </div>

      {/* 모달 확대 이미지 */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-50 inset-0"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-80"
          onClick={() => setIsOpen(false)}
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative max-w-5xl w-full">
            <Image
              src={`${prefix}/photo4.jpg`}
              alt="확대 이미지"
              width={1200}
              height={800}
              className="rounded-lg object-contain w-full h-auto"
              unoptimized
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
            >
              ✕
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
