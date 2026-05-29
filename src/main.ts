export class DeferredMethod {
  deferred() {
    return 'deferred';
  }
}

class A {
  deferred() {
    return a.deferred();
  }
}

function main() {
  console.log('Hello World!', new A().deferred());
}

main();
