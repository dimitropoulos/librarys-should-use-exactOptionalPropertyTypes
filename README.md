# exactOptionalPropertyTypes (`exactOptionalPropertyTypes`)

Either your library has `exactOptionalPropertyTypes` on or off, and either your consumer has `exactOptionalPropertyTypes` on or off.  Therefore, four possibilities exist:

| | library off | library on |
| - | - | - |
| consumer off | :zzz: both you and your users are unaware of the problem | :thumbsup: user unaffected, but your library code is more correct |
| consumer on  |  :japanese_goblin: USER HAS A PROBLEM, but you don't realize it | :muscle: best of all worlds.  everybody's happy |

## when `consumer` has `exactOptionalPropertyTypes` _off_

Everyone's happy.

_HOWEVER_...

## when `consumer` has `exactOptionalPropertyTypes` _on_

You (probably without realizing it) put them in a sticky situation if you don't also have it on.

If you write your types like this:

```ts
const someFunction = (someOption: {
  someOtherProperty: boolean;
  someProperty?: string;
}) => {
  // ..
}
```

you are _forcing_ your user to do

```ts
const someProperty: string | undefined = someUserOperation();

someFunction({
  someOtherProperty,
  ...(someProperty ? { someProperty } : {}),
});
```

When if you had written your type more exactly (and enforced it in your own codebase by enabling `exactOptionalPropertyTypes`) then your code would look like this:

```diff
const someFunction = (someOption: {
  someOtherProperty: boolean;
- someProperty?: string;
+ someProperty?: string | undefined;
}) => {
  // ..
}
```

and your user can happily just do:

```diff
const someProperty: string | undefined = someUserOperation();

someFunction({
  someOtherProperty,
- ...(someProperty ? { someProperty } : {}),
+ someProperty,
})
```

Which.. is probably what you wanted them to be able to do all along.

## Why don't more people realize this

Because the default value is off, that means that if you have it off in your own library you probably don't feel the pain your users may be feeling.  You aren't dogfooding your own codebase in the way your users are likely to be using it.

This is exacerbated by the fact that, of course, not all users are using this flag, so it may seem like it's not a big deal because it only affects some users.  However... it's so easy (and more correct, anyway) to do, that you really are putting your best foot forward by enforcing it in your own codebase.
