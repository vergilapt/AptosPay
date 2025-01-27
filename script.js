document.getElementById('buyButton').addEventListener('click', async () => {
    if (window.aptos) {
        try {
            const account = await window.aptos.connect();
            const payload = {
                function: "0x1::aptos_account::transfer",
                type_arguments: [],
                arguments: [
                    "0xfd976733bcf3b61db85149f7f2dfdf9140620001d3c1238f9c9ece83e6cfaf32",
                    1000000000 // 10 APT，单位为 Octa
                ]
            };
            const txnHash = await window.aptos.signAndSubmitTransaction(payload);
            alert(`支付成功！交易哈希：${txnHash}`);
        } catch (error) {
            alert(`支付失败`);
        }
    } else {
        alert('请安装 PETRA 钱包');
    }
});
