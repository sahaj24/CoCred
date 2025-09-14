export default function HomePage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">CoCred - Homepage Working!</h1>
      <p className="text-lg mb-8">If you see this, your deployment is successful.</p>
      <nav className="mt-8">
        <a href="/about" className="mx-4 text-blue-600 hover:underline">About</a>
        <a href="/login" className="mx-4 text-blue-600 hover:underline">Login</a>
        <a href="/signup" className="mx-4 text-blue-600 hover:underline">Signup</a>
        <a href="/forgot" className="mx-4 text-blue-600 hover:underline">Forgot</a>
      </nav>
    </div>
  );
}