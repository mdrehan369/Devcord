import { auth } from "@/auth"
import { cache } from "react"

export const getAuthUser = cache(async () => {
  const session = await auth()



})
