import Navbar from "@/components/navbar";
import { type StatusBadgeProps } from "@/components/status-badge";
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

    let formattedStatus: StatusBadgeProps["status"] =
      txn.status === "confirmed"
        ? "Successful"
        : txn.status === "pending"
        ? "Pending"
        : "Refunded";

    return {
      requestId: txn.request_id,
      srcTxn: srcTxn?.txHash ?? null,
      srcChain: srcTxn?.chain ?? null,
      bridgeTxn: bridgeTxnHash ?? "",
      amount: txn.amount_raw,
      status: formattedStatus,
      txHash: txn.txHash,
      token: txn.token,
      srcBlockNo: srcTxn?.block_number,
      srcTimestamp: srcTxn?.timestamp,
      destBlockNo: txn.block_number,
      destTimestamp: txn.timestamp,
    } as Column;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      <TransactionTable transactions={transactions} />
    </div>
  );
}
