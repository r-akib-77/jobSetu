import React from "react";

import PCNavbar from "./PCNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <header>
      {/* Desktop */}
      <div className="hidden lg:block">
        <PCNavbar />
      </div>

      {/* Mobile & Tablet */}
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
    </header>
  );
};

export default Navbar;
