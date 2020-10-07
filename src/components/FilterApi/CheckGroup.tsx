import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import ListCheckBox from "./ListCheckBox";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

const CheckGroup: React.FC = () => {
  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Авторизация</FormLabel>
      <FormGroup>
        <ListCheckBox setting="settingAuth" />
      </FormGroup>
      <Divider className={classes.divider} />
      <FormLabel component="legend">CORS</FormLabel>
      <FormGroup>
        <ListCheckBox setting="settingCors" />
      </FormGroup>
    </FormControl>
  );
};

export default CheckGroup;
