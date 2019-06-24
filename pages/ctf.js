import React from "react";

import Link from "next/link";
import { withRouter } from "next/router";

import { CircularProgress } from "@rmwc/circular-progress";
import { TextField } from "@rmwc/textfield";
import { Select } from "@rmwc/select";

import AuthedPage from "../components/AuthedPage";
import Challenge from "../components/Challenge";

import "@rmwc/circular-progress/circular-progress.css";

import "@material/textfield/dist/mdc.textfield.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";

import "@material/select/dist/mdc.select.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";
import "@material/list/dist/mdc.list.css";
import "@material/menu/dist/mdc.menu.css";
import "@material/menu-surface/dist/mdc.menu-surface.css";

import css from "./styles/ctf.scss";
import firebase from "firebase";

function CTF(props) {
  const [db] = React.useState(firebase.firestore());
  const [dataFetched, setDataFetched] = React.useState([]);
  const [chals, setChals] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [searchVal, setSearchVal] = React.useState("");
  const [categoryVal, setCategoryVal] = React.useState("");
  const [searchChal, setSearchChal] = React.useState([]);

  // grab data
  React.useEffect(() => {
    db.collection("ctfs")
      .doc(props.router.query.id)
      .onSnapshot(snapshot => {
        setDataFetched(snapshot.get("dataFetched"));
      });

    db.collection("ctfs")
      .doc(props.router.query.id)
      .collection("chals")
      .onSnapshot(snapshot => {
        let res = [];
        let categoriesTemp = [""];
        snapshot.forEach(doc => {
          res.push(doc.data());
          if (categoriesTemp.indexOf(doc.data().category) == -1) {
            categoriesTemp.push(doc.data().category);
          }
        });
        setCategories(categoriesTemp);
        setSearchChal(res);
        setChals(res);
      });
  }, [props.router.query.id]);

  // update based on user search
  React.useEffect(() => {
    if (dataFetched) {
      // temp vars
      let searchChalTemp = [];
      let searchValTemp = searchVal.replace(/\s+/g, "").toLowerCase();
      searchChalTemp = chals.filter((chal, i) => {
        let nameTemp = chal.name.replace(/\s+/g, "").toLowerCase();

        if (
          (searchVal == "" || nameTemp.indexOf(searchValTemp) > -1) &&
          (categoryVal == "" || categoryVal == chal.category)
        ) {
          return true;
        }
        return false;
      });
      console.log(searchChalTemp);
      setSearchChal(searchChalTemp);
    }
  }, [searchVal, categoryVal, dataFetched, chals, categories]);

  return (
    <>
      <AuthedPage>
        <div className={css.searchWrap}>
          <TextField
            label="Search"
            outlined
            value={searchVal}
            onChange={e => {
              setSearchVal(e.target.value);
            }}
          />
          <Select
            label="Category"
            outlined
            options={categories}
            value={categoryVal}
            onChange={e => {
              setCategoryVal(e.target.value);
            }}
          />
        </div>
        {dataFetched ? (
          <div className={css.chals}>
            {searchChal.map((chal, i) => (
              <Challenge chal={chal} key={i} />
            ))}
          </div>
        ) : (
          <CircularProgress />
        )}
      </AuthedPage>
    </>
  );
}

export default withRouter(CTF);
