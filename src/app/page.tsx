import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[1px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex items-center justify-center gap-6">
        {/* Logo */}
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={64}
          height={64}
          className="w-16 h-16"
        />
        {/* Text Content */}
        <div className="text-left">
          <h1 className="text-4xl font-bold font-sans">Brandt Productions</h1>
          <p className="mt-1 text-lg font-sans">Links to get to the important stuff in life</p>
        </div>
      </div>
      <Image
        src="/images/hero-image.jpg"
        alt="Hero Image"
        width={600}
        height={400}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
