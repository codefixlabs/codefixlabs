import {
  type CollapsibleContentProps,
  type CollapsibleProps,
  type CollapsibleTriggerProps,
  Collapsible,
  CollapsibleTrigger,
  Content,
} from '@radix-ui/react-collapsible';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Collapsible
 * -------------------------------------------------------------------------- */

export { Collapsible };
export type { CollapsibleProps };

/* -----------------------------------------------------------------------------
 * Component: CollapsibleTrigger
 * -------------------------------------------------------------------------- */

export { CollapsibleTrigger };
export type { CollapsibleTriggerProps };

/* -----------------------------------------------------------------------------
 * Component: CollapsibleContent
 * -------------------------------------------------------------------------- */

export type { CollapsibleContentProps };

export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  CollapsibleContentProps
>(({ className, ...props }, forwardedRef) => (
  <Content
    className={cn(
      'data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

CollapsibleContent.displayName = Content.displayName;
