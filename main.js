import HashMap from "./hashmap.js";

let test = new HashMap();

test.set("Banana", "pudding");
test.set("Orchid", "flower");

console.log(test.get("Banana"));
console.log(`Has 'gopher': ${test.has("gopher")}`);
console.log(`Has 'Banana': ${test.has("Banana")}`);

test.set("fruit", "bat");
console.log(test.get("fruit"));
test.remove("fruit");
console.log(test.get("fruit"));
