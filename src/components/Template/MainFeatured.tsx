import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import HeaderApiList from "./HeaderApiList";
import AdditionalHeaderInfo from "./AdditionalHeaderInfo";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.common.black,
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const MainFeatured: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.mainFeaturedPost}>
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <HeaderApiList />
            <AdditionalHeaderInfo />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default observer(MainFeatured);
