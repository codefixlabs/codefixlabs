import {
  Arrow,
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-context-menu';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: ContextMenuItemIndicator
 * -------------------------------------------------------------------------- */

export const ContextMenuItemIndicator = forwardRef<
  React.ElementRef<typeof ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof ItemIndicator>
>(({ className, ...props }, forwardedRef) => (
  <ItemIndicator
    className={twMerge(
      'absolute left-0 inline-flex w-8 items-center justify-center',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

ContextMenuItemIndicator.displayName = ItemIndicator.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuShortcut
 * -------------------------------------------------------------------------- */

export function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      className={twMerge(
        'text-muted-foreground ml-auto flex pl-4 text-xs',
        className,
      )}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: ContextMenuContent
 * -------------------------------------------------------------------------- */

export const ContextMenuContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={twMerge(
        'bg-popover text-popover-foreground relative z-40 min-w-[8rem] rounded-md border p-1 shadow-lg',
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  </Portal>
));

ContextMenuContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuSubContent
 * -------------------------------------------------------------------------- */

export const ContextMenuSubContent = forwardRef<
  React.ElementRef<typeof SubContent>,
  React.ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <SubContent
      className={twMerge(
        'bg-popover text-popover-foreground relative z-40 min-w-[8rem] rounded-md border p-1 shadow-lg will-change-[opacity,transform]',
        [
          'data-state-open:data-side-top:animate-slide-in-from-bottom',
          'data-state-open:data-side-bottom:animate-slide-in-from-top',
          'data-state-open:data-side-left:animate-slide-in-from-right',
          'data-state-open:data-side-right:animate-slide-in-from-left',
        ],
        [
          'data-state-closed:data-side-top:animate-slide-out-to-bottom',
          'data-state-closed:data-side-bottom:animate-slide-out-to-top',
          'data-state-closed:data-side-left:animate-slide-out-to-right',
          'data-state-closed:data-side-right:animate-slide-out-to-left',
        ],
        className,
      )}
      ref={forwardedRef}
      sideOffset={2}
      {...props}
    />
  </Portal>
));

ContextMenuSubContent.displayName = SubContent.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuSubTrigger
 * -------------------------------------------------------------------------- */

const contextMenuSubTriggerVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm outline-none',
    'data-disabled:opacity-50 data-disabled:pointer-events-none',
  ],
  {
    defaultVariants: {
      inset: false,
      variant: 'default',
    },
    variants: {
      inset: {
        true: 'pl-8',
      },
      variant: {
        default: [
          'focus:bg-accent focus:text-accent-foreground',
          'data-state-open:bg-accent data-state-open:text-accent-foreground',
          'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
          'data-highlighted:data-state-open:bg-accent data-highlighted:data-state-open:text-accent-foreground',
        ],
        destructive: [
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-state-open:bg-destructive-foreground data-state-open:text-destructive',
          'data-highlighted:bg-destructive-foreground data-highlighted:text-destructive',
          'data-highlighted:data-state-open:bg-destructive-foreground data-highlighted:data-state-open:text-destructive',
        ],
      },
    },
  },
);

export const ContextMenuSubTrigger = forwardRef<
  React.ElementRef<typeof SubTrigger>,
  React.ComponentPropsWithoutRef<typeof SubTrigger> &
    VariantProps<typeof contextMenuSubTriggerVariants>
>(({ children, className, inset, variant, ...props }, forwardedRef) => (
  <SubTrigger
    className={twMerge(
      contextMenuSubTriggerVariants({
        className,
        inset,
        variant,
      }),
    )}
    ref={forwardedRef}
    {...props}
  >
    <>
      {children}
      <ContextMenuShortcut>
        <ChevronRightIcon className="text-accent-foreground h-4 w-4" />
      </ContextMenuShortcut>
    </>
  </SubTrigger>
));

ContextMenuSubTrigger.displayName = SubTrigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuItem
 * -------------------------------------------------------------------------- */

const contextMenuItemVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm outline-none',
    'data-disabled:opacity-50 data-disabled:pointer-events-none',
  ],
  {
    defaultVariants: {
      inset: false,
      variant: 'default',
    },
    variants: {
      inset: {
        true: 'pl-8',
      },
      variant: {
        default: [
          'focus:bg-accent focus:text-accent-foreground',
          'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        ],
        destructive: [
          'text-destructive',
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-highlighted:bg-destructive-foreground data-highlighted:text-destructive',
        ],
      },
    },
  },
);

export const ContextMenuItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item> & {
    shortcut?: string;
  } & VariantProps<typeof contextMenuItemVariants>
