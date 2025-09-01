import LinkTile from "./LinkTile";
import GridDivider from "./GridDivider";

export default function HostingCodeSection() {
  return (
    <>
      <GridDivider label="Hosting & Code" />

      <LinkTile
        title="GitHub Repos"
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
        title="Cloudflare"
        subtitle="Dashboard"
        imageUrl="/cardImages/dev/cloudflare.svg"
        href="https://dash.cloudflare.com/8c7bd19ad84d085d467ffe7fd97e1eaf/home/domains"
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

      <LinkTile
        title="Atlassian Home"
        subtitle=""
        imageUrl="/cardImages/dev/atlassian.svg"
        href="https://home.atlassian.com"
      />

      <LinkTile
        title="Nginx proxy manager"
        subtitle=""
        imageUrl="/cardImages/dev/nginx-proxy-manager.svg"
        href="https://proxy-manager.lab.marco-brandt.com"
      />
    </>
  );
}