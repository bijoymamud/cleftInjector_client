import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Directory", to: "/directory" },
  { name: "About Us", to: "/about_us" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md h-[80px] sticky top-0 z-50">
      <div className="container mx-auto ">
        <div className="flex justify-between items-center h-[80px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="https://i.ibb.co.com/tp5FFNsL/Frame-2.png"
                alt="Logo"
                className="w-[140px] sm:w-[160px] h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={cn(
                  "inline-flex items-center px-3 py-2 text-xl font-medium transition-colors duration-200",
                  pathname === item.to
                    ? "text-[#CC6023] border-b-2 border-[#CC6023]"
                    : "text-gray-600 hover:text-[#CC6023] hover:border-b-2 hover:border-[#CC6023]"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Get Listed Button */}
          <div className="hidden sm:flex">
            <Link
              to="/get-started"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E26C29] text-white text-base font-medium hover:from-[#D55F22] hover:via-[#BC541E] hover:to-[#904A24] transition-colors duration-200"
            >
              <FaRegUser size={18} />
              Get Listed
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-[#CC6023] focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={toggleMobileMenu}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200",
                  pathname === item.to
                    ? "bg-[#CC6023]/10 text-[#CC6023] border-l-4 border-[#CC6023]"
                    : "text-gray-600 hover:bg-[#CC6023]/5 hover:text-[#CC6023]"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-[#E26C29] via-[#CD5E1F] to-[#9F5328] text-white hover:from-[#D55F22] hover:via-[#BC541E] hover:to-[#904A24]"
              >
                <Link to="/get-started" onClick={toggleMobileMenu}>
                  Get Listed
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
