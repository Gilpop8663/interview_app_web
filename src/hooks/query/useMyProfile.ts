import ChannelService from "@/lib/channelTalk/channelService";
import { useSuspenseQuery } from "@apollo/client";
import { ME } from "@/gql/query/user";
import { User } from "@/types/user";
import { useEffect } from "react";

interface Result {
  me: User;
}

export const useMyProfile = () => {
  const { data } = useSuspenseQuery<Result>(ME, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data.me) {
      ChannelService.boot({
        pluginKey: process.env.VITE_CHANNEL_TALK_PLUGIN_KEY,
        memberId: `${data.me.id}`, // fill user's member id
        profile: {
          name: data.me.nickname, // fill user's name
          email: data.me.email,
        },
      });
      return;
    }
  }, [data]);

  return { user: data.me };
};
