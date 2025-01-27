console.log(aptos); // Added console.log to inspect the aptos global object

const NODE_URL = "https://testnet.aptoslabs.com/v1";
const FAUCET_URL = "https://faucet.testnet.aptoslabs.com";

const client = new aptos.AptosClient(NODE_URL);
const coinClient = new aptos.CoinClient(client);

const wallet = new martianWalletAdapter.MartianWalletAdapter();

async function generateWallet() {
    const account = new aptos.AptosAccount();
    return account;
}

async function displayWalletInfo() {
    console.log("displayWalletInfo function is called");
    const walletAddressSpan = document.getElementById("wallet-address");
    const usdcBalanceSpan = document.getElementById("usdc-balance");
    const usdtBalanceSpan = document.getElementById("usdt-balance");

    // 连接钱包
    const connectWalletButton = document.getElementById("connect-wallet-button");
    connectWalletButton.addEventListener("click", async () => {
        try {
            await wallet.connect();
            const account = await wallet.account();
            walletAddressSpan.textContent = account.address;
            // 连接成功后更新余额信息
            updateBalanceInfo(account.address);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            walletAddressSpan.textContent = "连接失败";
        }
    });

    // 初始显示 "未连接"
    walletAddressSpan.textContent = "Not Connected";
    usdcBalanceSpan.textContent = "0";
    usdtBalanceSpan.textContent = "0";
}

async function updateBalanceInfo(walletAddress) {
    const usdcBalanceSpan = document.getElementById("usdc-balance");
    const usdtBalanceSpan = document.getElementById("usdt-balance");

    // TODO: 获取 USDC 和 USDT 余额
    // const usdcBalance = await coinClient.getBalance(walletAddress, "USDC"); // 假设 USDC 的名称或符号是 "USDC"
    // const usdtBalance = await coinClient.getBalance(walletAddress, "USDT"); // 假设 USDT 的名称或符号是 "USDT"

    usdcBalanceSpan.textContent = "TBD"; // 暂时设置为 TBD
    usdtBalanceSpan.textContent = "TBD"; // 暂时设置为 TBD
}


(async () => {
    displayWalletInfo();
})();
