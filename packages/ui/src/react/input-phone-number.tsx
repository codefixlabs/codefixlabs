import { useCountries } from '@codefixlabs/hooks';
import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/react/popover';
import { type PrimitiveInputProps, PrimitiveInput } from '@/react/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/react/command';
import { buttonVariants } from '@/server/button-variants';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: InputPhoneNumber
 * -------------------------------------------------------------------------- */

export interface InputPhoneNumberProps
  extends Omit<
    PrimitiveInputProps,
    'type' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'
  > {
  value?: {
    phoneCode: string;
    phoneNumber?: string | null;
  };
  defaultValue?: {
    phoneCode: string;
    phoneNumber?: string | null;
  };
  onChange?: (value: { phoneCode: string; phoneNumber: string }) => void;
  onBlur?: (value: { phoneCode: string; phoneNumber: string }) => void;
}

export const InputPhoneNumber = React.forwardRef<
  React.ElementRef<typeof PrimitiveInput>,
  InputPhoneNumberProps
>(
  (
    { className, value, defaultValue, onBlur, onChange, ...props },
    forwardedRef,
  ) => {
    const [open, setOpen] = React.useState(false);
    const { countries } = useCountries();

    const currentCountry = React.useMemo(
      () =>
        countries.find(
          (country) =>
            country.phonecode === (value?.phoneCode ?? defaultValue?.phoneCode),
        ),
      [countries, defaultValue?.phoneCode, value?.phoneCode],
    );

    return (
      <div
        className={cn(
          'relative items-center gap-2',
          props.inline ? 'inline-flex' : 'flex',
        )}
      >
        <Popover onOpenChange={setOpen} open={open} variant="simple">
          <PopoverTrigger
            className={cn(
              buttonVariants({ size: props.size, variant: 'outline' }),
              'shrink-0 px-3 font-normal',
              props.size === 'sm' ? 'text-xs' : 'text-sm',
            )}
          >
            {currentCountry ? (
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentCountry.flag}</span>
                <span>{currentCountry.phonecode}</span>
              </div>
            ) : (
              'Select Country'
            )}
          </PopoverTrigger>

          <PopoverContent align="start">
            <Command loop variant="dialog">
              <CommandInput placeholder="Search for a country" />
              <CommandList className="max-h-[clamp(6.25rem,calc(var(--radix-popover-content-available-height)-3.75rem),25rem)]">
                <CommandEmpty>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex size-12 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-2xl">🌎</span>
                    </div>
                    <p className="text-sm text-gray-500">No countries found</p>
                  </div>
                </CommandEmpty>

                <CommandGroup>
                  {countries.map((country) => {
                    const selected = country.phonecode === value?.phoneCode;

                    return (
                      <CommandItem
                        className="justify-between"
                        key={country.isoCode}
                        onSelect={() => {
                          onChange?.({
                            phoneCode: country.phonecode,
                            phoneNumber: value?.phoneNumber ?? '',
                          });
                          setOpen(false);
                        }}
                        value={`${country.phonecode} ${country.name} ${country.isoCode}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{country.flag}</span>
                          <span
                            className={selected ? 'font-medium' : undefined}
                          >
                            {country.name}
                          </span>
                        </div>
                        <span
                          className={cn(
                            selected ? 'font-bold' : 'text-muted-foreground',
                          )}
                        >
                          {country.phonecode}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <PrimitiveInput
          className={cn(className)}
          defaultValue={defaultValue?.phoneNumber ?? undefined}
          inputMode="tel"
          ref={forwardedRef}
          type="tel"
          value={value?.phoneNumber ?? undefined}
          {...props}
          onBlur={(event) => {
            onBlur?.({
              phoneCode: value?.phoneCode ?? '',
              phoneNumber: event.target.value.replace(/[^0-9+]/g, ''),
            });
          }}
          onChange={(event) => {
            onChange?.({
              phoneCode: value?.phoneCode ?? '',
              phoneNumber: event.target.value.replace(/[^0-9+]/g, ''),
            });
          }}
        />
      </div>
    );
  },
);

InputPhoneNumber.displayName = 'InputPhoneNumber';
