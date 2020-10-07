import React, { Component } from "react";
import { observer } from "mobx-react";
import CardGroups from "./CardGroups";

import { RootStoreContext } from "stores";

// Компонент тоже может быть в теме mobx
const ListApi = observer(
  class ListApi extends Component {
    state = {};
    static contextType = RootStoreContext;
    componentDidMount() {
      this.context.apiStore.loadApi();
    }

    render() {
      const { state } = this.context.apiStore;
      if (state !== "done") return null;
      return <CardGroups />;
    }
  }
);

export default ListApi;
