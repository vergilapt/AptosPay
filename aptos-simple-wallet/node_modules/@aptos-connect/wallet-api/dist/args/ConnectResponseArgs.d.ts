import { Deserializer, Serializer } from '@aptos-labs/ts-sdk';
import { type AccountInfo } from '../shared';
export interface ConnectResponseArgs {
    account: AccountInfo;
}
export declare function serializeConnectResponseArgs(serializer: Serializer, value: ConnectResponseArgs): string;
export declare function deserializeConnectResponseArgs(deserializer: Deserializer): ConnectResponseArgs;
//# sourceMappingURL=ConnectResponseArgs.d.ts.map