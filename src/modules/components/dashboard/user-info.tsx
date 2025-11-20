import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "better-auth";

const UserInfo = ({ role, user }: { role: string; user: User | null }) => {
  return (
    <div className="">
      <div>
        <Button variant="secondary" className="flex h-full w-full">
          <div className="flex w-full items-center justify-between gap-2 text-left">
            <Avatar className="size-16">
              <AvatarImage
                src={
                  user?.image ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                }
                alt={user?.name || "user"}
              />
              <AvatarFallback className="bg-primary text-foreground">
                TA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-y-0.5">
              <span>{user?.name}</span>
              <span className="text-muted-foreground">{user?.email}</span>
              <span className="w-fit">
                <Badge variant="outline">{role}</Badge>
              </span>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
