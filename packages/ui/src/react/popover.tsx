import {
  type PopoverAnchorProps,
  type PopoverArrowProps,
  type PopoverCloseProps,
  type PopoverContentProps,
  type PopoverProps as RootProps,
  type PopoverTriggerProps,
  Arrow,
  Content,
  PopoverAnchor,
  PopoverClose,
  PopoverTrigger,
  Portal,
  Root,
} from '@radix-ui/react-popover';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/server/cn';
import { buttonVariants } from '@/server/button-variants';

/* -----------------------------------------------------------------------------
 * Provider: PopoverContext
 * -------------------------------------------------------------------------- */

export const PopoverContext = React.createContext<{
  variant?: 'default' | 'simple';
}>({});

/* -----------------------------------------------------------------------------
 * Component: Popover
 * -------------------------------------------------------------------------- */

export interface PopoverProps extends RootProps {
  variant?: 'default' | 'simple';
}

export function Popover({
  variant = 'default',
  ...props
}: PopoverProps): React.JSX.Element {
  return (
    <PopoverContext.Provider value={{ variant }}>
      <Root {...props} />
    </PopoverContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: PopoverAnchor
 * -------------------------------------------------------------------------- */

export { PopoverAnchor };
export type { PopoverAnchorProps };

/* -----------------------------------------------------------------------------
 * Component: PopoverTrigger
 * -------------------------------------------------------------------------- */

export { PopoverTrigger };
export type { PopoverTriggerProps };

/* -----------------------------------------------------------------------------
 * Component: PopoverClose
 * -------------------------------------------------------------------------- */

export { PopoverClose };
export type { PopoverCloseProps };

/* -----------------------------------------------------------------------------
 * Component: PopoverArrow
 * -------------------------------------------------------------------------- */

export type { PopoverArrowProps };

export const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof Arrow>,
  PopoverArrowProps
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={cn('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

PopoverArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: PopoverContent
 * -------------------------------------------------------------------------- */

export type { PopoverContentProps };

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  PopoverContentProps
>(({ children, className, ...props }, forwardedRef) => {
  const { variant } = React.useContext(PopoverContext);

  return (
    <Portal>
      <Content
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:data-[side=top]:animate-slide-in-from-top data-[state=open]:data-[side=bottom]:animate-slide-in-from-bottom data-[state=open]:data-[side=left]:animate-slide-in-from-left data-[state=open]:data-[side=right]:animate-slide-in-from-right data-[state=closed]:data-[side=top]:animate-slide-out-to-top data-[state=closed]:data-[side=bottom]:animate-slide-out-to-bottom data-[state=closed]:data-[side=left]:animate-slide-out-to-left data-[state=closed]:data-[side=right]:animate-slide-out-to-right relative z-40 w-auto min-w-[var(--radix-popover-trigger-width)] rounded-md border shadow-lg will-change-[opacity,transform]',
          className,
        )}
        ref={forwardedRef}
        sideOffset={5}
        {...props}
      >
        <>
          {children}

          {variant === 'default' && (
            <PopoverClose
              aria-label="Close"
              className={cn(
                buttonVariants({ icon: true, size: 'sm', variant: 'ghost' }),
                'absolute right-2.5 top-2.5 rounded-full',
              )}
            >
              <XIcon size={16} />
            </PopoverClose>
          )}
        </>
      </Content>
    </Portal>
  );
});

PopoverContent.displayName = Content.displayName;
