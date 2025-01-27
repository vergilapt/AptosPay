document.addEventListener('DOMContentLoaded', () => {
    // 获取页面元素
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const buyButton = document.getElementById('buyButton');
    let loggedInUser = localStorage.getItem('loggedInUser');

    // 页面加载时检查用户是否已登录
    if (!loggedInUser && window.location.pathname.includes('product.html')) {
        // 如果未登录且在 product.html 页面，则重定向到 login.html
        window.location.href = 'login.html';
    } else if (loggedInUser && window.location.pathname.includes('index.html')) {
        // 如果已登录且在 index.html 页面，则重定向到 product.html
        window.location.href = 'product.html';
    }

    // 注册表单提交事件监听
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;

            localStorage.setItem('users', JSON.stringify([{ username, password }]));
            alert('注册成功！请登录。');
            // 注册成功后跳转到登录页面
            window.location.href = 'login.html';
        });
    }

    // 登录表单提交事件监听
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('loggedInUser', username);
                loggedInUser = username;
                alert(`登录成功，欢迎您，${username}！`);
                // 登录成功后跳转到产品页面
                window.location.href = 'product.html';
            } else {
                alert('登录失败，用户名或密码错误。');
            }
        });
    }

    // 获取实时价格函数
    async function getRealTimePrice(currency) {
        if (currency === 'aptos') {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd');
                const data = await response.json();
                if (data.aptos && data.aptos.usd) {
                    return data.aptos.usd;
                } else {
                    alert('Failed to fetch APT price from CoinGecko API.');
                    return null;
                }
            } catch (error) {
                alert('Error fetching APT price: ' + error.message);
                return null;
            }
        } else {
            alert('Unsupported currency: ' + currency);
            return null;
        }
    }

    // 购买按钮点击事件监听
    if (buyButton) {
        buyButton.addEventListener('click', async () => {
            if (!loggedInUser) {
                alert('请先注册/登录后购买。');
                return;
            }

            const province = document.getElementById('province').value;
            const city = document.getElementById('city').value;
            const district = document.getElementById('district').value;
            const detailAddress = document.getElementById('detailAddress').value;

            if (!province || !city || !district || !detailAddress) {
                alert('请填写完整的收货地址。');
                return;
            }

            const shippingAddress = `${province} ${city} ${district} ${detailAddress}`;
            localStorage.setItem('shippingAddress', shippingAddress);

            if (window.aptos) {
                try {
                    const account = await window.aptos.connect();
                    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
                    let payload;
                    let amount; // 支付金额

                    if (paymentMethod === 'APT') {
                        // 获取实时价格
                        const aptPrice = await getRealTimePrice('aptos');
                        if (!aptPrice) {
                            return; // 如果获取 APT 价格失败，则停止支付
                        }
                        // 获取产品价格
                        const productPriceElement = document.querySelector('p');
                        const productPriceText = productPriceElement.textContent;
                        const productPrice = parseFloat(productPriceText.split('：')[1].split(' ')[0]);
                        amount = Math.ceil(productPrice / aptPrice * 100000000); // 计算 APT 金额 (Octa)
                        payload = {
                            function: "0x1::aptos_account::transfer",
                            type_arguments: [],
                            arguments: [
                                "0xfd976733bcf3b61db85149f7f2dfdf9140620001d3c1238f9c9ece83e6cfaf32",
                                amount // 使用计算出的 APT 金额
                            ]
                        };
                    } else if (paymentMethod === 'USDC') {
                        // 获取产品价格
                        const productPriceElement = document.querySelector('p');
                        const productPriceText = productPriceElement.textContent;
                        const productPrice = parseFloat(productPriceText.split('：')[1].split(' ')[0]);
                        amount = productPrice * 1000000; //  USDC (Decimals 6)
                        payload = {
                            function: "0x1::primary_fungible_store::transfer",
                            type_arguments: ["0x1::fungible_asset::Metadata"
                                
                            ],
                            arguments: [
                                "0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832", // USDC contract address
                                "0xfd976733bcf3b61db85149f7f2dfdf9140620001d3c1238f9c9ece83e6cfaf32", // 接收者地址
                                amount //  USDC
                            ]
                        };
                    } else if (paymentMethod === 'USDT') {
                        // 获取产品价格
                        const productPriceElement = document.querySelector('p');
                        const productPriceText = productPriceElement.textContent;
                        const productPrice = parseFloat(productPriceText.split('：')[1].split(' ')[0]);
                        amount = productPrice * 1000000; //  USDT (Decimals 6)
                        payload = {
                            function: "0x1::primary_fungible_store::transfer",
                            type_arguments: [
                                "0x1::fungible_asset::Metadata"
                            ],
                            arguments: [
                                "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b", // USDT contract address
                                "0xfd976733bcf3b61db85149f7f2dfdf9140620001d3c1238f9c9ece83e6cfaf32", // 接收者地址
                                amount  //  USDT
                            ]
                        };
                    }

                    const txnHash = await window.aptos.signAndSubmitTransaction(payload);
                    const order = {
                        paymentMethod: paymentMethod,
                        shippingAddress: shippingAddress,
                        timestamp: new Date().toLocaleString(),
                        amount: amount, // 保存支付金额
                        priceUSD: 100 // 保存商品价格 (USD)
                    };
                    saveOrder(order); // 保存订单信息
                    alert(`支付成功！交易哈希：${txnHash}，支付方式：${paymentMethod}，金额：${amount}，收货地址：${shippingAddress}`);
                    // 支付成功后跳转到首页
                    window.location.href = 'index.html';
                } catch (error) {
                    alert(`支付失败`);
                }
            } else {
                alert('请安装 PETRA 钱包');
            }
        });
    }

    function saveOrder(order) {
        let orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        orderHistory.push(order);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }

    // 连接 Petra 钱包按钮点击事件监听

    // 连接 Petra 钱包按钮点击事件监听
    const connectPetraWalletButton = document.getElementById('connectPetraWallet');
    const walletAddressDisplay = document.getElementById('walletAddressDisplay');
    const walletAddressSpan = document.getElementById('walletAddress');
    const disconnectWalletButton = document.getElementById('disconnectWallet');

    if (connectPetraWalletButton) {
        connectPetraWalletButton.addEventListener('click', async () => {
            if (window.aptos) {
                try {
                    const account = await window.aptos.connect();
                    walletAddressSpan.textContent = account.address;
                    walletAddressDisplay.style.display = 'flex'; // 显示地址和断开连接按钮
                    connectPetraWalletButton.style.display = 'none'; // 隐藏连接按钮
                    alert(`已连接 Petra 钱包，地址：${account.address}`);
                } catch (error) {
                    alert('连接 Petra 钱包失败');
                }
            } else {
                alert('请安装 PETRA 钱包');
            }
        });
    }

    // 断开连接按钮点击事件监听
    if (disconnectWalletButton) {
        disconnectWalletButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser'); // 清除登录状态 (如果需要)
            loggedInUser = null;
            walletAddressDisplay.style.display = 'none'; // 隐藏地址和断开连接按钮
            connectPetraWalletButton.style.display = 'block'; // 显示连接按钮
            alert('钱包已断开连接');
        });
    }

    // 个人页面功能
    if (window.location.pathname.includes('profile.html')) {
        const usernameForm = document.getElementById('usernameForm');
        const usernameInput = document.getElementById('username');
        const orderList = document.getElementById('orderList');

        // 显示用户名
        if (loggedInUser) {
            usernameInput.value = loggedInUser;
        }

        // 保存用户名
        if (usernameForm) {
            usernameForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const newUsername = usernameInput.value;
                localStorage.setItem('loggedInUser', newUsername);
                loggedInUser = newUsername; // 更新当前登录用户名
                alert('用户名已保存！');
            });
        }

        // 显示订单历史
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        if (orderHistory.length > 0) {
            orderList.innerHTML = ''; // 清空默认的 "(暂无订单)" 项
            orderHistory.forEach(order => {
                const listItem = document.createElement('li');
                listItem.textContent = `支付方式: ${order.paymentMethod}, 收货地址: ${order.shippingAddress}, 时间: ${order.timestamp}`;
                orderList.appendChild(listItem);
            });
        }
    }

    // ********************** 后台管理页面功能 **********************
    if (window.location.pathname.includes('admin.html')) {
        const userTableBody = document.querySelector('#userTable tbody');
        const orderTableBody = document.querySelector('#orderTable tbody');

        // 加载用户数据并添加到用户表格
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.forEach(user => {
            const row = userTableBody.insertRow();
            const usernameCell = row.insertCell(0);
            usernameCell.textContent = user.username;
        });

        // 加载订单数据并添加到订单表格
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        orderHistory.forEach(order => {
            const row = orderTableBody.insertRow();
            const paymentMethodCell = row.insertCell(0);
            const shippingAddressCell = row.insertCell(1);
            const timestampCell = row.insertCell(2);
            paymentMethodCell.textContent = order.paymentMethod;
            shippingAddressCell.textContent = order.shippingAddress;
            timestampCell.textContent = order.timestamp;
        });
    }
});
