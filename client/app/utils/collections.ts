export function findByKey<T>(arr: T[], item: T, key: string = "_id") {
  return arr.find((x) => x[key] === item[key]);
}

export function findIndexByKey<T>(arr: T[], item: T, key: string = "_id") {
  return arr.findIndex((x) => x[key] === item[key]);
}

export function hasByKey<T>(arr: T[], item: T, key: string = "_id") {
  return !(findByKey(arr, item, key) == null);
}

export function mapToKey<T>(arr: T[], key: string) {
  return arr.map((x) => x[key]);
}
