import React from "react";
import { observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useStore } from "stores";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

const AdditionalHeaderInfo = () => {
  const classes = useStyles();
  const {
    apiStore: { countAll, state, countFiltered },
  } = useStore();
  const additionalInfo = state === "done" ? countAll : 0;
  const showFiltered = state === "done" && countFiltered !== countAll;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h5" color="inherit" paragraph>
            Загружено: {additionalInfo}
          </Typography>
        </Grid>
        {showFiltered && (
          <Grid item xs={6}>
            <Typography variant="h5" color="inherit" paragraph>
              Отфильтровано: {countFiltered}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default observer(AdditionalHeaderInfo);
