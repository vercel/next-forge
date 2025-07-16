'use client';

import { KnockFeedProvider, KnockProvider } from '@knocklabs/react';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import { keys } from '../keys';

const knockApiKey = keys().NEXT_PUBLIC_KNOCK_API_KEY;
const knockFeedChannelId = keys().NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID;

type NotificationsProviderProps = {
  children: ReactNode;
  userId: string;
};

export const NotificationsProvider = ({
  children,
  userId,
}: NotificationsProviderProps) => {
  if (!knockApiKey || !knockFeedChannelId) {
    return children;
  }

  const { theme: rawTheme } = useTheme();
  const theme = rawTheme === 'dark' ? 'dark' : 'light';

  return (
    <KnockProvider apiKey={knockApiKey} userId={userId}>
      <KnockFeedProvider feedId={knockFeedChannelId} colorMode={theme}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
};
