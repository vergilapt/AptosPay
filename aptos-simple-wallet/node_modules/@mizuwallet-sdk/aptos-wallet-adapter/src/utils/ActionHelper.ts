export default class ActionHelper {
  static buildAction(args: { prefix: string; action: string; params: string[] }) {
    return `${args.prefix}${args.action}_${args.params
      .map((param: any) => ActionHelper.actionParamsEncode(param))
      .join('_')}`;
  }
  static actionParamsEncode(value: string) {
    return encodeURIComponent(value).replace(/\./g, '%2E').replace(/%/g, '--');
  }

  static actionParamsDecode(value: string) {
    return decodeURIComponent(value.replace(/--/g, '%'));
  }
}

