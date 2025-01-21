module MyPay::PAY {
    use Std::Signer;
    use Std::Event;
    use Std::Debug;
    use Std::Vector;
    use Std::Option;
    use Std::Errors;

    // 定义事件结构，用于记录支付交易
    struct PaymentEvent has drop, store {
        sender: address,
        receiver: address,
        amount: u64,
    }

    // 定义支付资源，存储用户的余额
    struct Balance has key {
        value: u64,
    }

    // 定义事件处理器
    struct PaymentEvents has key {
        payment_events: Event::EventHandle<PaymentEvent>,
    }

    // 初始化模块
    public fun initialize(account: &signer) {
        // 为部署者账户初始化事件处理器
        let payment_events = Event::new_event_handle<PaymentEvent>(account);
        move_to(account, PaymentEvents { payment_events });
    }

    // 存款函数，允许用户向自己的账户存入代币
    public entry fun deposit(account: &signer, amount: u64) acquires Balance {
        let account_addr = Signer::address_of(account);
        if (!exists<Balance>(account_addr)) {
            move_to(account, Balance { value: amount });
        } else {
            let balance = borrow_global_mut<Balance>(account_addr);
            balance.value = balance.value + amount;
        };
    }

    // 支付函数，允许用户向另一个账户发送代币
    public entry fun pay(
        sender: &signer,
        receiver: address,
        amount: u64,
    ) acquires Balance, PaymentEvents {
        let sender_addr = Signer::address_of(sender);

        // 检查发送者余额是否足够
        assert!(exists<Balance>(sender_addr), Errors::invalid_state(100));
        let sender_balance = borrow_global_mut<Balance>(sender_addr);
        assert!(sender_balance.value >= amount, Errors::invalid_argument(101));

        // 扣除发送者余额
        sender_balance.value = sender_balance.value - amount;

        // 增加接收者余额
        if (!exists<Balance>(receiver)) {
            move_to(sender, Balance { value: amount });
        } else {
            let receiver_balance = borrow_global_mut<Balance>(receiver);
            receiver_balance.value = receiver_balance.value + amount;
        };

        // 记录支付事件
        let payment_events = &mut borrow_global_mut<PaymentEvents>(sender_addr).payment_events;
        Event::emit_event(payment_events, PaymentEvent {
            sender: sender_addr,
            receiver,
            amount,
        });

        // 打印调试信息
        Debug::print(&b"Payment successful!");
    }

    // 查询余额函数
    public fun get_balance(account: address): u64 acquires Balance {
        assert!(exists<Balance>(account), Errors::invalid_state(100));
        borrow_global<Balance>(account).value
    }
}
