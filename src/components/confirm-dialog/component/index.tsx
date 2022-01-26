import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import { useDialog } from 'components';

type Props = {
  title: string;
  text: string;
  id?: string;
};

export const ConfirmDialog = memo(({ title, text, id = 'none' }: Props) => {
  const { isOpen, closeDialog, confirmDialog } = useDialog(id);

  return (
    <Dialog fullWidth onClose={closeDialog} open={isOpen}>
      <DialogTitle sx={{ typography: 'h5' }}>{title}</DialogTitle>
      <DialogContent sx={{ fontFamily: 'default' }}>{text}</DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Отмена</Button>
        <Button onClick={confirmDialog}>Уверен</Button>
      </DialogActions>
    </Dialog>
  );
});
