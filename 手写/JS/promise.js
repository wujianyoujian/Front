class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCallbacks.forEach((fn) => fn());
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn());
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulilled, onRejected) {
    onFulilled = typeof onFulilled === "function" ? onFulilled : (v) => v;
    onRejected = typeof onRejected === "function" ? onRejected : (v) => v;

    return new MyPromise((resolve, reject) => {
      const handle = (fn, val) => {
        queueMicrotask(() => {
          try {
            const result = fn(val);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.state === "fulfilled") {
        handle(onFulilled, this.value);
      }
      if (this.state === "onjected") {
        handle(onRejected, this.reason);
      }
      if (this.state === "pending") {
        this.onFulfilledCallbacks.push(() => handle(onFulilled, this.value));
        this.onRejectedCallbacks.push(() => handle(onRejected, this.value));
      }
    });
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reson) {
    return new MyPromise((_, reject) => reject(reson));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let count = 0;
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then((val) => {
          results[i] = val;
          if (++count === promises.length) {
            resolve(results);
          }
        }, reject);
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then(resolve, reject);
      });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      const result = [];
      let count = 0;

      if (!promises.length) {
        resolve([])
      }
      promises.forEach((p, i) => {
        MyPromise.Resolve(p).then(
          (val) => {
            result[i] = { status: "fulfilled", value: val };
            if (++count === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            result[i] = { status: "rejected", reason: reason };
            if (++count === promises.length) {
              resolve(result);
            }
          }
        );
      });
    });
  }
}

// const p1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(0);
//   }, 0);
// });

// p1.then((res) => {
//   console.log(res);
// });

// console.log(12);

// MyPromise.resolve(21).then((res) => console.log(res));
// MyPromise.race([23, 2, 4]).then((res) => {
//   console.log(res);
// });

// class MyPromise1 {
//   constructor(exector) {
//     this.state = "pending";
//     this.value = undefined;
//     this.reason = undefined;

//     this.onFulfilledCallbacks = [];
//     this.onRejectedCallbacks = [];

//     const resolve = (value) => {
//       if (this.state !== "pending") return;
//       this.state = "fulfilled";
//       this.value = value;

//       this.onFulfilledCallbacks.forEach((fn) => fn());
//     };

//     const reject = (reason) => {
//       if (this.state !== "pending") return;
//       this.state = "rejected";
//       this.reason = reason;

//       this.onRejectedCallbacks.forEach((fn) => fn());
//     };

//     try {
//       exector(resolve, reject);
//     } catch (error) {
//       reject(error);
//     }
//   }

//   static resolve(val) {
//     if (val instanceof MyPromise1) return val;
//     return new MyPromise1((resolve) => resolve(val));
//   }

//   static reject(reason) {
//     return new MyPromise1((_, reject) => reject(reason));
//   }

//   then(onFulfilled, onRejected) {
//     onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
//     onRejected = typeof onRejected === "function" ? onRejected : (v) => v;
//     return new MyPromise1((resolve, reject) => {
//       const handle = (fn, val) => {
//         queueMicrotask(() => {
//           try {
//             const result = fn(val);
//             result instanceof MyPromise1 ? result.then(resolve, reject) : resolve(result);
//           } catch (error) {
//             reject(error);
//           }
//         });
//       };

//       if (this.state === "fulfilled") {
//         handle(onFulfilled, this.value);
//       }
//       if (this.state === "rejected") {
//         handle(onRejected, this.reason);
//       }
//       if (this.state === "pending") {
//         this.onFulfilledCallbacks.push(() => handle(onFulfilled, this.value));
//         this.onRejectedCallbacks.push(() => handle(onRejected, this.reason));
//       }
//     });
//   }

//   finially(fn) {
//     return this.then(
//       (value) => MyPromise1.resolve(fn().then((_) => value)),
//       (reason) =>
//         MyPromise1.resolve(
//           fn().then((_) => {
//             throw reason;
//           })
//         )
//     );
//   }
// }

// const p1 = new MyPromise1((resolve) => {
//   setTimeout(() => {
//     resolve(12);
//   }, 0);
// });

// p1.then((res) => {
//   console.log(res);
// });

// MyPromise1.resolve(12212).then((res) => console.log(res));
// console.log(121);

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const result = [];

    if (promises.length === 0) {
      resolve([]);
    }

    promises.forEach((p, i) => {
      Promise.resolve(p).then((value) => {
        result[i] = value;
        if (++count === promises.length) {
          resolve(result);
        }
      }, reject);
    });
  });
}

