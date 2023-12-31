import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function isValidPhoneNumber({
  phoneNumber,
  phoneCode,
}: {
  phoneNumber?: string | null | undefined;
  phoneCode: string;
}): boolean {
  const parsedPhoneNumber = parsePhoneNumberFromString(
    `${phoneCode}${phoneNumber}`,
  );

  if (!parsedPhoneNumber) {
    return false;
  }

  return parsedPhoneNumber.isValid();
}
