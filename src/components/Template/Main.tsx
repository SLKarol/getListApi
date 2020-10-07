import React from "react";
import Grid from "@material-ui/core/Grid";

const Main: React.FC = ({ children }) => {
  return (
    <Grid item xs={12} md={8}>
      {children}
    </Grid>
  );
};

export default Main;
