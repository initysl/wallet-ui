interface Transaction {
  id: number;
  type: string;
  currency: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  amount: string;
}

const recentTransactions: Transaction[] = [
  {
    id: 1,
    type: 'Exchange to NGN',
    currency: 'USD',
    date: '12-11-2025',
    status: 'Completed',
    amount: '+₦145,000',
  },
  {
    id: 2,
    type: 'Bank Transfer',
    currency: 'Z',
    date: '12-11-2025',
    status: 'Pending',
    amount: '+$500',
  },
  {
    id: 3,
    type: 'Withdraw to Bank',
    currency: 'Z',
    date: '12-11-2025',
    status: 'Completed',
    amount: '-$1,200',
  },
];

const TransactionItem: React.FC<Transaction> = ({
  type,
  date,
  status,
  amount,
  currency,
}) => {
  const statusColor =
    status === 'Completed'
      ? 'bg-green-100 text-green-700'
      : status === 'Pending'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-red-100 text-red-700';

  const CurrencyIcon = () => (
    <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold'>
      {currency === 'USD' ? '🇺🇸' : 'Z'}
    </div>
  );

  return (
    <div className='flex justify-between items-center py-3'>
      <div className='flex items-center space-x-4'>
        <CurrencyIcon />
        <div className='text-sm'>
          <p className='font-semibold text-gray-800'>{type}</p>
          <div className='flex items-center text-xs text-gray-500 space-x-2'>
            <span>{date}</span>
            <span className='h-1 w-1 bg-gray-400 rounded-full'></span>
            <span className={`px-2 py-0.5 rounded-full ${statusColor}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
      <p
        className={`font-semibold text-base ${
          status === 'Failed' ? 'text-red-500' : 'text-gray-800'
        }`}
      >
        {amount}
      </p>
    </div>
  );
};

export default function TransactionList() {
  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <h4 className='text-lg font-bold text-gray-800'>Recent Transaction</h4>
        <a href='#' className='text-sm text-gray-500 hover:text-gray-700'>
          View all
        </a>
      </div>
      <div className='space-y-1'>
        {recentTransactions.map((tx) => (
          <TransactionItem key={tx.id} {...tx} />
        ))}
      </div>
    </div>
  );
}
