import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import {FormControl, FormGroup, Input, InputLabel, Select, MenuItem} from "@material-ui/core";
import { useFormFields } from '../libs/hooksLibs';
import { useFetch } from '../libs/hooksLibs';
import { api } from  '../config.js';
import { useHistory } from 'react-router-dom';

export default function FormDialog({year, id, ButtonTitle, currentStatus}) {
  console.log(currentStatus);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState('');
  const [fields, handleFieldChange] = useFormFields({
      watched: null
  });

  const handleSwitchChange = (event) => {
      setStatus(event.target.value);
      fields.watched = event.target.value
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };

  async function handleConfirm() {
    await setIsLoading(true);
    const updateMovie = {
      operation: "update",
      payload: {
        TableName: "oscarMovies",
        Key: {
          id: id,
          year: year
        },
        UpdateExpression: "set watched=:w",
        ExpressionAttributeValues: {
          ":w" : fields.watched
        },
        ReturnValues: "UPDATED_NEW"
      }
    }
    try{
      await fetch(api.url, {
          method: 'post',
          body: JSON.stringify(updateMovie)
        }).then(function(response) {
          console.log(response)
          return response.json();
        });
    } catch(e) {
      alert(e.message);
      setIsLoading(false);
  }
  await setIsLoading(false);
  await setOpen(false);
  await window.location.reload();
  await history.push('/movies');

  };

  function handleWatched(currentStatus){
    if(currentStatus === 'WATCHED'){
        return true
    }
return false
}

let currentValue = handleWatched(currentStatus)

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {ButtonTitle}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">{ButtonTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change the status from NOT WATCHED to WATCHED after you see the movie.
          </DialogContentText>
          <FormControl>
                <InputLabel id="label">Status</InputLabel>
                <Select labelId="label" id="watched" value={status} onChange={handleFieldChange && handleSwitchChange}>
                    <MenuItem value={true}>Watched</MenuItem>
                    <MenuItem value={false}>Not Watched</MenuItem>
                </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}