import React from "react";
import { observer } from "mobx-react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { useStore } from "stores";
import ListInGroup from "./ListInGroup";

const useStyles = makeStyles((theme) => ({
  mainCard: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  cardContent: {
    backgroundColor: theme.palette.grey[100],
  },
}));

const CardGroups = () => {
  const classes = useStyles();
  const {
    apiStore: { listFilteredCategory },
  } = useStore();
  return (
    <>
      {listFilteredCategory.map((group) => (
        <Card key={group} className={classes.mainCard}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5">
              <Box fontWeight="fontWeightBold" m={1}>
                {group}
              </Box>
            </Typography>
            <ListInGroup group={group} />
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default observer(CardGroups);
