import React from 'react';
import TransactionForm from './TransactionForm.jsx';
import TransactionList from './TransactionList.jsx';
import Balances from './Balances.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-500 selection:text-white">
      {/* Top Global Navigation/Header bar */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black tracking-tighter shadow-sm shadow-blue-200">
              L
            </div> 
            <span className="font-bold text-lg tracking-tight text-slate-800">Personal Ledger</span>
          </div>
        </div>
      </header>

      

      {/* Two-Column Responsive Layout Grid Container */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        <Balances />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Sticky placement on scroll) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <TransactionForm />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <TransactionList />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;