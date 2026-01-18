import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/assets/pages/Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { isAuthenticated, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 NOT LOGGED IN
  if (!isAuthenticated) {
    return (
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <User size={30} />
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md bg-white">
          <LoginModal
            onSuccess={() => {
              setLoginOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <User size={30} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigate("/settings")}>
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-500"
          onClick={async () => {
            await logout();
            navigate("/");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
