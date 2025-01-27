import { AccountAddress, AnyPublicKey, ZeroKnowledgeSig } from '@aptos-labs/ts-sdk';
import { UserResponse } from '../../UserResponse';
import { SerializedWalletResponse, WalletResponseWithArgs } from '../../WalletResponse';
export interface KeylessAccountInfo {
    address: AccountAddress;
    idTokenHeader: string;
    proof: ZeroKnowledgeSig;
    publicKey: AnyPublicKey;
}
export interface DeriveAccountResponse extends WalletResponseWithArgs<DeriveAccountResponse.Args> {
}
export declare namespace DeriveAccountResponse {
    export const supportedVersions: readonly [1];
    export type SupportedVersions = (typeof supportedVersions)[number];
    export const currentVersion: 1;
    export interface ApprovalArgs {
        account: KeylessAccountInfo;
    }
    export type Args = UserResponse<ApprovalArgs>;
    type _Response = DeriveAccountResponse;
    export function serialize(args: Args): SerializedWalletResponse;
    export function deserialize(serializedResponse: SerializedWalletResponse): _Response;
    export {};
}
//# sourceMappingURL=response.d.ts.map