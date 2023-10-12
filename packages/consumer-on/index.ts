// the behavior is same no matter what the eOPT flag is set in the library,
// but feel free to flip from one to the other to observe
// import { myLibraryFunction } from "library-off";
import { myLibraryFunction } from "library-on";

const fetch = () => Math.random() > 0.5 ? undefined : 'data'

const main = () => {
  const data = fetch();

  myLibraryFunction({
    requiredString: data ?? 'fallback',
    requiredStringOrUndefined: data,

    // this is a TypeScript error because the property is present
    // and we're passing something that could be a literal `undefined`
    optionalString: data,

    exactOptionalString: data,
  });

  myLibraryFunction({
    requiredString: data ?? 'fallback',
    requiredStringOrUndefined: data,

    // to fix the error, our user has no choice but to do this
    ...(data ? { optionalString: data } : {}),

    exactOptionalString: data,
  });
}