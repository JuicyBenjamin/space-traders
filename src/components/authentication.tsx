import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FC } from "react"

export interface AuthenticationProps {
  type: "login" | "signup"
}

export const authentication: FC<AuthenticationProps> = ({ type }) => {
  const handleClickLogin = () => {
    console.log("login")
  }

  const handleClickSignup = () => {
    console.log("signup")
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access the spaceport
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="astronaut" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
          </div>
          {type === "login" && (
            <Button className="w-full" type="submit">
              Login
            </Button>
          )}
          {type === "signup" && (
            <Button className="w-full" type="submit">
              Signup
            </Button>
          )}
        </div>
        <div className="mt-4 text-center text-sm">
          {type === "login" && <Button>Forgot your password?</Button>}
          {type === "signup" && (
            <Link className="underline" href="#">
              Have an account? Login here.
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
