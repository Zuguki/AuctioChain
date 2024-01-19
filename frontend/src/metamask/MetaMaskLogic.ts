import { ethers } from 'ethers';
import { stateApp, userStore } from '../context/context.ts';
import LocalStorageLogic from '../auxiliaryTools/localStorageLogic/LocalStorageLogic.ts';
import BalanceService from '../API/service/BalanceService.ts';
import { NotificationTransaction } from '../auxiliaryTools/notificationLogic/VarietesNotifications.ts';

export default class MetaMaskLogic {
    private static contractAddress: string =
        '0x524043c049c5bDEdEB9A6014bc11Db4cA9dBDBD0';
    private static contractABI = [
        {
            inputs: [],
            name: 'payForItem',
            outputs: [],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'userAddress',
                    type: 'address',
                },
            ],
            name: 'removeUserFromMap',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'userAddress',
                    type: 'address',
                },
            ],
            name: 'getUserBalance',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'result',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            name: 'payments',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
    ];
    // открытие метамаска
    private static web3Provider = new ethers.BrowserProvider(window.ethereum);
    private static contract = new ethers.Contract(
        MetaMaskLogic.contractAddress,
        MetaMaskLogic.contractABI,
        MetaMaskLogic.web3Provider,
    );

    public static async handleClickMetamask(): Promise<void> {
        try {
            const [bill] = await MetaMaskLogic.web3Provider.send(
                'eth_requestAccounts',
                [],
            );
            userStore.setBill(bill);
            LocalStorageLogic.setToStorage<string>(
                LocalStorageLogic.BILL,
                bill,
            );
        } catch (e) {
            alert('He удалось подключить кошлёк!');
            console.log(e);
        }
    }

    public static async sendEth(eph: string): Promise<number | undefined> {
        try {
            const billUser: string = userStore.getBill();
            if (!billUser) {
                alert('Кошлек не подключён к сайту!');
                return;
            }
            const [address] = await MetaMaskLogic.web3Provider.send(
                'eth_requestAccounts',
                [],
            );
            if (address !== billUser) {
                alert(
                    'Невозможно выполнить транзакцию! Проверьте номер кошлека в MetaMask!',
                );
                return;
            }

            const signer = await MetaMaskLogic.web3Provider.getSigner();
            const contractWithSigner = MetaMaskLogic.contract.connect(signer);
            await BalanceService.postBalance(signer.address);
            await contractWithSigner
                .getFunction('payForItem')
                .send({ value: ethers.parseEther(eph) });
            LocalStorageLogic.setProcessAddMoney(true);
            const prevBalance: number | undefined =
                await this.requestUserMoney();
            if (!prevBalance) {
                alert(
                    'Невозможно получить данные о балансе! Уведомления не буут отображаться!',
                );
                return;
            }
            LocalStorageLogic.startLoadingTransaction(prevBalance);
            stateApp.setNotification(NotificationTransaction);
            return await this.getUserMoney();
        } catch (error) {
            console.log(JSON.stringify(error, null, 4));
            alert(`Ошибка транзакции! ${error?.info?.error?.message || ''}`);
            return;
        }
    }

    public static async getUserMoney(): Promise<number> {
        const prevBalance: number | null =
            LocalStorageLogic.getToStorage<number>(
                LocalStorageLogic.PREV_BALANCE,
            );
        return new Promise(resolve => {
            const requestBalance: NodeJS.Timer = setInterval(
                async (): Promise<void> => {
                    const balance: number | undefined =
                        await this.requestUserMoney();
                    if (!prevBalance || !balance) {
                        alert('Ошибка транзакции!');
                        return;
                    }
                    if (prevBalance < balance) {
                        clearInterval(requestBalance);
                        resolve(
                            Number(balance - prevBalance) / Math.pow(10, 14),
                        );
                    }
                },
                10_000,
            );
        });
    }

    private static async requestUserMoney(): Promise<number | undefined> {
        try {
            const signer = await MetaMaskLogic.web3Provider.getSigner();
            const balance = await MetaMaskLogic.contract.getUserBalance(
                signer.address,
            );
            return Number(balance);
        } catch (e) {
            console.log('requestUserMoney err');
        }
    }
}
