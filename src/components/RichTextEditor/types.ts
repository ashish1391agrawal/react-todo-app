export interface RichTextEditorInterface {
  open: boolean;
  onAction: (status: boolean | Array<string>) => void;
};
