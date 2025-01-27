// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Deserializer, Serializer } from '@aptos-labs/ts-sdk';
import { base64ToBytes, bytesToBase64 } from '../base64';
import { SerializedWalletRequest } from '../WalletRequest';
import { SerializedWalletResponse } from '../WalletResponse';
import { TypedMessage } from './common';

export class PromptOpenerPingRequestMessage implements TypedMessage {
  static readonly TYPE = 'PromptOpenerPingRequest';
  readonly __messageType = PromptOpenerPingRequestMessage.TYPE;
}

export class PromptOpenerPingResponseMessage implements TypedMessage {
  static readonly TYPE = 'PromptOpenerPingResponse';
  readonly __messageType = PromptOpenerPingResponseMessage.TYPE;
}

export class PromptApprovalResponseMessage implements TypedMessage {
  static readonly TYPE = 'PromptApprovalResponse';
  readonly __messageType = PromptApprovalResponseMessage.TYPE;

  constructor(public serializedValue: SerializedWalletResponse) {}
}

export class PromptUnauthorizedErrorMessage implements TypedMessage {
  static readonly TYPE = 'PromptUnauthorizedError';
  readonly __messageType = PromptUnauthorizedErrorMessage.TYPE;
}

export function urlEncodeWalletRequest(request: SerializedWalletRequest) {
  const serializer = new Serializer();
  serializer.serializeStr(request.name);
  serializer.serializeBytes(request.data);
  serializer.serializeStr(request.version.toString());
  return bytesToBase64(serializer.toUint8Array());
}

export function urlDecodeWalletRequest(encodedRequest: string): SerializedWalletRequest {
  const deserializer = new Deserializer(base64ToBytes(encodedRequest));
  const name = deserializer.deserializeStr();
  const data = deserializer.deserializeBytes();

  let version: number;
  try {
    version = Number(deserializer.deserializeStr());
  } catch {
    version = 1;
  }
  return { data, name, version };
}
