import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegUser } from "react-icons/fa6";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useGetUserProfileQuery } from "@/redux/features/baseApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Directory", to: "/directory" },
  { name: "About Us", to: "/about_us" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: userProfile, refetch } = useGetUserProfileQuery();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  console.log("userProfile:", userProfile);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogOut = () => {
    console.log("clicked");

    localStorage.clear();
    toast.success("Logged out successfully!");
    refetch();

    setTimeout(() => {
      navigate("/sign_in");
    }, 500);
  };
  return (
    <nav className="bg-white shadow-md h-[85px] sticky top-0 z-50">
      <div className="container mx-auto">
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
                  "inline-flex items-center px-3 py-2 text-[22px] font-semibold transition-colors duration-200",
                  pathname === item.to
                    ? "text-[#CC6023] border-b-2 border-[#CC6023]"
                    : "text-gray-600 hover:text-[#CC6023] hover:border-b-2 hover:border-[#CC6023]"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden sm:flex items-center gap-4 justify-end">
            {userProfile ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-[50px] h-[50px] cursor-pointer">
                    <AvatarImage src={userProfile?.profile_image} alt="User" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        to={
                          userProfile?.role === "provider"
                            ? "/provider/provider_home"
                            : "/user_profile"
                        }
                        className="cursor-pointer"
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => setShowLogoutDialog(true)}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  to="/sign_in"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E26C29] text-white text-base font-medium hover:bg-[#D55F22] transition-colors duration-200"
                >
                  <FaRegUser size={18} />
                  Sign In
                </Link>
                <Link
                  to="/sign_up"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E26C29] text-white text-base font-medium hover:bg-[#D55F22] transition-colors duration-200"
                >
                  <FaRegUser size={18} />
                  Sign Up
                </Link>
              </>
            )}
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
            <div className="px-3 py-2 flex justify-end">
              {userProfile ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="w-[50px] h-[50px] cursor-pointer">
                      <AvatarImage
                        // src= {}|| "https://github.com/shadcn.png"
                        src={userProfile?.profile_image}
                        alt="User"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link
                          to={
                            userProfile?.role === "provider"
                              ? "/provider/provider_home"
                              : "/user_profile"
                          }
                          className="cursor-pointer"
                          onClick={toggleMobileMenu}
                        >
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => {
                          setShowLogoutDialog(true);
                          toggleMobileMenu();
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  asChild
                  className="w-full max-w-[200px] bg-gradient-to-r from-[#E26C29] via-[#CD5E1F] to-[#9F5328] text-white hover:from-[#D55F22] hover:via-[#BC541E] hover:to-[#904A24]"
                >
                  <Link to="/get-started" onClick={toggleMobileMenu}>
                    Get Listed
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button onClick={handleLogOut} type="submit" asChild>
                <button className="cursor-pointer">Logout</button>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
