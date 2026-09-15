/* @flow */

import {
  getDomain,
  isSameDomain,
  matchDomain,
  type CrossDomainWindowType,
} from "@krakenjs/cross-domain-utils/src";

import { PROP_TYPE } from "../constants";
import type {
  PropsDefinitionType,
  PropsType,
  ChildPropsType,
} from "../component/props";

import type { ChildHelpers } from "./index";

const PRIMITIVE_PROP_TYPES = [
  PROP_TYPE.STRING,
  PROP_TYPE.NUMBER,
  PROP_TYPE.BOOLEAN,
];

// Bootstrap props come from window.name, which a framing/opening page can
// forge; reject an object/function smuggled into a primitive-typed prop so it
// cannot reach a render sink (e.g. dangerouslySetInnerHTML).
function assertPrimitivePropType(type: string, key: string, value: mixed) {
  if (
    PRIMITIVE_PROP_TYPES.indexOf(type) !== -1 &&
    value !== null &&
    value !== undefined &&
    (typeof value === "object" || typeof value === "function")
  ) {
    throw new Error(
      `Prop "${key}" is declared as ${type} but received ${typeof value}`
    );
  }
}

export function normalizeChildProp<P, T, X>(
  // $FlowFixMe
  propsDef: PropsDefinitionType<P, X>,
  props: PropsType<P>,
  key: string,
  value: ?T,
  helpers: ChildHelpers<P, X>
): ?T {
  if (!propsDef.hasOwnProperty(key)) {
    return value;
  }

  const prop = propsDef[key];

  if (typeof prop.childDecorate === "function") {
    const {
      uid,
      tag,
      close,
      focus,
      onError,
      onProps,
      resize,
      getParent,
      getParentDomain,
      show,
      hide,
      export: xport,
      getSiblings,
    } = helpers;
    const decoratedValue = prop.childDecorate({
      value,
      uid,
      tag,
      close,
      focus,
      onError,
      onProps,
      resize,
      getParent,
      getParentDomain,
      show,
      hide,
      export: xport,
      getSiblings,
    });

    // $FlowFixMe
    return decoratedValue;
  }

  return value;
}

// eslint-disable-next-line max-params
export function normalizeChildProps<P, X>(
  parentComponentWindow: CrossDomainWindowType,
  propsDef: PropsDefinitionType<P, X>,
  props: PropsType<P>,
  origin: string,
  helpers: ChildHelpers<P, X>,
  isUpdate: boolean = false
): ChildPropsType<P, X> {
  const result = {};

  for (const key of Object.keys(props)) {
    const prop = propsDef[key];

    const trustedChild: boolean =
      prop && prop.trustedDomains && prop.trustedDomains.length > 0
        ? prop.trustedDomains.reduce((acc, val) => {
            return acc || matchDomain(val, getDomain(window));
          }, false)
        : origin === getDomain(window) || isSameDomain(parentComponentWindow);

    // let trustedDomains override sameDomain prop
    if (prop && prop.sameDomain && !trustedChild) {
      continue;
    }

    // sameDomain was not set and trusted domains must match
    if (prop && prop.trustedDomains && !trustedChild) {
      continue;
    }

    if (prop) {
      assertPrimitivePropType(prop.type, key, props[key]);
    }

    // $FlowFixMe
    const value = normalizeChildProp(propsDef, props, key, props[key], helpers);

    result[key] = value;
    if (prop && prop.alias && !result[prop.alias]) {
      result[prop.alias] = value;
    }
  }

  if (!isUpdate) {
    for (const key of Object.keys(propsDef)) {
      if (!props.hasOwnProperty(key)) {
        result[key] = normalizeChildProp(
          propsDef,
          props,
          key,
          undefined,
          helpers
        );
      }
    }
  }

  // $FlowFixMe
  return result;
}
