import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/assets/pages/Login";

export default function UserTooltip() {
  const { isAuthenticated } = useAuth();

  return (
    <Tooltip>
      <Dialog>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <User size={30} />
            </button>
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent side="bottom" align="center">
          {isAuthenticated ? "My Profile" : "Login"}
        </TooltipContent>

        {!isAuthenticated && (
          <DialogContent className="sm:max-w-md bg-white ">
            <LoginModal />
          </DialogContent>
        )}
      </Dialog>
    </Tooltip>
  );
}
