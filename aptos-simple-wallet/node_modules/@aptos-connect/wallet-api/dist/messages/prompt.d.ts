import { SerializedWalletRequest } from '../WalletRequest';
import { SerializedWalletResponse } from '../WalletResponse';
import { TypedMessage } from './common';
export declare class PromptOpenerPingRequestMessage implements TypedMessage {
    static readonly TYPE = "PromptOpenerPingRequest";
    readonly __messageType = "PromptOpenerPingRequest";
}
export declare class PromptOpenerPingResponseMessage implements TypedMessage {
    static readonly TYPE = "PromptOpenerPingResponse";
    readonly __messageType = "PromptOpenerPingResponse";
}
export declare class PromptApprovalResponseMessage implements TypedMessage {
    serializedValue: SerializedWalletResponse;
    static readonly TYPE = "PromptApprovalResponse";
    readonly __messageType = "PromptApprovalResponse";
    constructor(serializedValue: SerializedWalletResponse);
}
export declare class PromptUnauthorizedErrorMessage implements TypedMessage {
    static readonly TYPE = "PromptUnauthorizedError";
    readonly __messageType = "PromptUnauthorizedError";
}
export declare function urlEncodeWalletRequest(request: SerializedWalletRequest): string;
export declare function urlDecodeWalletRequest(encodedRequest: string): SerializedWalletRequest;
//# sourceMappingURL=prompt.d.ts.map