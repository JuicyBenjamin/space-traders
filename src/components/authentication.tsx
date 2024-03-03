"use client"

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
import { FC, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

export interface AuthenticationProps {
  type: "login" | "signup"
}

const Authentication: FC<AuthenticationProps> = ({ type }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleClickLogin = () => {
    supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  const handleClickSignup = () => {
    supabase.auth.signUp({
      email,
      password,
    })
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="astronaut"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              required
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {type === "login" && (
            <Button onClick={handleClickLogin} className="w-full" type="submit">
              Login
            </Button>
          )}
          {type === "signup" && (
            <Button
              onClick={handleClickSignup}
              className="w-full"
              type="submit"
            >
              Signup
            </Button>
          )}
        </div>
        <div className="mt-4 text-center text-sm">
          {type === "login" && (
            <Link className="underline" href="/signup">
              Don&apos;t have an account? Signup here.
            </Link>
          )}
          {type === "signup" && (
            <Link className="underline" href="/login">
              Have an account? Login here.
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Authentication
