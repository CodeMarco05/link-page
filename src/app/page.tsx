import Image from "next/image";
import LinkTile from "../components/LinkTile";
import NoteTile from "../components/NoteTile";
import GridDivider from "../components/GridDivider";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 w-full mt-8 sm:mt-4 lg:mt-0 lg:gap-5">

        <GridDivider label="Hosting & Code" />

        <LinkTile
          title="GitHub"
          subtitle="CodeMarco05 - My Repos"
          imageUrl="/cardImages/dev/github.svg"
          href="https://github.com/CodeMarco05?tab=repositories"
        />
        <LinkTile
          title="Organizations"
          subtitle="CodeMarco05 - My Organizations"
          imageUrl="/cardImages/dev/github.svg"
          href="https://github.com/settings/organizations"
        />
        <LinkTile
          title="Proxmox"
          subtitle="Server Node 1 - Self Hosted S1"
          imageUrl="/cardImages/dev/proxmox.svg"
          href="https://proxmox.lab.marco-brandt.com/"
        />
        <LinkTile
          title="Tailscale"
          subtitle="Tailscale Admin Console"
          imageUrl="/cardImages/dev/tailscale.svg"
          href="https://login.tailscale.com/admin/machines"
        />
        <LinkTile
          title="Cloudflare"
          subtitle="Dashboard"
          imageUrl="/cardImages/dev/cloudflare.svg"
          href="https://dash.cloudflare.com/8c7bd19ad84d085d467ffe7fd97e1eaf/home/domains"
        />

        <LinkTile
          title="Proxy Manager Personal"
          subtitle="Manage your personal proxy's"
          imageUrl="/cardImages/dev/nginx-proxy-manager.svg"
          href="https://proxy-manager.lab.marco-brandt.com/"
        />

        <LinkTile
          title="Proxy Manager Observe"
          subtitle="Observe shared Proxy Manager"
          imageUrl="/cardImages/dev/nginx-proxy-manager.svg"
          href="https://proxy-manager.observe.lab.marco-brandt.com/"
        />

        <LinkTile
          title="Trello"
          subtitle="Project Management"
          imageUrl="/cardImages/dev/trello.svg"
          href="https://trello.com/u/marcobrandt16/boards"
        />

        <LinkTile
          title="Docker Hub"
          subtitle="(marco1205) - Docker Hub"
          imageUrl="/cardImages/dev/docker-hub.svg"
          href="https://hub.docker.com/repositories/marco1205"
        />

        <GridDivider label="Tools" />

        <LinkTile
          title="Figma"
          subtitle="Open Figma application"
          imageUrl="/cardImages/dev/figma.svg"
          href="figma://"
        />

        <LinkTile
          title="Anas Internet Archive"
          subtitle="Book Store"
          imageUrl="/cardImages/tools/anas-archive.svg"
          href="https://annas-archive.org/"
        />

        <LinkTile
          title="Unix Time"
          subtitle="Website to convert and get Unix Time"
          imageUrl="/cardImages/tools/unix.svg"
          href="https://www.unixtimestamp.com/"
        />

        <LinkTile
          title="Excalidraw"
          subtitle="The little drawing tool"
          imageUrl="/cardImages/tools/excalidraw.svg"
          href="https://excalidraw.com/"
        />

        <LinkTile
          title="DeepL"
          subtitle="Translation"
          imageUrl="/cardImages/tools/deepl.svg"
          href="https://www.deepl.com/"
        />

        <GridDivider label="Personal & Social" />

        <LinkTile
          title="YouTube"
          subtitle="Watch, but not too much or you'll get distracted"
          imageUrl="/cardImages/personal/youtube.svg"
          href="https://www.youtube.com/"
        />
        <LinkTile
          title="Gmail"
          subtitle="Personal Email"
          imageUrl="/cardImages/personal/gmail.svg"
          href="https://mail.google.com/mail/u/0/#inbox"
        />
        <LinkTile
          title="Whatsapp"
          subtitle="Web App"
          imageUrl="/cardImages/personal/whatsapp.svg"
          href="https://web.whatsapp.com/"
        />
        <LinkTile
          title="Drive"
          subtitle="Google Drive"
          imageUrl="/cardImages/personal/google-drive.svg"
          href="https://drive.google.com/drive/my-drive"
        />
        <LinkTile
          title="ICloud"
          subtitle="Personal ICloud Web"
          imageUrl="/cardImages/personal/icloud.svg"
          href="https://www.icloud.com/"
        />
      </div>
    </div>
  );
}
