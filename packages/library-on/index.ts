export const myLibraryFunction = (
  options: {
    requiredString: string;
    requiredStringOrUndefined: string | undefined;
    optionalString?: string;
    exactOptionalString?: string | undefined;
  }
) => {
  return Object.keys(options);
}