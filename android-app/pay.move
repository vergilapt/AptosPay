// pay.move

module AptosPay::UltimatePay {
    use Std::Signer;
    use Std::Event;
    use Std::Option;
    use Std::Vector;
    use Std::Debug;
    use Std::Errors;
    use Std::Balance;
    use Std::String;

    // 定义支持的支付方式
    struct PaymentMethod has drop, store {
        method_type: vector<u8>, // 支付方式类型，例如 "CRYPTO", "ALIPAY", "WECHAT", "VISA"
        currency_symbol: vector<u8>, // 币种符号，例如 "APT", "USDC", "USDT", "USD"
        decimals: u8, // 小数点位数
    }

    // 定义支付事件
    struct PaymentEvent has drop, store {
        payment_id: u64, // 支付ID
        sender: address, // 发送者地址
        receiver: address, // 接收者地址
        method_type: vector<u8>, // 支付方式类型
        currency_symbol: vector<u8>, // 币种符号
        amount: u64, // 金额
        fee: u64, // 手续费
        timestamp: u64, // 时间戳
    }

    // 定义退款事件
    struct RefundEvent has drop, store {
        refund_id: u64, // 退款ID
        payment_id: u64, // 关联的支付ID
        sender: address, // 发送者地址
        receiver: address, // 接收者地址
        method_type: vector<u8>, // 支付方式类型
        currency_symbol: vector<u8>, // 币种符号
        amount: u64, // 退款金额
        timestamp: u64, // 时间戳
    }

    // 定义安卓端交互事件
    struct AndroidEvent has drop, store {
        event_id: u64, // 事件ID
        event_type: vector<u8>, // 事件类型，例如 "PAYMENT", "REFUND"
        data: vector<u8>, // 事件数据（JSON 格式）
        timestamp: u64, // 时间戳
    }

    // 定义支付模块
    struct UltimatePay has key {
        payments: Event::EventHandle<PaymentEvent>, // 支付事件处理器
        refunds: Event::EventHandle<RefundEvent>, // 退款事件处理器
        android_events: Event::EventHandle<AndroidEvent>, // 安卓端事件处理器
        admin: address, // 管理员地址
        fee_rate: u64, // 手续费率（千分之一）
        supported_methods: vector<PaymentMethod>, // 支持的支付方式列表
    }

    // 错误码
    const ERR_INSUFFICIENT_BALANCE: u64 = 1001; // 余额不足
    const ERR_UNAUTHORIZED: u64 = 1002; // 未授权操作
    const ERR_METHOD_NOT_SUPPORTED: u64 = 1003; // 支付方式不支持
    const ERR_INVALID_AMOUNT: u64 = 1004; // 无效金额
    const ERR_CURRENCY_NOT_SUPPORTED: u64 = 1005; // 币种不支持

    // 初始化支付模块
    public fun initialize(admin: &signer, fee_rate: u64) {
        let admin_address = Signer::address_of(admin);
        let payments_handle = Event::new_event_handle<PaymentEvent>(admin);
        let refunds_handle = Event::new_event_handle<RefundEvent>(admin);
        let android_events_handle = Event::new_event_handle<AndroidEvent>(admin);

        // 初始化支持的支付方式
        let supported_methods = Vector::empty<PaymentMethod>();
        Vector::push_back(&mut supported_methods, PaymentMethod { method_type: b"CRYPTO", currency_symbol: b"APT", decimals: 8 });
        Vector::push_back(&mut supported_methods, PaymentMethod { method_type: b"CRYPTO", currency_symbol: b"USDC", decimals: 6 });
        Vector::push_back(&mut supported_methods, PaymentMethod { method_type: b"CRYPTO", currency_symbol: b"USDT", decimals: 6 });
        Vector::push_back(&mut supported_methods, PaymentMethod { method_type: b"FIAT", currency_symbol: b"USD", decimals: 2 });
        Vector::push_back(&mut supported_methods, PaymentMethod { method_type: b"ALIPAY", currency_symbol: b"CNY", decimals: 2 });
        Vector::push_back(&mut supported_methods, PaymentMethod { method_type: b"WECHAT", currency_symbol: b"CNY", decimals: 2 });
        Vector::push_back(&mut supported_methods, PaymentMethod { method_type: b"VISA", currency_symbol: b"USD", decimals: 2 });

        move_to(
            admin,
            UltimatePay {
                payments: payments_handle,
                refunds: refunds_handle,
                android_events: android_events_handle,
                admin: admin_address,
                fee_rate,
                supported_methods,
            }
        );
    }

