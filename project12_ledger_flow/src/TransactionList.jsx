import React from 'react';
import { useLedgerStore } from './Store';
// Import Lucide icons for semantic styling
import { Trash2, ArrowUpRight, ArrowDownRight, Calendar, Layers } from 'lucide-react';

const TransactionList = () => {
  const allTransactions = useLedgerStore((store) => store.transactions);
  const deleteTransactions = useLedgerStore((store) => store.deleteTransactions);

  function handleDelete(id) {
    deleteTransactions(id);
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">History</h2>
          <p className="text-sm text-slate-500">Your recent financial activities.</p>
        </div>
        <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
          {allTransactions.length} Total
        </span>
      </div>

      {/* Empty State Fallback */}
      {allTransactions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
          <div className="p-3 bg-slate-50 text-slate-400 rounded-full">
            <Layers className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">No transactions recorded yet.</p>
        </div>
      )}

      {/* List container */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
        {allTransactions.map((data) => {
          let { date, description, type, amount, id } = data;
          const isIncome = type === "Income";

          return (
            <div 
              key={id} // Added key attribute for React rendering performance
              className="group flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100/80 transition-all border border-transparent hover:border-slate-200"
            >
              {/* Left Side: Type Icon & Meta */}
              <div className="flex items-center gap-3.5">
                <div className={`p-2.5 rounded-xl ${
                  isIncome ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                }`}>
                  {isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">{description}</h4>
                  {date && (
                    <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{date}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Amount & Actions */}
              <div className="flex items-center gap-4">
                <span className={`font-bold text-sm ${
                  isIncome ? "text-emerald-600" : "text-slate-700"
                }`}>
                  {isIncome ? "+" : "-"}${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                
                <button 
                  onClick={() => handleDelete(id)}
                  aria-label="Delete Transaction"
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;