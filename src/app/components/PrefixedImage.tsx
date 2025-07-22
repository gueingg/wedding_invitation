'use client';
import Image, { ImageProps } from 'next/image';
import { usePrefix } from '../context/PrefixContext';

type Props = ImageProps & {
  src: string;
};

export default function PrefixedImage({ src, ...props }: Props) {
  const prefix = usePrefix();
  const prefixedSrc = `${prefix}${src}`;
  return <Image {...props} src={prefixedSrc} unoptimized />;
}
