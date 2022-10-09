import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.less";
import { PageClock } from "./header/PageClock";
import { PageName } from "./header/PageName";
import { bindSingleton } from "./inject/inject";
import { Content } from "./main/Content";
import {
  AppStore,
  AppStoreInterface,
  APP_STORE_IDENITIFER,
} from "./store/AppStore";

bindSingleton<AppStoreInterface>(APP_STORE_IDENITIFER, AppStore);

export class App extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <header className="border-bottom">
            <nav className="d-flex flex-row justify-content-between align-items-center px-3 py-3">
              <PageName />
              <nav className="navbar">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Фильмы
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/kanban">
                      Канбан
                    </Link>
                  </li>
                </ul>
              </nav>
              <PageClock />
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Content />}></Route>
              <Route path="/kanban" element={<div />} />
            </Routes>
          </main>
          <footer></footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
