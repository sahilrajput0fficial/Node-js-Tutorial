import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function UserTooltip() {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);
    


  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <User size={30} />
          </button>
        </TooltipTrigger>

        {isAuthenticated ? (
          <TooltipContent className="bg-black text-white" side="bottom" align="center">
            <>
            <p>My Profile</p>
            </>
          </TooltipContent>
        ):(
            <TooltipContent className="bg-black text-white" side="bottom" align="center">
            <>
            <p>Login </p>
            </>
          </TooltipContent>

        )}
      </Tooltip>
    </div>
  );
}
