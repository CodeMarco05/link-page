import LinkTile from "./LinkTile";
import GridDivider from "./GridDivider";

export default function ToolsSection() {
  return (
    <>
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

      <LinkTile
        title="Google Docs"
        subtitle="Documents"
        imageUrl="/cardImages/tools/google-docs.svg"
        href="https://sheets.google.com/"
      />

      <LinkTile
        title="Google Sheets"
        subtitle="Spreadsheets"
        imageUrl="/cardImages/tools/google-sheets.svg"
        href="https://sheets.google.com/"
      />

      <LinkTile
        title="Google Drive"
        subtitle="Documents"
        imageUrl="/cardImages/tools/google-drive.svg"
        href="https://docs.google.com/"
      />
    </>
  );
}