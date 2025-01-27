"use client"
import { useSearchParams } from "next/navigation";
import { AuthResponseMsg } from "@/types/auth.type";
import { CiWarning } from "react-icons/ci";


const ErrorCard = () => {
  const query = useSearchParams()
  const error = query.get("error")

  const isValidError = (error: string | null): error is AuthResponseMsg => {
    return Object.values(AuthResponseMsg).includes(error as AuthResponseMsg);
  };

  return (
    <>
      {error && isValidError(error) && (
        <div
          className="w-full border border-destructive bg-destructive/20 p-3 rounded-md flex gap-2 items-center justify-center text-destructive font-bold text-md"
        >
          <CiWarning className="text-2xl" />
          {error}
        </div>
      )}
    </>
  )
}

export default ErrorCard
