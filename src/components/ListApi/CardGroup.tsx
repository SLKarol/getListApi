import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

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

interface Props {
  group: string;
}

const CardGroup = ({ group }: Props) => {
  const classes = useStyles();
  return (
    <Card className={classes.mainCard}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">
          <Box fontWeight="fontWeightBold" m={1}>
            {group}
          </Box>
        </Typography>
        <ListInGroup group={group} />
      </CardContent>
    </Card>
  );
};

export default CardGroup;
