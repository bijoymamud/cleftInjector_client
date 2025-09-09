import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";

const navigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Contact", to: "/contact" },
];

export function Navbar() {
  const pathname = useLocation();

  return (
    <nav className="shadow-md h-[100px] flex flex-col items-center justify-center">
      <div className="container mx-auto">
        <div className="flex justify-between items-center ">
          <div>
            <img
              src="https://i.ibb.co.com/tp5FFNsL/Frame-2.png"
              alt=""
              className="w-[180px]"
            />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="hidden sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-green-900 text-[20px] font-medium transition-colors",
                      isActive
                        ? "border-primary text-[#CC6023]"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center rounded-[12px] bg-gradient-to-r from-[#E26C29] via-[#CD5E1F] to-[#9F5328] h-[50px] w-[160px]">
            <Link className="flex items-center gap-2 mx-auto text-[19px]  text-white">
              <FaRegUser size={20} />
              Get Listed
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border"
                )}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="px-3 py-2">
            <Button asChild className="w-full">
              <Link href="/get-started">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
