import LinkTile from "./LinkTile";
import GridDivider from "./GridDivider";

export default function PersonalSocialSection() {
  return (
    <>
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
        title="ICloud"
        subtitle="Personal ICloud Web"
        imageUrl="/cardImages/personal/icloud.svg"
        href="https://www.icloud.com/"
      />
    </>
  );
}