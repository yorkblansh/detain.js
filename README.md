<h1> detain.js</h1>

Library brings serial delay for performing tasks on array of promises or regular items

# Example

```ts
const array = await detain({
  array: ['1', 2, 8, 155];
  delayMs: 1000,
  each: (item) => asyncFunction(item),
  onEach: (resolvedValue) => {
    console.log(resolvedValue)
  },
})
```
