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

  remove(key) {
    // If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    let bucket = this.#bucket(key);
    let entry = this.#entry(bucket, key);
    if (entry) {
      // remove the entry
      bucket.splice(bucket.indexOf(key), 1);
      return true;
    } else return false;
  }

  length() {
    //returns the number of stored keys in the hash map.
    let length = 0;
    for (let b of this.buckets) {
      length += b.length;
    }
    return length;
  }

  clear() {
    //removes all entries in the hash map.
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  keys() {
    //returns an array containing all the keys inside the hash map.
    let keys = [];
    for (let b of this.buckets) {
      for (let e of b) {
        keys.push(e.key);
      }
    }
    return keys;
  }

  values() {
    //returns an array containing all the values.
    let values = [];
    for (let b of this.buckets) {
      for (let e of b) {
        values.push(e.value);
      }
    }
    return values;
  }

  entries() {
    //returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
    let entries = [];
    for (let b of this.buckets) {
      for (let e of b) {
        let entry = [e.key, e.value];
        entries.push(entry);
      }
    }
    return entries;
  }
}
