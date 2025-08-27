export interface ConfirmDialogInterface {
  open: boolean;
  onAction: (status: boolean) => void;
  message?: string;
  description?: string;
};
