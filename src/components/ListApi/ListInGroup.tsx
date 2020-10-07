import React from "react";
import { observer } from "mobx-react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

import { useStore } from "stores";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Props {
  group: string;
}

const ListInGroup: React.FC<Props> = ({ group }: Props) => {
  const {
    apiStore: {
      listApi: { [group]: list },
    },
  } = useStore();
  const classes = useStyles();
  return (
    <>
      {list.map((a) => (
        <Card key={a.Link} className={classes.card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {a.API}
            </Typography>
            <Typography gutterBottom variant="body1">
              {a.Description}
            </Typography>
            <ul>
              <li>
                <strong>Авторизация: </strong> {a.Auth}
              </li>
              <li>
                <strong>CORS: </strong>
                {a.Cors}
              </li>
              <li>
                <strong>HTTPS: </strong> {a.HTTPS ? "Да" : "Нет"}
              </li>
            </ul>
            <Link href={a.Link}>{a.Link}</Link>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default observer(ListInGroup);
