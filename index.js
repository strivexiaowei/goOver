const Observer = function (data) {
  for (const key in data) {
    defineReactive(data, key);
  }
};

const defineReactive = function (obj, key) {
  const dep = new Dep();
  let val = obj[key];
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        return;
      }
      val = newVal;
      dep.notify();
    },
  });
};

const observer = function (data) {
  return new Observer(data);
};

const Vue = function (options) {
  const self = this;
  if (options && typeof options.data === 'function') {
    this._data = options.data.apply(this);
  }
  this.mount = function () {
    new Watcher(self, self.render);
  };

  this.render = function () {
    with (self) {
      _data.text;
    }
  };
  observer(this._data);
};

const Watcher = function (vm, fn) {
  const self = this;
  this.vm = vm;
  Dep.target = this;
  this.addDep = function (dep) {
    dep.addSub(self);
  };
  // 更新方法，用于触发vm._render
  this.update = function () {
    fn();
  };
  this.value = fn();
  Dep.target = null;
};

const Dep = function () {
  const self = this;
  this.target = null;
  this.subs = [];
  this.depend = function () {
    if (Dep.target) {
      Dep.target.addDep(self);
    }
  };
  this.addSub = function (watcher) {
    self.subs.push(watcher);
  };
  this.notify = function () {
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update();
    }
  };
};

const vue = new Vue({
  data() {
    return {
      text: 'hello world',
    };
  },
});

vue.mount();
vue._data.text = '123';
vue._data.text = '1234';

function deepClone(value) {
  if (value == null) {
    return value;
  }
  if (typeof value !== 'object') {
    return value;
  }
  if (value instanceof RegExp) {
    return new RegExp(value);
  }
  if (value instanceof Date) {
    return new Date(value);
  }
  let obj = new value.constructor();
  for (let key in value) {
    obj[key] = deepClone(value[key]); // 看一看当前的值是不是一个对象
  }
  return obj;
}

function debounce(fn, delay) {
  // console.log(fn, delay);

  var timer = null;
  return function () {
    let arg = arguments;
    console.log(arg);
    let that = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(that, [...arg]);
    }, delay);
  };
}

function debounceTest(str) {
  console.log(str, 'dada');
}

document.addEventListener('click', debounce(debounceTest, 1000));

let names = ['iPhone X', 'iPhone XS'];

let colors = ['黑色', '白色'];

let storages = ['64g', '256g'];

let combine = function (...chunks) {
  console.log(chunks);
  const res = [];
  let helper = function (chunkIndex, prev) {
    let chunk = chunks[chunkIndex];
    // console.log(chunkIndex, chunk);
    let isLast = chunkIndex === chunks.length - 1;
    // console.log(isLast);
    for (let val of chunk) {
      // console.log(chunk, prev);
      
      let cur = prev.concat(val);
      console.log(cur);
      
      if (isLast) {
        // 如果已经处理到数组的最后一项了 则把拼接的结果放入返回值中
        res.push(cur);
      } else {
        helper(chunkIndex + 1, cur);
      }
    }
  };
  helper(0, []);
  return res;
};

combine(names, colors, storages);
