export default function AuthLayout({ children }) {
  return (
    <div>
      <div className="container mx-auto py-12">
        {children}
      </div>
    </div>
  );
}