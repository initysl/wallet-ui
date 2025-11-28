import CardWallet from './components/card-wallet';
import TransactionList from './components/transaction-list';
import { GoArrowUp, GoArrowUpLeft } from 'react-icons/go';

export default function WalletUI() {
  return (
    <div className='min-h-screen flex justify-center py-5 font-sans'>
      <div className='w-full max-w-sm '>
        <h3 className='text-gray-950 text-2xl font-semibold mb-15'>
          My Wallet
        </h3>
        <CardWallet />
        <div className='flex space-x-4 mt-6 mb-8'>
          <button className='flex-1 flex items-center justify-center py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl shadow-sm hover:bg-gray-200 transition duration-150'>
            <GoArrowUp className='mr-2' />
            Deposit
          </button>
          <button className='flex-1 flex items-center justify-center py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl shadow-sm hover:bg-gray-200 transition duration-150'>
            <GoArrowUpLeft className='mr-2' />
            Withdraw
          </button>
        </div>
        <TransactionList />
      </div>
    </div>
  );
}
