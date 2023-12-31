'use client';

import { twMerge } from 'tailwind-merge';
import { BellIcon, CheckIcon } from 'lucide-react';
import {
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Switch,
} from '@codefixlabs/ui';

const notifications = [
  {
    description: '1 hour ago',
    title: 'Your call has been confirmed.',
  },
  {
    description: '1 hour ago',
    title: 'You have a new message!',
  },
  {
    description: '2 hours ago',
    title: 'Your subscription is expiring soon!',
  },
];

export function Notification({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div className={twMerge(className)}>
      <Card className="w-screen max-w-md">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardBody className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <BellIcon className="size-4 shrink-0" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Push Notifications</p>
              <p className="text-muted-foreground text-sm">
                Send notifications to device.
              </p>
            </div>
            <Switch />
          </div>
          <div>
            {notifications.map((notification) => (
              <div
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                key={notification.title}
              >
                <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-muted-foreground text-sm">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter>
          <Button
            className="w-full"
            startIcon={<CheckIcon className="size-4" />}
          >
            Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
