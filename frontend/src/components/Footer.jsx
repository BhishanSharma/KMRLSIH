export default function Footer() {
  return (
    <footer
      className="
        fixed bottom-4 left-4 right-4
         
        rounded-2xl
        p-2 text-center
        z-30
      "
    >
      <p className="text-sm text-black/60">
        © {new Date().getFullYear()} KMRLSIH — Team Code Terrors
      </p>
    </footer>
  );
}
