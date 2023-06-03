import Link from "next/link";
import "./globals.css";
import { Inter, Anek_Kannada } from "next/font/google";
import { Header } from "@/components/header";
const inter = Anek_Kannada({ subsets: ["kannada"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const Footer = () => {
  return (
    <section className="col-span-3 row-span-1 row-start-3 sm:col-span-1 sm:col-start-2 text-white">
      <footer className="relative flex h-full w-full flex-col items-center justify-center space-y-4">
        <div className="flex flex-row flex-wrap justify-center gap-4 max-xs:px-16">
          <button>a</button>
          <button>ab</button>
          <button>abc</button>
          <button>abcd</button>
          <button>abcde</button>
        </div>
        <div className="flex h-6 flex-row items-center justify-center space-x-1 ">
          <button>a</button>
          <button>ab</button>
        </div>
      </footer>
    </section>
  );
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-w-full grid min-h-screen grid-rows-layout bg-zinc-700 dark:bg-slate-700 sm:grid-cols-layout`}
      >
        <div className="contents" style={{ minWidth: "91%" }}>
          <Header />
          <main className="mt-2 h-screen bg-zinc-700 w-11/12 m-auto flex flex-col space-y-4">
            {children}
          </main>
          <Footer />
          <div className="col-span-1 col-start-1 row-span-3 row-start-1 hidden bg-gradient-to-r sm:block from-zinc-600 via-zinc-500 to-zinc-400 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600">
            <div className="invisible h-full w-full bg-zinc-800 from-rose-50 to-slate-700 opacity-25 dark:visible"></div>
          </div>
          <div className="col-span-1 col-start-3 row-span-3 row-start-1 hidden bg-gradient-to-l  sm:block from-zinc-600 via-zinc-500 to-zinc-400 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600">
            <div className="invisible h-full w-full bg-zinc-800 from-rose-50 to-slate-700 opacity-25 dark:visible"></div>
          </div>
        </div>
      </body>
    </html>
  );
}