class MyPromise1 {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (val) => {
      if (this.state === "pending") {
        this.value = val;
        this.state = "fulfilled";

        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.reason = reason;
        this.state = "rejected";

        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (v) => {
            throw v;
          };

    return new MyPromise1((resolve, reject) => {
      const handle = (fn, val) => {
        queueMicrotask(() => {
          try {
            const result = fn(val);
            typeof result.then === "function" ? result.then(resolve, reject) : resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.state === "fulfilled") {
        handle(onFulfilled, this.value);
      }

      if (this.state === "rejected") {
        handle(onRejected, this.reason);
      }

      if (this.state === "pending") {
        this.onFulfilledCallbacks.push(() => handle(onFulfilled, this.value));
        this.onRejectedCallbacks.push(() => handle(onRejected, this.reason));
      }
    });
  }

  static resolve(val) {
    if (val instanceof MyPromise1) return val;
    return new MyPromise1((resolve) => resolve(val));
  }

  static reject(reason) {
    return new MyPromise1((_, (reject) => reject(reason)));
  }

  static catch(onRejected) {
    return this.then(null, onRejected);
  }

  static finally(fn) {
    return this.then(
      (value) => MyPromise1.resolve(fn()).then(() => value),
      (reason) =>
        MyPromise1.resolve(
          fn().then(() => {
            throw reason;
          })
        )
    );
  }

  static all(promises) {
    return new MyPromise1((resolve, reject) => {
      let result = [];
      let count = 0;

      if (promises?.length === 0) {
        return MyPromise1.resolve([]);
      }
      promises.forEach((p, i) => {
        MyPromise1.resolve(p).then((val) => {
          result[i] = val;
          if (++count === promises.length) {
            resolve(result);
          }
        }, reject);
      });
    });
  }
}

const p = new MyPromise1((resolve, reject) => {
  setTimeout(() => {
    resolve("九九");
  }, 20);
});

p.then((res) => {
  console.log(res);
});

{
  class Mypromise {
    constructor(executor) {
      this.value = undefined;
      this.reason = undefined;
      this.state = "pending";

      this.onFulfilledCallbacks = [];
      this.onRejectedCallbacks = [];

      const resolve = (val) => {
        if (this.state !== "pending") {
          this.state = "fulfilled";
          this.value = val;

          this.onFulfilledCallbacks.forEach((fn) => fn());
        }
      };

      const reject = (reason) => {
        if (this.state !== "pending") {
          this.state = "rejected";
          this.value = reason;

          this.onRejectedCallbacks.forEach((fn) => fn());
        }
      };

      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }

    then(onFulfilled, onRejected) {
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (r) => {
              throw new Error(r);
            };

      return new MyPromise((resolve, reject) => {
        const handle = (fn, val) => {
          queueMicrotask(() => {
            try {
              const result = fn(val);
              return typeof result.then === "function"
                ? result.then(resolve, reject)
                : resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        };

        if (this.state === "fulfilled") {
          handle(onFulfilled, this.value);
        }

        if (this.state === "rejected") {
          handle(onRejected, this.reason);
        }

        if (this.state === "pending") {
          this.onRejectedCallbacks.push(() => handle(onFulfilled, this.value));
          this.onRejectedCallbacks.push(() => handle(onRejected, this.reason));
        }
      });
    }

    static resolve(val) {
      if (val instanceof MyPromise) return val;
      return new MyPromise((resolve) => resolve(val));
    }

    static reject(res) {
      return new MyPromise((_, reject) => reject(res));
    }

    static catch(fn) {
      return this.then(_, fn);
    }

    finally(fn) {
      return this.then(
        (val) => {
          return MyPromise.resolve(fn()).then(() => val);
        },
        (reason) => {
          return MyPromise.resolve(fn()).then(() => {
            throw reason;
          });
        }
      );
    }
  }

  const p = new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(12);
    });
  });

  p.then((val) => {
    console.log(val);
  });
  console.log("同步");
}

class MyPromise2 {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.state = "pending";

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.value = value;
        this.state = "fulfilled";
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.reason = reason;
        this.state = "rejected";
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulilled, onRejected) {
    onFulilled = typeof onFulilled === "function" ? onFulilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (r) => {
            throw new Error(r);
          };

    return new MyPromise2((resolve, reject) => {
      const handle = (fn, val) => {
        queueMicrotask(() => {
          try {
            const result = fn(val);
            result.then instanceof MyPromise2 ? result.then(resolve, reject) : resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.state === "pending") {
        this.onFulfilledCallbacks.push(() => handle(onFulilled, this.value));
        this.onRejectedCallbacks.push(() => handle(onFulilled, this.reason));
      }

      if (this.state === "fulfilled") {
        handle(onFulilled, this.value);
      }
      if (this.state === "rejected") {
        handle(onRejected, this.reason);
      }
    });
  }

  static resolve(val) {
    if (onFulfilled instanceof MyPromise2) return onFulfilled.then(this.value);
    return new MyPromise((resolve) => resolve(val));
  }

  static reject(reason) {
    return new MyPromise2((_, reject) => reject(reason));
  }

  static catch(onRejected) {
    return this.then(null, onRejected);
  }

  static finally(fn) {
    return this.then(
      (value) => {
        return MyPromise2.resolve(fn()).then(() => value);
      },
      (reason) => {
        return MyPromise2.resolve(fn()).then(() => {
          throw reason;
        });
      }
    );
  }

  static all(promises) {
    return new MyPromise2((resolve, reject) => {
      const result = [];
      const count = 0;
      if (!promises.length) {
        return MyPromise2.resolve([]);
      }
      promises.forEach((p) => {
        MyPromise2.resolve(p).then((val) => {
          result[i] = val;
          if (++count === promises.length) {
            resolve(resolve);
          }
        }, reject);
      });
    });
  }
}


class MyPromise3 {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.state = 'pending';

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulFilled';
        this.value = value

        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason

        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v; 
    onRejected = typeof onRejected === 'function' ? onFulfilled : (r) => {
      throw r
    };

    return new MyPromise3((resolve, reject) => {
      function handle(fn, val) {
        queueMicrotask(() => {
          try {
            const result = fn(val);
            typeof result.then === 'function' ? result.then(resolve, reject) : resolve(val)
          } catch (error) {
            reject(error)
          }
        })
      }

      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => handle(onFulfilled, this.value));
        this.onRejectedCallbacks.push(() => handle(onRejected, this.reason));
      }
      if (this.state === 'fulfilled') {
        handle(onFulfilled, this.value);
      }
      if (this.state === 'rejected') {
        handle(onRejected, this.reason);
      }
    })
  }
  static Resolve(val) {
    if (val instanceof MyPromise3) return val;
    return new MyPromise3((resolve) => resolve(val))
  }
  static Reject(r) {
    return new MyPromise3((_, reject) => reject(r))
  }
  

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(fn) {
    return this.then((val) => {
      return MyPromise.Resolve(fn()).then(() => val)
    }, (r) => {
      return MyPromise.Resolve(fn()).then(() => {
        throw r
      })
    })
  }

  static all(promises) {
    return new MyPromise3((resolve, reject) => {
      let result = [];
      let count = 0;
      if (!promises.length) {
        return resolve([])
      }
      promises.forEach((p, index) => {
        MyPromise3.Resolve(p).then(val => {
          result[index] = val
          if (++count === promises.length) {
            resolve(result)
          }
        }).catch(reject)
      })
    })
  }

  static race(promises) {
    return new MyPromise3((resolve, reject) => {
      
      if (!promises.length) return
      promises.forEach(p => {
        MyPromise3.Resolve(p).then(resolve).catch(reject)
      })
    })
  }

  static allSettled(promises) {
    return new MyPromise3((resolve, reject) => {
      let result= [];
      let count = 0;
      
      if (!promises.length) {
        return resolve([])
      }
      promises.forEach((p, index) => {
        MyPromise3.Resolve(p).then((value) => {
          result[index] = { status: 'fulfilled', value }
          if (++count == promises.length) {
            resolve(result)
          }
        }, error => {
          result[index] = { status: 'rejected', error }
          if (++count == promises.length) {
            reject(result)
          }
        })
      })
    })
  }
  
}

const p2 = new MyPromise3((resolve) => {
  setTimeout(() => {
    resolve(12);
  }, 100);
});

p2.then((res) => {
  console.log(res);
});

console.log("同步");

const test1 = new Promise()
test1.catch()
