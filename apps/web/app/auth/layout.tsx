export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>bar with logo</div>
      <div>{children}</div>
    </div>
  );
}
