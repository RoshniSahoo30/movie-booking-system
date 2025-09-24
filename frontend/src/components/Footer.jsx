import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/10 text-white/80">
      <div className="container mx-auto py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {year} MoviesBook. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm">
          <a className="hover:text-white/95" href="#">Privacy</a>
          <a className="hover:text-white/95" href="#">Terms</a>
          <a className="hover:text-white/95" href="#">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