    // 添加支持的支付方式（仅管理员可调用）
    public fun add_payment_method(
        admin: &signer,
        method_type: vector<u8>,
        currency_symbol: vector<u8>,
        decimals: u8
    ) acquires UltimatePay {
        assert!(Signer::address_of(admin) == borrow_global<UltimatePay>(Signer::address_of(admin)).admin, ERR_UNAUTHORIZED);
        let ultimate_pay = borrow_global_mut<UltimatePay>(Signer::address_of(admin));
        Vector::push_back(&mut ultimate_pay.supported_methods, PaymentMethod { method_type, currency_symbol, decimals });
    }

    // 支付函数
    public fun pay(
        sender: &signer,
        receiver: address,
        method_type: vector<u8>,
        currency_symbol: vector<u8>,
        amount: u64
    ) acquires UltimatePay {
        let sender_address = Signer::address_of(sender);
        let ultimate_pay = borrow_global_mut<UltimatePay>(sender_address);

        // 检查支付方式是否支持
        let payment_method = get_payment_method(&ultimate_pay.supported_methods, method_type, currency_symbol);
        assert!(Option::is_some(&payment_method), ERR_METHOD_NOT_SUPPORTED);
        let payment_method = Option::extract(&mut payment_method);

        // 检查金额是否有效
        assert!(amount > 0, ERR_INVALID_AMOUNT);

        // 计算手续费
        let fee = (amount * ultimate_pay.fee_rate) / 1000;
        let total_amount = amount + fee;

        // 检查余额是否足够
        assert!(Balance::balance(sender_address) >= total_amount, ERR_INSUFFICIENT_BALANCE);

        // 转账
        Balance::transfer(sender, receiver, amount);
        Balance::transfer(sender, ultimate_pay.admin, fee); // 手续费转给管理员

        // 触发支付事件
        let payment_id = Event::counter(&ultimate_pay.payments);
        Event::emit_event(
            &mut ultimate_pay.payments,
            PaymentEvent {
                payment_id,
                sender: sender_address,
                receiver,
                method_type,
                currency_symbol,
                amount,
                fee,
                timestamp: Timestamp::now(),
            }
        );

        // 触发安卓端事件
        let android_event_data = format_payment_event_data(payment_id, sender_address, receiver, method_type, currency_symbol, amount, fee);
        Event::emit_event(
            &mut ultimate_pay.android_events,
            AndroidEvent {
                event_id: Event::counter(&ultimate_pay.android_events),
                event_type: b"PAYMENT",
                data: android_event_data,
                timestamp: Timestamp::now(),
            }
        );
    }

