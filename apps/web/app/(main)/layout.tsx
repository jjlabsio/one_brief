export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>navigation</div>
      <div>{children}</div>
    </div>
  );
}
