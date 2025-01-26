const express = require('express');
const { Aptos, AptosConfig, Network, Account } = require('@aptos-labs/ts-sdk');
const app = express();
const port = 3000;

// 初始化Aptos客户端
const config = new AptosConfig({ network: Network.TESTNET });
const client = new Aptos(config);

// 商家账户
const merchantPrivateKey = process.env.MERCHANT_PRIVATE_KEY;
const merchantAccount = new Account({ privateKey: merchantPrivateKey });

app.use(express.json());

// 支付API
app.post('/api/pay', async (req, res) => {
    try {
        const { amount, currency } = req.body;
        
        const { userAddress } = req.body;
        
        // 创建转账交易
        const transaction = await client.transaction.build.simple({
            sender: userAddress,
            data: {
                function: `0x1::coin::transfer`,
                typeArguments: [`0x1::${currency}::${currency}`],
                functionArguments: [merchantAccount.accountAddress, amount]
            }
        });

        // 签名并提交交易
        const txnHash = await client.signAndSubmitTransaction({
            signer: merchantAccount,
            transaction
        });

        // 等待交易确认
        await client.waitForTransaction({ transactionHash: txnHash });
        
        res.json({
            success: true,
            txHash: txnHash,
            status: 'confirmed'
        });
    } catch (error) {
        console.error('支付处理失败:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`支付服务运行在 http://localhost:${port}`);
});
