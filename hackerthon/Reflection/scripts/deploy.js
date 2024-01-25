const ethers = require('ethers');
const fs = require('fs');

async function main() {
    const contractArtifact = require('../artifacts/contracts/test.sol/test.json');
    const contractAbi = contractArtifact.abi;
    const contractBytecode = contractArtifact.bytecode;

    const provider = new ethers.JsonRpcProvider('http://localhost:7545');
    // 部署合约的账户私钥
    const privateKey = '0x52bf1bc295a27fa17c17e61c53ac085e0f73259b6d35d476825485170c9ba6e7';
    // 创建钱包对象
    const wallet = new ethers.Wallet(privateKey);
    // 创建签名对象
    const signer = wallet.connect(provider);

    console.log('signer：', signer);

    let nonce = await provider.getTransactionCount(signer.address);
    // 创建合约工厂对象
    const factory = new ethers.ContractFactory(contractAbi, contractBytecode, signer);
    console.log('factory:', factory);
    // 部署test合约并调用setUp函数
    const contract = await factory.deploy({ nonce });
    await contract.setUp();
    // 获取合约地址
    const agencyAddress = await contract.agency();
    const appAddress = await contract.app();
    const factoryAddress = await contract.factory();
    const appDeployAddress = await contract.appDeployAddress();
    const agencyDeployAddress = await contract.agencyDeployAddress();

    console.log('test合约已部署到地址：', contract.target);
    console.log('AgencyImp合约地址：', agencyAddress);
    console.log('AppImp合约地址：', appAddress);
    console.log('FactoryImp合约地址：', factoryAddress);
    console.log('appDeployAddress：', appDeployAddress);
    console.log('agencyDeployAddress：', agencyDeployAddress);
    // 将合约地址写入.env文件
    fs.appendFileSync('.env', `\nVITE_APP_CONTRACT_ADDRESS=${contract.target}\nVITE_APP_AGENCY_ADDRESS=${agencyAddress}\nVITE_APP_APP_ADDRESS=${appAddress}\nVITE_APP_FACTORY_ADDRESS=${factoryAddress}\nVITE_APP_DEPLOY_ADDRESS=${appDeployAddress}\nVITE_APP_AGENCY_DEPLOY_ADDRESS=${agencyDeployAddress}\n`);
    // 创建Agency合约对象并设置app合约地址
    const AgencyArtifact = require('../artifacts/contracts/ReflectionAgencyImp.sol/AgencyImp.json')
    const Agencycontract = new ethers.Contract(agencyAddress, AgencyArtifact.abi, signer);
    nonce = await provider.getTransactionCount(signer.address);
    await Agencycontract.setAppImpAddress(appAddress,{ nonce: nonce })
}

main().catch(console.error);
