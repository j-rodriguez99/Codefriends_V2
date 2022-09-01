//If a value is manually added grocer[5] = 'aaa' - how do you ensure the length property is updated?

class fake_array {
  constructor() {
    this.length = 0;
    this.push = (value) => {
      this[this.length] = value;
      this.length++;
    };
    this.pop = () => {
      this.length--;
      delete this[this.length];
    };
  }
}

const groceries = new fake_array();

groceries.push("test");
groceries.push("another_one");
groceries.push(88);

groceries[1] = "oh my god";
console.log(groceries);

groceries.pop();
console.log(groceries);
