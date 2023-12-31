import type {
  AlertDialogActionProps as ActionProps,
  AlertDialogCancelProps as CancelProps,
  AlertDialogContentProps as ContentProps,
  AlertDialogDescriptionProps,
  AlertDialogProps as RootProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from '@radix-ui/react-alert-dialog';
import {
  Action,
  AlertDialogTrigger,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
} from '@radix-ui/react-alert-dialog';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { buttonVariants } from '@/server/button-variants';
import { cn } from '@/server/cn';
import type { ButtonProps } from '@/react/button';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const alertDialogContentVariants = cva(
  [
    'bg-background relative rounded-lg border shadow-lg focus:outline-none',
    'data-state-open:animate-content-show data-state-closed:animate-content-hide',
  ],
  {
    defaultVariants: {
      scrollable: false,
    },
    variants: {
      scrollable: {
        true: 'flex max-h-full flex-col',
      },
    },
  },
);

/* -----------------------------------------------------------------------------
 * Provider: AlertDialogContext
 * -------------------------------------------------------------------------- */

export const AlertDialogContext = React.createContext<{
  scrollable?: boolean;
}>({});

/* -----------------------------------------------------------------------------
 * Component: AlertDialog
 * -------------------------------------------------------------------------- */

export interface AlertDialogProps extends RootProps {
  scrollable?: boolean;
}

export function AlertDialog({
  scrollable = false,
  ...props
}: AlertDialogProps): React.JSX.Element {
  return (
    <AlertDialogContext.Provider value={{ scrollable }}>
      <Root {...props} />
    </AlertDialogContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: AlertDialogContent
 * -------------------------------------------------------------------------- */

export interface AlertDialogContentProps
  extends Omit<VariantProps<typeof alertDialogContentVariants>, 'scrollable'>,
    ContentProps {
  classNames?: {
    content?: string;
    overlay?: string;
  };
}
export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  AlertDialogContentProps
>(({ className, classNames, ...props }, forwardedRef) => {
  const { scrollable } = React.useContext(AlertDialogContext);

  return (
    <Portal>
      <Overlay
        className={cn(
          [
            'bg-background/80 fixed inset-0 z-40 p-4 sm:p-10',
            'data-state-open:animate-overlay-show data-state-closed:animate-overlay-hide',
          ],
          scrollable
            ? 'flex items-center justify-center'
            : 'grid place-items-center overflow-auto',
          classNames?.overlay,
        )}
        data-test-id="overlay"
      >
        <Content
          className={cn(
            alertDialogContentVariants({ scrollable }),
            className,
            classNames?.content,
          )}
          data-test-id="content"
          ref={forwardedRef}
          {...props}
        />
      </Overlay>
    </Portal>
  );
});

AlertDialogContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogAction
 * -------------------------------------------------------------------------- */

export interface AlertDialogActionProps extends ActionProps {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  shape?: ButtonProps['shape'];
  block?: ButtonProps['block'];
}

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof Action>,
  AlertDialogActionProps
>(
  (
    { className, variant = 'destructive', size, shape, block, ...props },
    forwardedRef,
  ) => (
    <Action
      className={cn(buttonVariants({ variant, size, shape, block }), className)}
      ref={forwardedRef}
      {...props}
    />
  ),
);

AlertDialogAction.displayName = Action.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogCancel
 * -------------------------------------------------------------------------- */

export interface AlertDialogCancelProps extends CancelProps {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  shape?: ButtonProps['shape'];
  block?: ButtonProps['block'];
}

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof Cancel>,
  AlertDialogCancelProps
>(
  (
    { className, variant = 'outline', size, shape, block, ...props },
    forwardedRef,
  ) => (
    <Cancel
      className={cn(buttonVariants({ variant, size, shape, block }), className)}
      ref={forwardedRef}
      {...props}
    />
  ),
);

AlertDialogCancel.displayName = Cancel.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogDescription
 * -------------------------------------------------------------------------- */

export type { AlertDialogDescriptionProps };

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  AlertDialogDescriptionProps
>(({ className, ...props }, forwardedRef) => (
  <Description
    ref={forwardedRef}
    {...props}
    className={cn('text-muted-foreground text-sm', className)}
  />
));

AlertDialogDescription.displayName = Description.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogTitle
 * -------------------------------------------------------------------------- */

export type { AlertDialogTitleProps };

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  AlertDialogTitleProps
>(({ className, ...props }, forwardedRef) => (
  <Title
    className={cn('text-lg font-semibold', className)}
    ref={forwardedRef}
    {...props}
  />
));

AlertDialogTitle.displayName = Title.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogTrigger
 * -------------------------------------------------------------------------- */

export { AlertDialogTrigger };
export type { AlertDialogTriggerProps };

/* -----------------------------------------------------------------------------
 * Component: AlertDialogHeader
 * -------------------------------------------------------------------------- */

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLElement>;

export function AlertDialogHeader({
  className,
  ...props
}: AlertDialogHeaderProps): React.JSX.Element {
  return (
    <header
      className={cn('py-3.75 grid shrink-0 gap-2 border-b px-6', className)}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: AlertDialogBody
 * -------------------------------------------------------------------------- */

export type AlertDialogBodyProps = React.HTMLAttributes<HTMLElement>;

export function AlertDialogBody({
  className,
  ...props
}: AlertDialogBodyProps): React.JSX.Element {
  return <main className={cn('grow overflow-y-auto', className)} {...props} />;
}

/* -----------------------------------------------------------------------------
 * Component: AlertDialogFooter
 * -------------------------------------------------------------------------- */

export function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn(
        'py-3.75 flex shrink-0 flex-col-reverse gap-2 border-t px-6 sm:flex-row sm:justify-between',
        className,
      )}
      {...props}
    />
  );
}
