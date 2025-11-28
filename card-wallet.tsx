'use client';

import { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { FiEyeOff, FiEye } from 'react-icons/fi';

interface CurrencyItem {
  currency: string;
  amount: string;
  bgColor: string;
}

const INITIAL_CURRENCIES: CurrencyItem[] = [
  { currency: 'Pounds', amount: '€67,000', bgColor: 'bg-[#385B73]' },
  { currency: 'Euro', amount: '£24,000', bgColor: 'bg-amber-500' },
  { currency: 'Dollar', amount: '$54,000', bgColor: 'bg-orange-600' },
];

const TOTAL_BALANCE = '$100,000';

export default function CardWallet() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [stack, setStack] = useState(INITIAL_CURRENCIES);

  const moveTopToBack = () => {
    setStack((prev) => [...prev.slice(1), prev[0]]);
  };

  const moveBackToTop = () => {
    setStack((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  };

  const handleDragEnd = (infoY: number, index: number) => {
    if (index === 0 && infoY < -20) moveTopToBack();
    if (index === stack.length - 1 && infoY > 20) moveBackToTop();
  };

  return (
    <div className='relative'>
      <div className='h-[250px] z-50 top-15 relative'>
        {stack.map((item, index) => {
          const offset = index * 35;
          const scale = 1 - index * 0.05;
          const z = stack.length - index;
          const yMotion = useMotionValue(0);

          return (
            <motion.div
              key={item.currency}
              drag='y'
              dragConstraints={{ top: -18, bottom: 0 }}
              layout={false}
              transition={{ type: 'spring', stiffness: 100, damping: 26 }}
              onDragEnd={(e, info) => {
                yMotion.set(0);
                handleDragEnd(info.offset.y, index);
              }}
              className={`
                w-[93%] h-32 p-4 flex justify-between rounded-3xl text-white shadow-xl 
                absolute right-1/2 translate-x-1/2 cursor-grab ${item.bgColor}
              `}
              style={{
                y: yMotion,
                top: 0,
                zIndex: z,
                translateY: -offset,
                scale: scale,
              }}
              whileHover={{ scale: scale + 0.03 }}
              whileTap={{ scale: Math.max(scale - 0.05, 0.85) }}
            >
              <span>{item.currency}</span>
              <span>{item.amount}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Wallet background */}
      <div className='absolute inset-x-0 bottom-0 top-[30px] bg-[#2C4140] rounded-3xl shadow-2xl'>
        <div className='absolute z-50 inset-x-0 bottom-0 top-14 p-2 mx-2 my-3 bg-[#2C4140] border border-dashed border-white rounded-b-3xl flex flex-col justify-end items-center text-white'>
          <h1 className='text-4xl font-semibold'>
            {isBalanceVisible ? TOTAL_BALANCE : '******'}
          </h1>
          <p className='text-sm opacity-80 mb-6'>Total Balance</p>

          <button
            onClick={() => setIsBalanceVisible((p) => !p)}
            className='flex items-center text-sm px-4 py-1 border border-white rounded-full hover:bg-white/20'
          >
            {isBalanceVisible ? (
              <FiEyeOff className='mr-2' />
            ) : (
              <FiEye className='mr-2' />
            )}
            {isBalanceVisible ? 'Hide balance' : 'Show balance'}
          </button>
        </div>
      </div>
    </div>
  );
}
