/* @flow */

import {
  isSameDomain,
  type CrossDomainWindowType,
} from "@krakenjs/cross-domain-utils/src";
import { getCurrentScriptUID } from "@krakenjs/belter/src";

export function getLegacyGlobalKey(): string {
  if (__ZOID__.__SCRIPT_NAMESPACE__) {
    return `${__ZOID__.__LEGACY_GLOBAL_KEY__}_${getCurrentScriptUID()}`;
  } else {
    return __ZOID__.__LEGACY_GLOBAL_KEY__;
  }
}

export function getMajorVersionGlobalKey(): string {
  if (__ZOID__.__SCRIPT_NAMESPACE__) {
    return `${__ZOID__.__MAJOR_VERSION_GLOBAL_KEY__}_${getCurrentScriptUID()}`;
  } else {
    return __ZOID__.__MAJOR_VERSION_GLOBAL_KEY__;
  }
}

export function getGlobal<T>(win: CrossDomainWindowType): T {
  const legacyKey = getLegacyGlobalKey();
  const majorVersionKey = getMajorVersionGlobalKey();

  if (!isSameDomain(win)) {
    throw new Error(`Can not get global for window on different domain`);
  }

  // If the major version key is missing, seed it from the legacy key (or a
  // fresh object). This handles old-version parent windows and own-window init.
  if (!win[majorVersionKey]) {
    win[majorVersionKey] = win[legacyKey] || {};
  }

  // Keep the legacy key in sync so pre-Phase-1 readers on the same window
  // can still find the global under the old key.
  if (!win[legacyKey]) {
    win[legacyKey] = win[majorVersionKey];
  }

  return win[majorVersionKey];
}

export function tryGlobal<T, R>(
  win: CrossDomainWindowType,
  handler: (T) => R,
): ?R {
  try {
    return handler(getGlobal(win));
  } catch (err) {
    // pass
  }
}

export function destroyGlobal() {
  delete window[getLegacyGlobalKey()];
  delete window[getMajorVersionGlobalKey()];
}
