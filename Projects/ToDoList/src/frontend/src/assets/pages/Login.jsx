import { useState ,useEffect} from "react"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"

export default function LoginModal() {
  const [mode, setMode] = useState("login")

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const password = watch("password")

  useEffect(() => {
    reset()
  }, [mode, reset])

  const onSubmit = (data) => {
    console.log(mode, data)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{mode === "login" ? "Login" : "Create Account"}</DialogTitle>
        <DialogDescription>
           {mode === "login"
            ? "Enter your credentials to log in"
            : "Fill details to create a new account"}
        </DialogDescription>
      </DialogHeader>


      {mode==="login "?(
        // Login Form
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors?.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message:
                    "Password must include uppercase, lowercase, number, and special character"
                }
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">{mode === "login" ? "Login" : "Sign Up"}</Button>


          
        </DialogFooter>
      </form>
      ):(
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 py-4">

            <div className="grid gap-2">
              <Label>First Name</Label>
              <Input
                placeholder="John"
                {...register("fname", { required: "First name is required" })}
              />
              {errors.fname && (
                <p className="text-sm text-red-500">{errors.fname.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Last Name</Label>
              <Input
                placeholder="Doe"
                {...register("lname", { required: "Last name is required" })}
              />
              {errors.lname && (
                <p className="text-sm text-red-500">{errors.lname.message}</p>
              )}
            </div>

            <div className="grid col-span-2 gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors?.email.message}</p>
            )}
          </div>

            <div className="grid gap-2 col-span-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    message:
                      "Must include uppercase, lowercase, number & symbol",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="grid gap-2 col-span-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{mode==="login" ?`Login`:`Sign Up`}</Button>
          </DialogFooter>
        </form>
      )}

      
      <button href="" className="text-sm text-muted-foreground hover:underline"
          onClick={()=>{
            setMode(mode === "login" ? "signup":"login") 

          }}>
            {mode === "login"?(
              <p>New to the BoAt Platform? <span className="text-red-600">SignUp Now</span></p>
              ):(
                <p>Already have an account? <span className="text-red-600">Login</span></p>
                )}
      </button>
    </>
  )
}
