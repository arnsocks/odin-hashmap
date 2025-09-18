export default class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity);
    for (let i = 0; i < capacity; i++) {
      this.buckets[i] = [];
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  #bucket(key) {
    return this.buckets[this.hash(key)];
  }

  #entry(bucket, key) {
    for (let e of bucket) {
      if (e.key === key) {
        return e;
      }
    }
    return null;
  }

  set(key, value) {
    let bucket = this.#bucket(key);
    let entry = this.#entry(bucket, key);
    if (entry) {
      entry.value = value;
      return;
    }
    bucket.push({ key, value });
  }

  get(key) {
    let bucket = this.#bucket(key);
    let entry = this.#entry(bucket, key);
    if (entry) {
      return entry.value;
    }
    return null;
  }

  has(key) {
    // returns true or false based on whether or not the key is in the hash map.
    let bucket = this.#bucket(key);
    let entry = this.#entry(bucket, key);
    return entry ? true : false;
  }
}