>(
  (
    { children, className, inset, variant, shortcut, ...props },
    forwardedRef,
  ) => (
    <Item
      className={twMerge(
        contextMenuItemVariants({
          className,
          inset,
          variant,
        }),
      )}
      ref={forwardedRef}
      {...props}
    >
      {props.asChild ? (
        children
      ) : (
        <>
          {children}
          {shortcut ? (
            <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
          ) : null}
        </>
      )}
    </Item>
  ),
);

ContextMenuItem.displayName = Item.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuCheckboxItem
 * -------------------------------------------------------------------------- */

const contextMenuCheckboxItemVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 pl-8 text-sm outline-none',
    'data-disabled:opacity-50 data-disabled:pointer-events-none',
  ],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: [
          'focus:bg-accent focus:text-accent-foreground',
          'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        ],
        destructive: [
          'text-destructive',
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-highlighted:bg-destructive-foreground data-highlighted:text-destructive',
        ],
      },
    },
  },
);

export const ContextMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof CheckboxItem> & {
    shortcut?: string;
  } & VariantProps<typeof contextMenuCheckboxItemVariants>
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <CheckboxItem
    className={twMerge(
      contextMenuCheckboxItemVariants({
        className,
        variant,
      }),
    )}
    ref={forwardedRef}
    {...props}
  >
    <>
      <ContextMenuItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </ContextMenuItemIndicator>
      {children}
      {shortcut ? <ContextMenuShortcut>{shortcut}</ContextMenuShortcut> : null}
    </>
  </CheckboxItem>
));

ContextMenuCheckboxItem.displayName = CheckboxItem.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuRadioItem
 * -------------------------------------------------------------------------- */

const contextMenuRadioItemVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 pl-8 text-sm outline-none',
    'data-disabled:opacity-50 data-disabled:pointer-events-none',
  ],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: [
          'focus:bg-accent focus:text-accent-foreground',
          'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        ],
        destructive: [
          'text-destructive',
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-highlighted:bg-destructive-foreground data-highlighted:text-destructive',
        ],
      },
    },
  },
);

export const ContextMenuRadioItem = forwardRef<
  React.ElementRef<typeof RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadioItem> & {
    shortcut?: string;
  } & VariantProps<typeof contextMenuRadioItemVariants>
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <RadioItem
    className={twMerge(contextMenuRadioItemVariants({ className, variant }))}
    ref={forwardedRef}
    {...props}
  >
    <>
      <ContextMenuItemIndicator>
        <DotIcon className="h-4 w-4" />
      </ContextMenuItemIndicator>
      {children}
      {shortcut ? <ContextMenuShortcut>{shortcut}</ContextMenuShortcut> : null}
    </>
  </RadioItem>
));

ContextMenuRadioItem.displayName = RadioItem.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuArrow
 * -------------------------------------------------------------------------- */

export const ContextMenuArrow = forwardRef<
  React.ElementRef<typeof Arrow>,
  React.ComponentPropsWithoutRef<typeof Arrow>
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={twMerge('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

ContextMenuArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuGroup
 * -------------------------------------------------------------------------- */

export const ContextMenuGroup = Group;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuLabel
 * -------------------------------------------------------------------------- */

const contextMenuLabelVariants = cva(
  'text-foreground cursor-default px-2 py-1.5 text-sm font-semibold',
  {
    defaultVariants: {
      inset: false,
    },
    variants: {
      inset: {
        true: 'pl-8',
      },
    },
  },
);

export const ContextMenuLabel = forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> &
    VariantProps<typeof contextMenuLabelVariants>
>(({ className, inset = false, ...props }, forwardedRef) => (
  <Label
    className={twMerge(contextMenuLabelVariants({ className, inset }))}
    ref={forwardedRef}
    {...props}
  />
));

ContextMenuLabel.displayName = Label.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuRadioGroup
 * -------------------------------------------------------------------------- */

export const ContextMenuRadioGroup = RadioGroup;

/* -----------------------------------------------------------------------------
 * Component: ContextMenu
 * -------------------------------------------------------------------------- */

export const ContextMenu = Root;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuSeparator
 * -------------------------------------------------------------------------- */

export const ContextMenuSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={twMerge('bg-border -mx-1 my-1.5 h-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

ContextMenuSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuSub
 * -------------------------------------------------------------------------- */

export const ContextMenuSub = Sub;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuTrigger
 * -------------------------------------------------------------------------- */

export const ContextMenuTrigger = Trigger;
