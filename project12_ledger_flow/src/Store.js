import { create } from 'zustand'
import { v6 as uuidv6 } from 'uuid'

export const useLedgerStore = create((set) => ({
    transactions: [],
    addTransactions: (transactions) => {
        set((state) => ({
            transactions: [
                {
                    ...transactions,
                    date: Date.now(),
                    id: uuidv6(),
                },
                ...state.transactions,
            ],
        }));
    },

        deleteTransactions: (id) => {
        set((state) => ({
            transactions: state.transactions.filter((data) => data.id !== id),
        }));
    },
}));

//Transaction
//{
    // Date
    // Id
    // TransactionType = Income | Expense
    //Description
    //Amount
//}