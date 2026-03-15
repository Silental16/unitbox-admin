import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="#"
          className="flex items-center justify-center self-center"
        >
          <Image
            src="/unitbox.svg"
            alt="Unitbox"
            width={160}
            height={32}
            className="h-8 w-auto dark:invert"
            priority
          />
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
