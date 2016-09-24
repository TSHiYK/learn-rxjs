class IterateOnMultiples {

  cursor: number = 0;

  constructor(private array: number[],
              private divisor: number = 1) {
  }

  next(): number {
    while (this.cursor < this.array.length) {
      let value = this.array[this.cursor++];
      if (value % this.divisor === 0) {
        return value;
      }
    }
  }

  hasNext(): boolean {
    let cur = this.cursor;
    while (cur < this.array.length) {
      if (this.array[cur++] % this.divisor === 0) {
        return true;
      }
    }
    return false;
  }
}

const consumer = new IterateOnMultiples([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
console.log(consumer.next(), consumer.hasNext());
console.log(consumer.next(), consumer.hasNext());
console.log(consumer.next(), consumer.hasNext());
