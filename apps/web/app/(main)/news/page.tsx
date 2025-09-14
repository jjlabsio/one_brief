import { NewsCard } from '@/ui/news/news-card';

export default function Page() {
  const news = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div>
      <div>news briefing</div>
      <div>
        {news.map((el) => (
          <NewsCard key={el} />
        ))}
      </div>
    </div>
  );
}
