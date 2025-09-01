import Image from "next/image";
import NoteTile from "../components/NoteTile";
import HostingCodeSection from "../components/HostingCodeSection";
import ToolsSection from "../components/ToolsSection";
import PersonalSocialSection from "../components/PersonalSocialSection";

export default function Home() {
  return (
    <div className="grid grid-rows-[1px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 gap-2 sm:gap-16 lg:gap-12 sm:p-20">
      <div className="flex items-center gap-6 mt-15 sm:mt-10 lg:mt-0">
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
          <h1 className="text-3xl font-bold font-sans">Brandt Productions</h1>
          <p className="mt-1 text-lg font-sans">Links to get to the important stuff in life</p>
        </div>
      </div>
      {/* Grid of Link Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-5 w-full mt-8 sm:mt-4 lg:mt-0 lg:gap-5">
        <HostingCodeSection />
        <ToolsSection />
        <PersonalSocialSection />
      </div>
    </div>
  );
}
