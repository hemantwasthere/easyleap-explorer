import Navbar from "@/components/navbar";
import TransactionTable from "@/components/transaction-table";
import { getTransactions } from "@/hooks/transactions";

export default async function Home() {
  const txns = await getTransactions();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-100">
          Bridge Transactions
        </h1>
        <TransactionTable txns={txns} />
      </main>
    </div>
  );
}
