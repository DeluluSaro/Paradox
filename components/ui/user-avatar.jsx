import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ user }) => {
  return (
    <div className="flex items-center space-x-2 w-full">
      <Avatar className="h-6 w-6">
        <AvatarImage src={user?.imageUrl} alt={user?.name} />
        <AvatarFallback className="capitalize">
          {user ? user.name : "?"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 font-medium">
          {user ? user.name : "Unassigned"}
        </span>
        {user?.email && (
          <span className="text-xs text-gray-400">
            {user.email}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;