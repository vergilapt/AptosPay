import { Network } from '@aptos-labs/ts-sdk';

/** TODO: docs */
type TransactionHash = `0x${string}`;
/** TODO: docs */
interface NetworkInfo {
    name: Network;
    chainId: number;
    url?: string;
}
declare enum UserResponseStatus {
    APPROVED = "Approved",
    REJECTED = "Rejected"
}
interface UserApproval<TResponseArgs> {
    status: UserResponseStatus.APPROVED;
    args: TResponseArgs;
}
interface UserRejection {
    status: UserResponseStatus.REJECTED;
}
type UserResponse<TResponseArgs> = UserApproval<TResponseArgs> | UserRejection;

export { NetworkInfo, TransactionHash, UserApproval, UserRejection, UserResponse, UserResponseStatus };
