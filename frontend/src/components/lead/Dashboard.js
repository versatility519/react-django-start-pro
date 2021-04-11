import React, { Fragment } from "react";
import Form from "./Form";
import Leads from "./Leads";
import Flag from "./Flag";

import { Alert } from '@material-ui/lab';

export default function Dashboard() {
  return (
    <Fragment>
      {/* <Alert severity="error" className="mt-5">
        This is an error alert — <strong>check it out!</strong>
      </Alert> */}

      <Form />
      <Leads />
      {/* <Flag /> */}
    </Fragment>
  );
}
