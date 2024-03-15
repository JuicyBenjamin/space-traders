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
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export interface AuthenticationProps {
  type: "login" | "signup"
}

const Authentication: FC<AuthenticationProps> = ({ type }) => {
  const handleSubmitLogin = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect("/login?message=Could not authenticate user")
    }

    return redirect("/protected")
  }

  const handleSubmitSignup = async (formData: FormData) => {
    "use server"

    const origin = headers().get("origin")
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect("/login?message=Could not authenticate user")
    }

    return redirect("/login?message=Check email to continue sign in process")
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="astronaut" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
          </div>
          {type === "login" && (
            <Button
              formAction={handleSubmitLogin}
              className="w-full"
              type="submit"
            >
              Login
            </Button>
          )}
          {type === "signup" && (
            <Button
              className="w-full"
              type="submit"
              formAction={handleSubmitSignup}
            >
              Signup
            </Button>
          )}
        </form>
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
