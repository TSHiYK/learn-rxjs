class Producer {
  constructor(private listeners = []) {
  }

  add(listener) {
    this.listeners.push(listener);
  }

  remove(listener) {
    let index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);
  }

  notify(message) {
    this.listeners.forEach(listener => {
      listener.update(message);
    });
  }
}

const listener1 = {
  update: message => {
    console.log(`Listener 1 received: ${message}`);
  }
};

const listener2 = {
  update: message => {
    console.log(`Listener 2 received: ${message}`);
  }
};

const notifier: Producer = new Producer();
notifier.add(listener1);
notifier.add(listener2);
notifier.notify("Hello there!");
