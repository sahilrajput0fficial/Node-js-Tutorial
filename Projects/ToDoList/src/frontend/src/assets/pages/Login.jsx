import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useAuth } from "@/context/AuthContext"

export default function LoginModal({ onSuccess }) {
  const [mode, setMode] = useState("login")
  const { login } = useAuth()

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

  const onSubmit = async (data) => {
    if (mode === "signup") {
      await signUp(data)
      onSuccess()
    } else {
      await login(data.email, data.password)
      onSuccess()
    }
  }

  const inputStyle =
    "rounded-xl bg-background border-border focus:ring-2 focus:ring-primary/40 focus:border-primary"

  const errorStyle = "text-sm text-destructive mt-1"

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-foreground">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </DialogTitle>
        <DialogDescription className="text-muted-foreground">
          {mode === "login"
            ? "Sign in to continue your journey"
            : "Fill in your details to get started"}
        </DialogDescription>
      </DialogHeader>

      {mode === "login" ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className={inputStyle}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className={errorStyle}>{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              className={inputStyle}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            {errors.password && (
              <p className={errorStyle}>{errors.password.message}</p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-border"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
            >
              Login
            </Button>
          </DialogFooter>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                placeholder="John"
                className={inputStyle}
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className={errorStyle}>{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                placeholder="Doe"
                className={inputStyle}
                {...register("lastName", {
                  required: "Last name is required",
                })}
              />
              {errors.lastName && (
                <p className={errorStyle}>{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className={inputStyle}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className={errorStyle}>{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              className={inputStyle}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            {errors.password && (
              <p className={errorStyle}>{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm password"
              className={inputStyle}
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className={errorStyle}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-border"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
            >
              Sign Up
            </Button>
          </DialogFooter>
        </form>
      )}

      {/* Toggle Mode */}
      <div className="text-center mt-6">
        <button
          className="text-sm text-muted-foreground hover:text-primary transition"
          onClick={() =>
            setMode(mode === "login" ? "signup" : "login")
          }
        >
          {mode === "login"
            ? "New here? Create an account"
            : "Already have an account? Login"}
        </button>
      </div>

      {/* Google Sign In */}
      <Button
        variant="outline"
        className="w-full mt-4 rounded-xl border-border hover:bg-muted transition"
        onClick={() => {
          window.location.href = "http://localhost:5000/google"
        }}
      >
        Sign In with Google
      </Button>
    </>
  )
}