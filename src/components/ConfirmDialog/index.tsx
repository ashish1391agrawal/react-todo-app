import * as React from 'react';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    IconButton, 
    styled, 
    Typography 
} from '@material-ui/core';
import { ConfirmDialogInterface } from './types';
import { CloseRounded } from '@material-ui/icons';
import useStyles from './styles'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function ConfirmationDialog(props: ConfirmDialogInterface) {
    const {
        onAction,
        open = false,
        message = "Are you sure want to delete list",
        description
    } = props;

    const classes = useStyles();

    return (
        <BootstrapDialog
            onClose={() => onAction(false)}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle>Alert</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => onAction(false)}
                className={classes.closeIconButton}
            >
                <CloseRounded />
            </IconButton>
            <DialogContent dividers>
                <Typography variant='h4' align='center'>
                    {message}
                </Typography>
                {description && (
                    <Typography variant='subtitle2' align='center'>
                        {description}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={() => onAction(true)}
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

export default ConfirmationDialog;
