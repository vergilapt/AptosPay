import { SESSION_MESSAGE_FROM, SESSION_MESSAGE_TYPE } from '../crypto';

export interface SessionMessageBodyFulfilled {
  result?: any;
}

export interface SessionMessageBodyStart {
  sessionId?: string;
}

export interface SessionMessageBodyCancel {
  cancel?: boolean;
}

export interface SessionMessageBodyData {
  [key: string]: any;
}

export interface SessionMessageBodySignTransaction {
  signature?: string;
}

export type SessionMessageBody = SessionMessageBodyFulfilled &
  SessionMessageBodyStart &
  SessionMessageBodyCancel &
  SessionMessageBodyData &
  SessionMessageBodySignTransaction;

export class SessionMessage {
  from: SESSION_MESSAGE_FROM | '' = '';
  nonce: string = '';
  body: SessionMessageBody;
  type: SESSION_MESSAGE_TYPE | '' = '';

  constructor(args: {
    from: SESSION_MESSAGE_FROM;
    body: SessionMessageBody;
    type: SESSION_MESSAGE_TYPE;
    nonce?: string;
  }) {
    Object.assign(this, args);
    this.body = args.body;
  }
}

