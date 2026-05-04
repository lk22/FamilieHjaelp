export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 mt-8">
      <div className="container mx-auto text-center text-gray-600">
        &copy; {new Date().getFullYear()} Familiehjælp. All rights reserved.
      </div>
    </footer>
  );
}