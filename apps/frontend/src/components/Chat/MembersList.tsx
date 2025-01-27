import { User } from "@prisma/client"
import { UserConversationWithUser } from "../../types/userConversation.type"
import { Icon } from "./ChatHeader"

// WIP: socket for online offline, also ui
// WIP: Add user to conversation

export function MembersList({ membersList }: { membersList: UserConversationWithUser[]}) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Members - { membersList.length }</p>
        <Icon icon="Plus" />
      </div>
      <div className="space-y-1">
        {
          membersList.map((member) => {
            return (
              <Member key={member.userId} user={member.user} />
            )
          })
        }
      </div>
    </div>
  )
}


const Member = ({user}: {user: User}) => {
  return (
    <div className="flex gap-2 items-center hover:bg-back-three cursor-pointer p-1 rounded-lg">
      <div className="size-[40px] bg-black rounded-full"></div>
      <p>
        {user.username}
      </p>
    </div>
  )
}
