import * as React from 'react';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    IconButton, 
    styled
} from '@material-ui/core';
import { RichTextEditorInterface } from './types';
import { CloseRounded } from '@material-ui/icons';
import useStyles from './styles'
// import ReactQuill from 'react-quill';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function RichTextEditor(props: RichTextEditorInterface) {
    const {
        onAction,
        open = false
    } = props;

    const classes = useStyles();
    const [value, setValue] = React.useState<Array<string>>([]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        const data = value.split('\n');
        setValue(data);
    }

    return (
        <BootstrapDialog
            onClose={() => onAction(false)}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle>Add multiple cards</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => onAction(false)}
                className={classes.closeIconButton}
            >
                <CloseRounded />
            </IconButton>
            <DialogContent dividers>
                <textarea 
                    rows={9} 
                    cols={48}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={() => onAction(value)}
                >
                    Ok
                </Button>
                <Button
                    variant='contained'
                    onClick={() => onAction(false)}
                >
                    Cancel
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}

export default RichTextEditor;
