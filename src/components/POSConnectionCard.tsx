
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";

export const POSConnectionCard = () => {
  const [connected, setConnected] = useState(true);
  const [lastSync, setLastSync] = useState("3 min ago");
  const [modalOpen, setModalOpen] = useState(false);

  // Visual: force connection failed state for demo by toggling
  function handleReconnect() {
    setConnected(false);
    setLastSync("2 days ago");
    setModalOpen(true);
  }

  function handleRetry() {
    setConnected(true);
    setLastSync("Just now");
    setModalOpen(false);
  }

  return (
    <div className={`relative col-span-1 ${connected ? "bg-white/5" : "border-red-500 bg-red-900/30 border-2"} rounded-xl p-6 flex flex-col justify-between transition-colors shadow hover:scale-105 hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-white text-lg">POS Connection</div>
        {!connected && (
          <AlertTriangle className="text-red-400 animate-pulse" size={22} />
        )}
      </div>
      <div className="flex-1">
        <div className="text-white/80 text-base mb-2">
          {connected ? (
            <>
              <span className="font-semibold text-accent">POSRocket</span><span className="ml-2 px-2 py-1 inline-block rounded bg-green-600 text-xs">Connected</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-red-300">POSRocket</span><span className="ml-2 px-2 py-1 inline-block rounded bg-red-500 text-xs">Disconnected</span>
            </>
          )}
        </div>
        <div className="text-sm text-white/60">
          Last sync: <span className="font-mono">{lastSync}</span>
        </div>
      </div>
      <div className="mt-5">
        <Button
          variant={connected ? "secondary" : "destructive"}
          size="sm"
          onClick={handleReconnect}
          className="w-full"
        >
          Reconnect
        </Button>
      </div>

      {/* Modal shown only if disconnected */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>POS sync failed</DialogTitle>
            <DialogDescription>
              Last update: 2 days ago. Retry now?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleRetry}>Retry</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

