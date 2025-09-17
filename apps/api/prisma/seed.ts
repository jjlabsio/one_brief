import { PrismaClient, Prisma } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

const preferenceData: Prisma.PreferenceCreateInput[] = [
  // 경제/재테크 관련
  { name: '재테크' },
  { name: '주식 투자' },
  { name: '부동산' },
  { name: '가상화폐' },
  { name: '금리/환율' },
  { name: '창업/스타트업' },

  // 사회/정치
  { name: '국내 정치' },
  { name: '국제 정치' },
  { name: '노동/고용' },
  { name: '교육' },
  { name: '법률/사건사고' },
  { name: '환경/기후변화' },

  // IT/과학
  { name: '인공지능' },
  { name: '모바일/스마트폰' },
  { name: '인터넷/플랫폼' },
  { name: '게임' },
  { name: '우주/항공' },
  { name: '의학/생명과학' },

  // 문화/라이프스타일
  { name: '영화' },
  { name: '드라마/예능' },
  { name: '음악' },
  { name: '패션/뷰티' },
  { name: '여행' },
  { name: '푸드/요리' },
  { name: '스포츠' },
  { name: '건강/운동' },

  // 비즈니스/산업
  { name: '자동차' },
  { name: '에너지/석유화학' },
  { name: '바이오/제약' },
  { name: '유통/소비재' },
  { name: '금융/은행' },
  { name: '부품/제조업' },

  // 국제
  { name: '미국 경제' },
  { name: '중국 경제' },
  { name: '유럽 경제' },
  { name: '신흥국 시장' },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of preferenceData) {
    const preference = await prisma.preference.create({
      data: u,
    });
    console.log(`Created preference with id: ${preference.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
