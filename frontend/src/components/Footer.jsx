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
      <p className=" text-[10px] text-black/60 bg-white/30 p-2 inline rounded-4xl hover:bg-white/80 hover:text-black backdrop-blur-3xl transition-colors">
        © {new Date().getFullYear()} KMRLSIH — Team Code Terrors
      </p>
    </footer>
  );
}
