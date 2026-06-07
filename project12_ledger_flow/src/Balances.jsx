import React from 'react';
import { useLedgerStore } from './Store';
import { useState } from "react";
// Import Lucide icons for financial data visualization
import { Wallet, ArrowUpRight, ArrowDownRight, ArrowUpCircle, ArrowDownCircle, Scale, PieChart as PieIcon} from 'lucide-react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";


const Balances = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const allTransactions = useLedgerStore(state => state.transactions);

  let totalIncome = 0;
  let totalExpense = 0;

  allTransactions.forEach((data) => {
    if (data.type === 'Income') {
      totalIncome += Number(data.amount);
    } else {
      totalExpense += Number(data.amount);
    }
  });

   const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const data = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
  ];

  // Colors matching the UI theme: Emerald-500 and Rose-500
  const COLORS = ["#10b981", "#f43f5e"];

  const netBalance = totalIncome - totalExpense;

  // Format helper for numbers to ensure crisp financial typography
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
      {/* Net Balance Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Balance</p>
          <h3 className={`text-2xl font-bold tracking-tight ${
            netBalance >= 0 ? 'text-slate-800' : 'text-rose-600'
          }`}>
            {formatCurrency(netBalance)}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${
          netBalance >= 0 ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
        }`}>
          <Wallet className="w-5 h-5" />
        </div>
      </div>

      {/* Total Income Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Income</p>
          <h3 className="text-2xl font-bold tracking-tight text-emerald-600">
            {formatCurrency(totalIncome)}
          </h3>
        </div>
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* Total Expense Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Expenses</p>
          <h3 className="text-2xl font-bold tracking-tight text-rose-600">
            {formatCurrency(totalExpense)}
          </h3>
        </div>
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
          <ArrowDownRight className="w-5 h-5" />
        </div>
      </div>

  {/* 4. Chart Section (Spans across all columns on desktop) */}
      <div className="md:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-4">
          <PieIcon className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-800">Income vs Expense Ratio</h3>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                data={data}
                dataKey="amount" 
                innerRadius={60} 
                outerRadius={100}
                paddingAngle={5}
                onMouseEnter={onPieEnter}
                onMouseLeave={() => setActiveIndex(-1)}
                style={{ cursor: "pointer", outline: "none" }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
    </div>
    


    </div>
  );
};

export default Balances;