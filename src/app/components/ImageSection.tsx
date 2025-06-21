'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface Props {
  src: string;
  alt: string;
  caption: string;
}

export default function ImageSection({ src, alt, caption }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className={`min-h-screen flex flex-col justify-center items-center transition-opacity duration-1000 ${
        inView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={600}
        className="rounded-2xl shadow-lg object-cover w-full max-w-md"
      />
      <p className="mt-4 text-lg text-white drop-shadow">{caption}</p>
    </section>
  );
}
