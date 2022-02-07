import ImageCollection from "./ImageCollection";
import ImageView from "./ImageView";
import Home from "./Home";
import AlbumCollection from "./AlbumCollection";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/albums">
            <AlbumCollection />
          </Route>
          <Route exact path="/albums/:albumId">
            <ImageCollection />
          </Route>
          <Route exact path="/albums/:albumId/:imageId">
            <ImageView />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
