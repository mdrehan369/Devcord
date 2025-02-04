import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import Image from "next/image";
import { User } from "@prisma/client";
import { CreatePersonalConversation } from "./CreatePersonalConversation";
import { getConversationByUserId } from "../../actions/conversation.action";
import { getLoggedInUser } from "../../actions/user.action";
import { auth } from "@/auth";
import { LogOut, Settings } from "lucide-react";

const HomeSidebar = async () => {
  const session = await auth();

  const loggedUser: User | null | undefined = await getLoggedInUser();
  if (!session || !loggedUser) return null;
  const conversations = await getConversationByUserId(loggedUser.id);

  return (
    <div className="relative bg-back-two h-screen">
      <div className="flex justify-center items-center border-b-2 border-divider w-full min-h-nav">
        <Input
          placeholder="Search"
          className="w-[90%] h-[70%] py-2 rounded-sm bg-neutral-800 border-none text-secondary"
        />
      </div>
      <div className="p-2 space-y-2">
        <div className="space-y-1">
          <DMButton name="Friends" image="" href="/p" />
          <DMButton name="Shop" image="" href="/p/store" />
        </div>
        <div className="space-y-1 text-sm">
          <div className="text-neutral-400 flex justify-between font-semibold">
            <p className="">DIRECT MESSAGE</p>
            <CreatePersonalConversation />
          </div>
          {conversations?.map((conversation) => {
            return (
              <DMButton
                loggedUser={loggedUser}
                key={conversation.id}
                name={conversation.name!}
                image=""
                href={`/p/user/${conversation.id}`}
              />
            );
          })}
        </div>
      </div>
      {/* My Account */}
      <div className="absolute bottom-0 w-full">
        <AccountCard user={loggedUser} />
      </div>
    </div>
  );
};

const AccountCard = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-4 bg-neutral-800 bg-opacity-70 p-3  ">
      <Avatar className="size-[45px] border-2 border-transparent hover:border-text-hovered cursor-pointer">
        <AvatarImage src={user.image || ""} alt={""} />
        <AvatarFallback>{""}</AvatarFallback>
      </Avatar>
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <p className="text leading-none">{user.name}</p>
          <p className="text-xs text-neutral-400 leading-none">
            @{user.username}
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 text-gray-400">
          <Settings className="cursor-pointer size-5 hover:text-text-hovered" />
          <LogOut className="cursor-pointer size-5 hover:text-text-error" />
        </div>
      </div>
      <div>{/* WIP: animated svg here:- mute, headphone, settings */}</div>
    </div>
  );
};

type DMButtonProps = {
  name: string;
  image: string;
  href: string;
  loggedUser?: User;
};

const DMButton = ({ name, image, href, loggedUser }: DMButtonProps) => {
  return (
    <Link
      href={href}
      className="py-1 px-3 flex justify-between items-center rounded-lg hover:bg-white hover:bg-opacity-10 text-neutral-400 hover:text-neutral-300 font-semibold text-base transition-all ease-in"
    >
      <div className="flex items-center gap-2">
        <Avatar className="size-[40px]">
          <AvatarImage src={image} alt={""} />
          <AvatarFallback>{""}</AvatarFallback>
        </Avatar>
        <div>{name.replace(loggedUser?.username || "", "")}</div>
      </div>
      <button className="min-w-[20px] min-h-[20px] flex justify-center items-center rounded-full bg-neutral-800 bg-opacity-70 hover:bg-neutral-700 hover:bg-opacity-70">
        <Image
          src="/icons/Close.svg"
          className="text-green-500"
          alt="x"
          width={20}
          height={20}
        />
      </button>
    </Link>
  );
};

export default HomeSidebar;
