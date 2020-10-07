import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import CheckGroup from "components/FilterApi/CheckGroup";
import ListCheckBox from "components/FilterApi/ListCheckBox";

const Sidebar: React.FC = () => {
  return (
    <Grid item xs={12} md={4}>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>
      <CheckGroup />
      <Paper elevation={0}>
        <Typography variant="h6" gutterBottom>
          Категории
        </Typography>
        <ListCheckBox setting="selectedCategory" />
      </Paper>
    </Grid>
  );
};

export default Sidebar;