    // 退款函数
    public fun refund(
        admin: &signer,
        payment_id: u64,
        refund_amount: u64
    ) acquires UltimatePay {
        assert!(Signer::address_of(admin) == borrow_global<UltimatePay>(Signer::address_of(admin)).admin, ERR_UNAUTHORIZED);
        let ultimate_pay = borrow_global_mut<UltimatePay>(Signer::address_of(admin));

        // 查找支付事件
        let payment_event = Event::get_event_by_id(&ultimate_pay.payments, payment_id);
        assert!(Option::is_some(&payment_event), Errors::not_found());

        let payment_event = Option::extract(&mut payment_event);

        // 检查退款金额是否有效
        assert!(refund_amount <= payment_event.amount, ERR_INVALID_AMOUNT);

        // 转账退款
        Balance::transfer(admin, payment_event.sender, refund_amount);

        // 触发退款事件
        let refund_id = Event::counter(&ultimate_pay.refunds);
        Event::emit_event(
            &mut ultimate_pay.refunds,
            RefundEvent {
                refund_id,
                payment_id,
                sender: payment_event.sender,
                receiver: payment_event.receiver,
                method_type: payment_event.method_type,
                currency_symbol: payment_event.currency_symbol,
                amount: refund_amount,
                timestamp: Timestamp::now(),
            }
        );

        // 触发安卓端事件
        let android_event_data = format_refund_event_data(refund_id, payment_id, payment_event.sender, payment_event.receiver, payment_event.method_type, payment_event.currency_symbol, refund_amount);
        Event::emit_event(
            &mut ultimate_pay.android_events,
            AndroidEvent {
                event_id: Event::counter(&ultimate_pay.android_events),
                event_type: b"REFUND",
                data: android_event_data,
                timestamp: Timestamp::now(),
            }
        );
    }

    // 获取支持的支付方式列表
    public fun get_supported_methods(): vector<PaymentMethod> acquires UltimatePay {
        borrow_global<UltimatePay>(@AptosPay).supported_methods
    }

    // 内部函数：根据支付方式和币种符号获取支付方式信息
    fun get_payment_method(
        methods: &vector<PaymentMethod>,
        method_type: vector<u8>,
        currency_symbol: vector<u8>
    ): Option<PaymentMethod> {
        let i = 0;
        while (i < Vector::length(methods)) {
            let method = Vector::borrow(methods, i);
            if (method.method_type == method_type && method.currency_symbol == currency_symbol) {
                return Option::some(*method);
            };
            i = i + 1;
        };
        Option::none<PaymentMethod>()
    }

    // 内部函数：格式化支付事件数据（模拟 JSON）
    fun format_payment_event_data(
        payment_id: u64,
        sender: address,
        receiver: address,
        method_type: vector<u8>,
        currency_symbol: vector<u8>,
        amount: u64,
        fee: u64
    ): vector<u8> {
        let data = b"{";
        data.append(b"\"payment_id\": ");
        data.append(String::utf8(payment_id));
        data.append(b", \"sender\": \"");
        data.append(String::utf8(sender));
        data.append(b"\", \"receiver\": \"");
        data.append(String::utf8(receiver));
        data.append(b"\", \"method_type\": \"");
        data.append(method_type);
        data.append(b"\", \"currency_symbol\": \"");
        data.append(currency_symbol);
        data.append(b"\", \"amount\": ");
        data.append(String::utf8(amount));
        data.append(b", \"fee\": ");
        data.append(String::utf8(fee));
        data.append(b"}");
        data
    }

    // 内部函数：格式化退款事件数据（模拟 JSON）
    fun format_refund_event_data(
        refund_id: u64,
        payment_id: u64,
        sender: address,
        receiver: address,
        method_type: vector<u8>,
        currency_symbol: vector<u8>,
        amount: u64
    ): vector<u8> {
        let data = b"{";
        data.append(b"\"refund_id\": ");
        data.append(String::utf8(refund_id));
        data.append(b", \"payment_id\": ");
        data.append(String::utf8(payment_id));
        data.append(b", \"sender\": \"");
        data.append(String::utf8(sender));
        data.append(b"\", \"receiver\": \"");
        data.append(String::utf8(receiver));
        data.append(b"\", \"method_type\": \"");
        data.append(method_type);
        data.append(b"\", \"currency_symbol\": \"");
        data.append(currency_symbol);
        data.append(b"\", \"amount\": ");
        data.append(String::utf8(amount));
        data.append(b"}");
        data
    }
}
