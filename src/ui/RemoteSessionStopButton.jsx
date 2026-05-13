import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useRemoteStopTransaction } from "@/hooks/mutations/useOcppMutation";

/**
 * OCPP remote stop — kept out of generic table rendering.
 */
export default function RemoteSessionStopButton({ session, onSuccess }) {
  const { mutate: stopTransaction, isPending: isStopping } = useRemoteStopTransaction({
    onSuccess: () => {
      toast.success("Session terminated successfully");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to terminate session");
    },
  });

  const handleStopClick = () => {
    const transactionId = session["OCPP Txn ID"] ? session["OCPP Txn ID"] : null;
    stopTransaction({ cpid: session.CPID, data: { transactionId } });
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      className="text-xs uppercase tracking-wide"
      disabled={isStopping}
      onClick={handleStopClick}
    >
      Stop
    </Button>
  );
}
