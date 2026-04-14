export const wedding = {
  groom: {
    name: '박현규',
    parent: '박노훈',
  },
  bride: {
    name: '신유진',
    parent: '신현걸',
  },
  coverSrc:
    'https://cloud.bojagicard.com/scene/si/sinyu999/dfc45045965aac0b4fbc55c4cf41bd49.jpg',
  message: [
    '함께할 날이 많아졌다는 사실에',
    '하루하루가 고맙고 설렙니다.',
    '친구처럼 서로를 아끼며 걸어가려 합니다.',
    '저희의 진심 어린 시작,',
    '얼마나 서로 좋아하는지,',
    '오셔서 따뜻한 마음으로 봐주세요.',
  ],
  photos: [
    '/photo1.jpg',
    '/photo2.jpg',
    '/photo3.jpg',
    '/photo4.jpg',
    '/photo5.jpg',
    '/photo6.jpg',
    '/photo7.jpg',
  ],
  accounts: [
    {
      role: '신랑 혼주',
      bank: '농협',
      number: '302-1103-3171-81',
      name: '박노훈',
      raw: '3021103317181',
    },
    {
      role: '신부 혼주',
      bank: '우리',
      number: '245-0348-0312-001',
      name: '신현걸',
      raw: '24503480312001',
    },
  ],
} as const;

export const BANK_COLORS: Record<string, string> = {
  농협: '#009245',
  우리: '#0072bc',
  신한: '#004A9F',
  국민: '#e3b200',
  하나: '#01AA6D',
  기업: '#006598',
};
