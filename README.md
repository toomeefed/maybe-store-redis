# maybe-store-redis

> Redis storage adapter for maybe-store

  [![Travis](https://img.shields.io/travis/toomeefed/maybe-store-redis.svg)](https://travis-ci.org/toomeefed/maybe-store-redis)
  [![Coverage Status](https://img.shields.io/coveralls/toomeefed/maybe-store-redis/master.svg?style=flat)](https://coveralls.io/github/toomeefed/maybe-store-redis?branch=master)
  [![David](https://img.shields.io/david/toomeefed/maybe-store-redis.svg)](https://david-dm.org/toomeefed/maybe-store-redis)
  [![npm (scoped)](https://img.shields.io/npm/v/@toomee/maybe-store-redis.svg)](https://www.npmjs.com/package/@toomee/maybe-store-redis)
  [![node (scoped)](https://img.shields.io/node/v/@toomee/maybe-store-redis.svg)](https://github.com/toomeefed/maybe-store-redis)
  [![GitHub license](https://img.shields.io/github/license/toomeefed/maybe-store-redis.svg)](https://github.com/toomeefed/maybe-store-redis/blob/master/LICENSE)


## 安装

```sh
$ yarn add @toomee/maybe-store-redis # 推荐
# 或者
$ npm i -S @toomee/maybe-store-redis
```

## 使用

```js
const MaybeStore = require('@toomee/maybe-store');
const MaybeStoreRedis = require('@toomee/maybe-store-redis');

const store = new MaybeStore({
  store: new MaybeStoreRedis(),
});

await store.set('foo', 'expires in 1 second', 1000); // true
await store.set('foo', 'never expires'); // true
await store.get('foo'); // 'never expires'
await store.delete('foo'); // true
await store.clear(); // undefined
```

## License

MIT
