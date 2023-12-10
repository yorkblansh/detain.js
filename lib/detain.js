async function detain(props) {
  const { delayMs, each, array, onEach, onReject } = props;
  let results = [];
  const delay = (timeoutDelay, data) => new Promise((resolve, reject) => {
    if (onReject)
      onReject(reject);
    setTimeout(resolve.bind(null, data), timeoutDelay);
  });
  let index = 0;
  const next = async () => {
    if (index < array.length) {
      const item = array[index];
      const maybePromise = each(item, index);
      index++;
      let value;
      if (maybePromise.then !== void 0) {
        value = await maybePromise;
      } else {
        value = maybePromise;
      }
      results.push(value);
      if (onEach)
        onEach(value);
      return delay(delayMs).then(next);
    }
  };
  await Promise.resolve(next());
  return results;
}
export {
  detain
};
//# sourceMappingURL=detain.js.map
