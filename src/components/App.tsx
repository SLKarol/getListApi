import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { createStore, RootStoreProvider } from "stores";

import Footer from "components/Template/Footer";
import Header from "components/Template/Header";
import Main from "components/Template/Main";
import Sidebar from "components/Template/Sidebar";
import MainFeatured from "components/Template/MainFeatured";
import ListApi from "components/ListApi/ListApi";

const rootStore = createStore();

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="API" />
        <main>
          <RootStoreProvider value={rootStore}>
            <MainFeatured />
            <Grid container spacing={5}>
              <Main>
                <ListApi />
              </Main>
              <Sidebar />
            </Grid>
          </RootStoreProvider>
        </main>
      </Container>
      <Footer description="Следите за обновлениями списка." />
    </>
  );
};

export default App;
