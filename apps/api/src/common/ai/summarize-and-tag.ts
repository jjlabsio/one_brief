import OpenAI from 'openai';
import z from 'zod';
import { zodTextFormat } from './zod-text-format';

const DEFAULT_MODEL = 'gpt-5-nano-2025-08-07';

const SummaryAndTags = z.object({
  summary: z.string(),
  tags: z.array(z.string()),
});

const client = new OpenAI();

export const summarizeAndTag = async (
  content: string,
  preferences: string[],
): Promise<[string, string[]]> => {
  const systemPrompt = `
너의 역할은 뉴스 요약기이자 관심사 태깅 시스템이다.  
다음 조건을 지켜서 동작해라.

입력:
1. preferences: string[] 배열 (사용자가 선택한 관심사 키워드 목록)
2. news: 기사 원문 텍스트

출력:
1. summary: 뉴스 내용을 3~5줄로 요약한 문자열
2. tags: string[] 배열 (preferences 중에서 news와 가장 관련 있는 키워드만 선택)

규칙:
- summary는 간결하고 핵심적인 내용만 포함한다.
- tags에는 preferences에서 실제로 해당 기사와 연관된 키워드만 넣는다.

출력 예시:
{
  "summary": "요약된 뉴스 내용...",
  "tags": ["AI", "경제"]
}
`;
  const userPrompt = `
preferences: ${JSON.stringify(preferences)}
news: """${content}"""`;

  const response = await client.responses.parse({
    model: DEFAULT_MODEL,
    input: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    text: {
      format: zodTextFormat(SummaryAndTags, 'summary_and_tags'),
    },
  });

  const { summary, tags } = response.output_parsed;

  return [summary, tags];
};
