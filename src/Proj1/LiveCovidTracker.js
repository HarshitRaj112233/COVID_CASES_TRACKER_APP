import React, { useState, useEffect, useCallback } from "react";
import "../Proj1/LiveCovidTracker.css";
import { Footer } from "./Footer";
import { Loading } from "./Loading";
const Project1 = () => {
  var allstate = [];
  const [desiredno, setdesiredno] = useState(0);
  const [cases, setcases] = useState([]);
  const [loading, setloading] = useState(true);
  const [statename, setstatename] = useState("");
  const [StateInput, setStateInput] = useState("");
  let number = 0;
  var noname = false;
  // const [allstate, setallstate] = useState([]);
  const getcasesnumber = useCallback(async () => {
    setloading(false);
    console.log("insidegetcases");
    const Api = await fetch("https://api.covid19india.org/data.json");
    const getdata = await Api.json();
    setcases(getdata.statewise);
    // console.log("CASES", cases);
  }, [])
  // ---------------
  cases.map((element) => {
    return allstate.push(element.state);
  });
  // ______________
  useEffect(() => {
    setTimeout(() => {
      // console.log("inside useefect", cases);
      getcasesnumber();
    }, 1800);
  }, [getcasesnumber]);

  // ----------------
  // --------------
  const takeStatename = (e) => {
    console.log("inside takestatename");
    console.log("allstate", allstate);

    for (let i = 0; i < allstate.length; i++) {
      if (StateInput.toLowerCase() === allstate[i].toLowerCase()) {
        console.log(number);
        setdesiredno(number);
        noname = false;
        break;
      }
      number++;
      console.log("noooo");
      noname = true;
    }
    e.preventDefault();
  };
  // console.log("DESried", desiredno);
  // console.log(noname);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="live">LIVE Covid Cases Tracker App</h2>
      <div>
        <form action="">
          <input
            className="input"
            type="text "
            placeholder="Search for Any State"
            value={statename}
            onChange={(e) => {
              setstatename(e.target.value);
              setStateInput(e.target.value);
            }}
          />
          <input
            type="submit"
            onClick={takeStatename}
            className="submit btn-success"
          />

          {/* </button> */}
        </form>
      </div>
      {!noname ? (
        cases.length && (
          <ul className="data">
            <div className="state">
              {desiredno === 0 ? (
                <>
                  {" "}
                  <li>COUNTRY</li>
                  <span>INDIA</span>
                </>
              ) : (
                <>
                  {" "}
                  <li>State</li>
                  <span>{cases[desiredno].state}</span>
                </>
              )}
            </div>
            <div className="active">
              <li>Active Cases:</li>
              <span>{cases[desiredno].active}</span>
            </div>
            <div className="confirmed">
              <li>Confirmed Cases:</li>
              <span>{cases[desiredno].confirmed}</span>
            </div>
            <div className="death">
              <li>Total Death:</li>
              <span>{cases[desiredno].deaths}</span>
            </div>
            <div className="recovered">
              <li>Total Recovery:</li>
              <span>{cases[desiredno].recovered}</span>
            </div>
            <div className="lastupdate">
              <li>Last Updated:</li>
              <span>{cases[desiredno].lastupdatedtime}</span>
            </div>
          </ul>
        )
      ) : (
        <h1>No State with this Spelling in the list</h1>
      )}
      <Footer />
    </div>
  );
};

export default Project1;
