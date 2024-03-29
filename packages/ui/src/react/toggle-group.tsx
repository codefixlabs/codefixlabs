import {
  type ToggleGroupItemProps as ItemProps,
  Item,
  Root,
} from '@radix-ui/react-toggle-group';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { type ToggleGroupProps } from '@radix-ui/react-toolbar';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const toggleGroupItemVariants = cva(
  [
    'inline-flex items-center justify-center text-sm font-medium transition-colors',
    'first:rounded-l-md last:rounded-r-md',
    'hover:bg-primary hover:text-primary-foreground',
    'ring-offset-background',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
    variants: {
      size: {
        lg: 'h-11 px-5',
        md: 'h-10 px-3',
        sm: 'h-9 px-2.5',
      },
      variant: {
        outline: [
          'border-input border bg-transparent',
          'hover:bg-primary hover:text-primary-foreground',
        ],
        default: 'bg-transparent',
      },
    },
  },
);

type ToggleGroupItemVariantsProps = VariantProps<
  typeof toggleGroupItemVariants
>;

/* -----------------------------------------------------------------------------
 * Component: ToggleGroup
 * -------------------------------------------------------------------------- */

export type { ToggleGroupProps };

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof Root>,
  ToggleGroupProps
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={cn(
      'bg-muted text-muted-foreground inline-flex space-x-px rounded-md',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

ToggleGroup.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToggleGroupItem
 * -------------------------------------------------------------------------- */

export interface ToggleGroupItemProps
  extends ItemProps,
    ToggleGroupItemVariantsProps {}

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  ToggleGroupItemProps
>(({ className, variant, size, ...props }, forwardedRef) => (
  <Item
    className={cn(toggleGroupItemVariants({ size, variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

ToggleGroupItem.displayName = Item.displayName;
