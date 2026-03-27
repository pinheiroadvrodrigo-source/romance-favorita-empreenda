const WhatsAppButton = () => {
  const url = "https://wa.me/5591991198584?text=Vim%20atrav%C3%A9s%20do%20site%20da%20Romance%20Favorita%20e%20gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20cria%C3%A7%C3%A3o%20do%20meu.";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] px-5 py-3 rounded-xl shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_28px_rgba(37,211,102,0.55)] hover:scale-105 transition-all duration-300"
      aria-label="Falar no WhatsApp"
    >
      {/* Official WhatsApp SVG icon with 3D feel */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 175.216 175.552"
        className="w-8 h-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
      >
        <defs>
          <linearGradient id="wa3d" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#60D66A" />
            <stop offset="100%" stopColor="#25D366" />
          </linearGradient>
        </defs>
        <path
          fill="#fff"
          d="M87.184 14.2c-40.487 0-73.375 32.78-73.39 73.09a72.6 72.6 0 0 0 9.78 36.47L14.2 161.35l38.6-10.12a73.3 73.3 0 0 0 34.34 8.73h.03c40.49 0 73.38-32.79 73.39-73.1a72.6 72.6 0 0 0-21.46-51.85A72.7 72.7 0 0 0 87.184 14.2Zm0 133.74h-.03a60.9 60.9 0 0 1-31-8.49l-2.23-1.32-23.06 6.05 6.15-22.48-1.45-2.31a60.7 60.7 0 0 1-9.31-32.3c.02-33.63 27.42-61 61.13-61a60.7 60.7 0 0 1 43.15 17.89 60.7 60.7 0 0 1 17.87 43.22c-.02 33.64-27.42 61.02-61.12 61.02v-.28Z"
        />
        <path
          fill="#fff"
          d="M66.254 53.89c-1.58-3.52-3.24-3.59-4.75-3.65-1.23-.05-2.63-.05-4.03-.05a7.74 7.74 0 0 0-5.6 2.63c-1.93 2.1-7.36 7.19-7.36 17.53s7.53 20.33 8.58 21.74 14.55 23.28 35.9 31.7c17.76 6.99 21.37 5.6 25.22 5.25 3.84-.35 12.4-5.07 14.15-9.97 1.76-4.9 1.76-9.1 1.23-9.97-.53-.88-1.93-1.4-4.03-2.46s-12.4-6.12-14.33-6.82-3.33-1.05-4.73 1.05-5.43 6.82-6.66 8.23-2.46 1.58-4.56.53-8.88-3.27-16.92-10.43a63.4 63.4 0 0 1-11.71-14.57c-1.23-2.1-.13-3.24.92-4.29.95-.94 2.1-2.46 3.16-3.68a14.4 14.4 0 0 0 2.1-3.51 3.88 3.88 0 0 0-.18-3.68c-.52-1.06-4.63-11.47-6.4-15.68Z"
        />
      </svg>
      <span className="text-white font-bold text-sm hidden sm:inline">WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
