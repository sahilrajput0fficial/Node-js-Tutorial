import {
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function LoginModal() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
      </DialogHeader>

      {/* Your login form */}
      <div className="space-y-4">
        <input className="w-full border p-2" placeholder="Email" />
        <input className="w-full border p-2" type="password" placeholder="Password" />
        <Button className="w-full">Login</Button>
      </div>
    </>
  );
}
