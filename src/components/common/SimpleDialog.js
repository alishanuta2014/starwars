import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, title, items } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {items && items.length ? (
          items.map((item) => (
            <ListItem>
              <ListItemText primary={item} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary={"There are no residents on this planet."} />
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}