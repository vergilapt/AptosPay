export default class ActionHelper {
    static buildAction(args: {
        prefix: string;
        action: string;
        params: string[];
    }): string;
    static actionParamsEncode(value: string): string;
    static actionParamsDecode(value: string): string;
}
