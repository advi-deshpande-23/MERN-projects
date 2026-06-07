import React from 'react';
import { useState } from 'react';
import { useLedgerStore } from './Store';
// Import Lucide icons for better visual cues
import { PlusCircle, DollarSign, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TransactionForm = () => {
  const addTransactions = useLedgerStore((state) => state.addTransactions);
  const allTransactions = useLedgerStore((state) => state.transactions);

  const [currTrans, setCurrentTrans] = useState({
    description: "",
    amount: "",
    type: "Expense",
  });

  function handleAddTransaction() {
    if (currTrans.description.trim().length === 0) return;
    if (Number(currTrans.amount) <= 0) return;

    addTransactions({
      ...currTrans,
      amount: Number(currTrans.amount), // Ensures amount is passed as a number
    });

    setCurrentTrans({
      description: "",
      amount: "",
      type: "Expense",
    });
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">New Transaction</h2>
        <p className="text-sm text-slate-500">Track your income or record a new expense.</p>
      </div>

      <div className="space-y-4">
        {/* Transaction Type - Modern Segmented Control */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
          <label 
            htmlFor="expense" 
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium cursor-pointer transition-all ${
              currTrans.type === "Expense" 
                ? "bg-white text-rose-600 shadow-sm" 
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <input 
              checked={currTrans.type === "Expense"}
              onChange={() => setCurrentTrans({ ...currTrans, type: "Expense" })}
              type="radio" name="type" id='expense' className="sr-only" 
            />
            <ArrowDownRight className="w-4 h-4" />
            Expense
          </label>

          <label 
            htmlFor="income" 
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium cursor-pointer transition-all ${
              currTrans.type === "Income" 
                ? "bg-white text-emerald-600 shadow-sm" 
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <input 
              checked={currTrans.type === "Income"}
              onChange={() => setCurrentTrans({ ...currTrans, type: "Income" })}
              type="radio" name="type" id='income' className="sr-only" 
            />
            <ArrowUpRight className="w-4 h-4" />
            Income
          </label>
        </div>

        {/* Description Input */}
        <div className="space-y-1.5">
          <label htmlFor="description" className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
            Description
          </label>
          <div className="relative flex items-center">
            <FileText className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
            <input 
              value={currTrans.description}
              onChange={(e) => setCurrentTrans({ ...currTrans, description: e.target.value })} 
              type="text" 
              id="description" 
              placeholder="e.g., Grocery shopping, Salary"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-1.5">
          <label htmlFor="amount" className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
            Amount
          </label>
          <div className="relative flex items-center">
            <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
            <input 
              value={currTrans.amount || ''} 
              onChange={(e) => setCurrentTrans({ ...currTrans, amount: e.target.value })}
              type="number" 
              id="amount"
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleAddTransaction}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98] ${
          currTrans.type === 'Expense' 
            ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-100' 
            : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'
        }`}
      >
        <PlusCircle className="w-4 h-4" />
        Add {currTrans.type}
      </button>
    </div>
  );
};

export default TransactionForm;