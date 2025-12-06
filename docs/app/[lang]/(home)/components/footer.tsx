export const Footer = () => (
  <div className="bg-dashed">
    <div className="container mx-auto flex items-center justify-between p-8 text-muted-foreground">
      <p className="mx-auto block text-center text-sm">
        Built with love by{" "}
        <a
          className="text-foreground underline"
          href="https://x.com/haydenbleasel"
          rel="noopener noreferrer"
          target="_blank"
        >
          Hayden Bleasel
        </a>
        . Maintained by a brilliant community of{" "}
        <a
          className="text-foreground underline"
          href="https://github.com/vercel/next-forge"
          rel="noopener noreferrer"
          target="_blank"
        >
          developers
        </a>
        .
      </p>
    </div>
  </div>
);
