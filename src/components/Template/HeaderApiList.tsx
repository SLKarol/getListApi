import React from "react";
import { observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";

import { useStore } from "stores";

const HeaderApiList: React.FC = () => {
  const {
    apiStore: { stateText },
  } = useStore();

  return (
    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
      {stateText}
    </Typography>
  );
};

export default observer(HeaderApiList);
