import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      <main className="bg-gray-50">
        <div className={false ?"mx-auto p-2 md:p-6": ""}>
          <div className="flex bg-gray-50">
            {/* Sidebar */}
            <Sidebar/>
            {/* Main content */}
            <div className="flex-1 overflow-auto">
              <div className="p-4 sm:p-8 space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
