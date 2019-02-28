import test from 'ava';
import delay from 'delay';
import MaybeStoreRedis from '..';

const store = new MaybeStoreRedis();

let isQuit = false;

test.afterEach(async () => {
  if (!isQuit) {
    await store.clear();
  }
});

test.serial('MaybeStoreRedis#set', async (t) => {
  await store.set('foo', 'bar');
  t.is(await store.get('foo'), 'bar');
});

test.serial('MaybeStoreRedis#set with ttl', async (t) => {
  await store.set('foo', 'bar', 100);
  t.is(await store.get('foo'), 'bar');
  await delay(200);
  t.is(await store.get('foo'), undefined);
});

test.serial('MaybeStoreRedis#set undefined', async (t) => {
  await store.set('foo', undefined);
  t.is(await store.get('foo'), undefined);
});

test.serial('MaybeStoreRedis#get', async (t) => {
  t.is(await store.get('foo'), undefined);
});

test.serial('MaybeStoreRedis#delete', async (t) => {
  await store.set('foo', 'bar');
  await store.set('baz', 'qux');
  await store.delete('foo');
  t.is(await store.get('foo'), undefined);
  t.is(await store.get('baz'), 'qux');
});

test.serial('MaybeStoreRedis#clear', async (t) => {
  await store.set('foo', 'bar');
  await store.set('baz', 'qux');
  await store.clear();
  t.is(await store.get('foo'), undefined);
  t.is(await store.get('baz'), undefined);
});

test.serial('MaybeStoreRedis#quit', async (t) => {
  t.is(await store.quit(), 'OK');
  isQuit = true;
});
