const pify = require('pify');
const redis = require('redis');

class MaybeStoreRedis {
  constructor(opts = {}) {
    this.ttlSupport = true;
    this.namespace = opts.namespace || 'maybe-store';
    const client = redis.createClient(opts);
    this.redis = ['get', 'set', 'sadd', 'del', 'srem', 'smembers'].reduce((obj, method) => {
      obj[method] = pify(client[method]).bind(client);
      return obj;
    }, {});
  }

  _getNamespace() {
    return `${this.namespace}:namespace`;
  }

  get(key) {
    return this.redis.get(key).then(value => (value === null ? undefined : value));
  }

  set(key, value, ttl) {
    if (value === undefined) {
      return Promise.resolve();
    }
    return Promise.resolve()
      .then(() => {
        if (typeof ttl === 'number') {
          return this.redis.set(key, value, 'PX', ttl);
        }
        return this.redis.set(key, value);
      })
      .then(() => this.redis.sadd(this._getNamespace(), key));
  }

  delete(key) {
    return this.redis
      .del(key)
      .then(items => this.redis.srem(this._getNamespace(), key).then(() => items > 0));
  }

  clear() {
    return this.redis
      .smembers(this._getNamespace())
      .then(keys => this.redis.del.apply(null, keys.concat(this._getNamespace())))
      .then(() => undefined);
  }
}

module.exports = MaybeStoreRedis;
