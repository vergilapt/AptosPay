// 获取支付按钮
const payButton = document.getElementById('payButton');

// 支付按钮点击事件
payButton.addEventListener('click', async () => {
    try {
        // 调用后端API处理支付
        const response = await fetch('/api/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: '10', // 支付金额
                currency: 'USDC' // 支付币种
            })
        });

        const result = await response.json();
        
        if (result.success) {
            alert('支付成功！交易哈希：' + result.txHash);
        } else {
            alert('支付失败：' + result.error);
        }
    } catch (error) {
        console.error('支付出错：', error);
        alert('支付过程中出现错误');
    }
});
