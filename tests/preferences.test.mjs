import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { readPreference, writePreference } from '../app/preferences.ts';

const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
after(() => {
  if (originalStorage) Object.defineProperty(globalThis, 'localStorage', originalStorage);
  else delete globalThis.localStorage;
});

test('preferences persist when storage is available', () => {
  const values = new Map();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    },
  });
  assert.equal(readPreference('pelican-theme'), null);
  writePreference('pelican-theme', 'dark');
  assert.equal(readPreference('pelican-theme'), 'dark');
});

test('blocked storage access falls back without throwing', () => {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    get() { throw new DOMException('Storage blocked', 'SecurityError'); },
  });
  assert.equal(readPreference('pelican-theme'), null);
  assert.doesNotThrow(() => writePreference('pelican-locale', 'en'));
});

test('failed writes do not interrupt preference changes', () => {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: () => null,
      setItem() { throw new DOMException('Storage full', 'QuotaExceededError'); },
    },
  });
  assert.doesNotThrow(() => writePreference('pelican-theme', 'light'));
});
