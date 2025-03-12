import Navbar from "@/components/navbar";
import { type Column } from "@/components/table/columns";
import TransactionTable from "@/components/transaction-table";
import { getTransactions } from "@/hooks/transactions";

export default async function Home() {
  const txns = await getTransactions();

  const filteredTxns = txns?.findManyDestination_requests.filter((txn: any) => {
    const sameRequestTxns = txns?.findManyDestination_requests.filter(
      (tx: any) => tx.request_id === txn.request_id
    );

    const hasConfirmedAndFailed = sameRequestTxns.some(
      (tx: any) => tx.status === "confirmed" || tx.status === "failed"
    );

    if (hasConfirmedAndFailed) {
      return txn.status === "confirmed" || txn.status === "failed";
    }

    return txn.status === "pending";
  });

  const transactions: Column[] = filteredTxns.map((txn: any) => {
    const srcTxn = txns?.findManySource_requests.find(
      (tx: any) => tx.request_id === txn.request_id
    );

    let bridgeTxnHash = txns?.findManyDestination_requests
      ?.filter((tx: any) => tx?.request_id === txn?.request_id)
      .find((tx: any) => tx?.status === "pending")?.txHash;

    return {
      requestId: txn.request_id,
      srcTxn: srcTxn?.txHash ?? null,
      srcChain: srcTxn?.chain ?? null,
      bridgeTxn: bridgeTxnHash ?? "",
      amount: txn.amount_raw,
      status: txn.status,
      txHash: txn.txHash,
      token: txn.token,
    } as Column;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar transactions={transactions} />

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-100">
          Bridge Transactions
        </h1>
        <TransactionTable transactions={transactions} />
      </main>
    </div>
  );
}
