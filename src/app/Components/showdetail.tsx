'use client'
import { Button, Stack } from "@mui/material";
import React from "react";

const ShowDetailsComponets=()=>{
    return( <Stack direction="row" spacing={2}>
        <Button color="secondary">Secondary</Button>
        <Button variant="contained" color="success">
          Success
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </Stack>);
}

export default ShowDetailsComponets;