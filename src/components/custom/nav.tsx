import { useAuth0 } from "@auth0/auth0-react";
import { CalendarRange } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Nav = () => {
  const { isAuthenticated, logout } = useAuth0();
  return (
    <nav className="border-b border-b-muted py-8 px-12 flex items-center justify-between">
      <div className="flex gap-x-2">
        <CalendarRange className="text-neutral-700" />
        <h1 className="text-xl font-bold">Calendify</h1>
      </div>
      {isAuthenticated && (
        <Popover>
          <PopoverTrigger>Account</PopoverTrigger>
          <PopoverContent className="w-auto">
            <Button
              onClick={() => logout()}
              variant="ghost"
              className="bg-transparent hover:bg-red-100"
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </nav>
  );
};

export default Nav;
