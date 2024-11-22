import { Fragment } from "react";
import { Button,Dialog,DialogActions,DialogTitle } from "@mui/material";

function TodoDetails({details,isOpen,close,setTodos}){
    console.log(details,isOpen);
    return <Fragment>
        <Dialog onClose={()=>close(false)} open={isOpen}>
            <DialogTitle>{details?.todo}</DialogTitle>
            <DialogActions>
                <Button onClick={
                    ()=>{close(false);
                    ()=>setTodos(null);
                    }}>Close</Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}

export default TodoDetails;