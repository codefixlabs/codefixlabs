import { type VariantProps, cva } from 'class-variance-authority';
import {
  CommandEmpty as Empty,
  CommandGroup as Group,
  CommandInput as Input,
  CommandItem as Item,
  CommandList as List,
  CommandLoading as Loading,
  CommandRoot as Root,
  CommandSeparator as Separator,
} from 'cmdk';
import { SearchIcon } from 'lucide-react';
import * as React from 'react';
import {
  type DialogProps as CommandDialogProps,
  Dialog,
  DialogContent,
} from '@/react/dialog';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const commandVariants = cva(
  'bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-md',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        dialog: undefined,
        default: 'border shadow-lg',
      },
    },
  },
);

type CommandVariantsProps = VariantProps<typeof commandVariants>;

/* -----------------------------------------------------------------------------
 * Component: Command
 * -------------------------------------------------------------------------- */

export interface CommandProps
  extends React.ComponentPropsWithoutRef<typeof Root>,
    CommandVariantsProps {}

export const Command = React.forwardRef<
  React.ElementRef<typeof Root>,
  CommandProps
>(({ className, variant, ...props }, forwardedRef) => (
  <Root
    className={cn(commandVariants({ variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

Command.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandInput
 * -------------------------------------------------------------------------- */

export type CommandInputProps = React.ComponentPropsWithoutRef<typeof Input>;

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  CommandInputProps
>(({ className, ...props }, forwardedRef) => (
  <div className="flex items-center gap-2 border-b px-3">
    <SearchIcon className="shrink-0 opacity-50" size={20} />
    <Input
      className={cn(
        'placeholder:text-muted-foreground h-11 w-full min-w-0 rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  </div>
));

CommandInput.displayName = Input.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandList
 * -------------------------------------------------------------------------- */

export type CommandListProps = React.ComponentPropsWithoutRef<typeof List>;

export const CommandList = React.forwardRef<
  React.ElementRef<typeof List>,
  CommandListProps
>(({ className, ...props }, forwardedRef) => (
  <List
    className={cn('overflow-y-auto overflow-x-hidden', className)}
    ref={forwardedRef}
    {...props}
  />
));

CommandList.displayName = List.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandLoading
 * -------------------------------------------------------------------------- */

export type CommandLoadingProps = React.ComponentPropsWithoutRef<
  typeof Loading
>;

export const CommandLoading = React.forwardRef<
  React.ElementRef<typeof Loading>,
  CommandLoadingProps
>(({ ...props }, forwardedRef) => <Loading ref={forwardedRef} {...props} />);

CommandLoading.displayName = Loading.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandEmpty
 * -------------------------------------------------------------------------- */

export type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof Empty>;

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof Empty>,
  CommandEmptyProps
>(({ className, ...props }, forwardedRef) => (
  <Empty
    className={cn('py-6 text-center text-sm', className)}
    ref={forwardedRef}
    {...props}
  />
));

CommandEmpty.displayName = Empty.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandGroup
 * -------------------------------------------------------------------------- */

export type CommandGroupProps = React.ComponentPropsWithoutRef<typeof Group>;

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof Group>,
  CommandGroupProps
>(({ className, ...props }, forwardedRef) => (
  <Group
    className={cn(
      '[&_[cmdk-group-heading]]:text-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-items]]:space-y-0.5',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

CommandGroup.displayName = Group.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandSeparator
 * -------------------------------------------------------------------------- */

export type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof Separator
>;

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  CommandSeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={cn('bg-border h-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

CommandSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandItem
 * -------------------------------------------------------------------------- */

export type CommandItemProps = React.ComponentPropsWithoutRef<typeof Item>;

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  CommandItemProps
>(({ className, ...props }, forwardedRef) => (
  <Item
    className={cn(
      'hover:text-accent-foreground hover:bg-accent aria-selected:text-accent-foreground aria-selected:bg-accent group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

CommandItem.displayName = Item.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandDialog
 * -------------------------------------------------------------------------- */

export type { CommandDialogProps };

export function CommandDialog({
  children,
  ...props
}: CommandDialogProps): React.JSX.Element {
  return (
    <Dialog scrollable variant="simple" {...props}>
      <DialogContent className="w-full max-w-md">
        <Command variant="dialog">{children}</Command>
      </DialogContent>
    </Dialog>
  );
}
