import { PropsWithChildren, useEffect } from "react";
import ChannelService from "./channelService";

export default function ChannelTalkProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    ChannelService.loadScript();

    ChannelService.boot({
      pluginKey: process.env.VITE_CHANNEL_TALK_PLUGIN_KEY,
    });
  }, []);

  return <div>{children}</div>;
}
