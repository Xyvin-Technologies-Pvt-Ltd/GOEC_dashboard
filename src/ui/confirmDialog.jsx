import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ConfirmDialog = ({
  open = false,
  onClose,
  title = "Action",
  subtitle = "Action Takes",
  buttonText = "Confirm",
  confirmButtonHandle,
}) => (
  <AlertDialog
    open={open}
    onOpenChange={(next) => {
      if (!next) onClose?.();
    }}
  >
    <AlertDialogContent className="border-border bg-background text-foreground">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-foreground">{title}</AlertDialogTitle>
        <AlertDialogDescription className="text-muted-foreground">{subtitle}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-secondary text-foreground">cancel</AlertDialogCancel>
        <AlertDialogAction
          className="bg-gradient-to-r from-[#ed5dcd] to-[#5f5dd7] text-white"
          onClick={() => {
            confirmButtonHandle?.();
            onClose?.();
          }}
        >
          {buttonText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default ConfirmDialog;
