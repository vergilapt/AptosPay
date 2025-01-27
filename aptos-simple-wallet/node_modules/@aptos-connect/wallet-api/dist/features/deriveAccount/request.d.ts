import { DappInfo } from '../../shared';
import { SerializedWalletRequest, WalletRequest } from '../../WalletRequest';
export interface DeriveAccountRequest extends WalletRequest<DeriveAccountRequest.RequestName, DeriveAccountRequest.SupportedVersions> {
}
export declare namespace DeriveAccountRequest {
    const name: "deriveAccount";
    type RequestName = typeof name;
    const supportedVersions: readonly [1];
    type SupportedVersions = (typeof supportedVersions)[number];
    const currentVersion: 1;
    type CurrentVersion = typeof currentVersion;
    function serialize(dappInfo: DappInfo): SerializedWalletRequest<RequestName, CurrentVersion>;
    function deserialize(request: SerializedWalletRequest<RequestName, SupportedVersions>): DeriveAccountRequest;
    function isSerialized(request: SerializedWalletRequest): request is SerializedWalletRequest<RequestName, SupportedVersions>;
}
//# sourceMappingURL=request.d.ts.map