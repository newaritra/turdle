import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAlert } from "../context/Alert";
import { wordsList, solutionList } from "../words";

const winInsults = [
  "Wow!That did not take you long at all numbskull",
  "Are you not yourself these days? Stay this way",
  "Look at you go! I'd rather not tbh",
  "Congrats on finishing I guess.",
  "What do you want? A trophy?",
];

const loseInsults = [
  "Should I be surprised?",
  "Seems like you live upto your name",
  "I would be disappointed but I don't care",
  "Welcome to the Hall of Lame",
  "Jeez that must have been embarassing",
];

const wrongInsults = [
  "Buy a dictionary on the way out",
  "Personally I wouldn't stay around after that",
  "Yep let's just not talk about what happened",
  "Please say you didn't actually think that was a word",
  "I'm not even surprised anymore tbh",
];

const getInsult = (status) => {
  var insult;
  switch (status) {
    case "win":
      insult = winInsults[Math.floor(Math.random() * winInsults.length)];
      break;
    case "lose":
      insult = loseInsults[Math.floor(Math.random() * loseInsults.length)];
      break;
    case "wrong":
      insult = wrongInsults[Math.floor(Math.random() * wrongInsults.length)];
      break;
    default:
      break;
  }
  console.log();
  return insult;
};

const WordBox = styled.div`
  width: 5rem;
  height: 5rem;
  border: 0.2rem solid darkgray;
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: normal;
  font-family: sans-serif;
`;
const WordLine = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const WordContainer = styled.div`
  width: 34rem;
  text-align: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 50%;
  margin-top: 8rem;
  transform: translateX(-50%);
  position: relative;
`;

const Wordle = () => {
  const [words, setWords] = useState(new Array(6).fill(null));
  const [checked, setChecked] = useState([]);
  const [message, setMessage] = useState("");
  const [over, setOver] = useState(false);
  const { alert, setAlert, AlertContainer } = useAlert();
  const checkStatus = (lineIndex, boxIndex) => {
    if (
      (!words[lineIndex] || words[lineIndex].trim().length <= 5) &&
      checked.length >= 0 &&
      !checked?.includes(words[lineIndex])
    )
      return "";
    // if (checked.length) {
    if (
      words[lineIndex].split("")[boxIndex].toLowerCase() ===
      solution.split("")[boxIndex]
    ) {
      console.log("green");
      return "greenBox";
    } else if (
      solution
        .split("")
        .some(
          (item) => item === words[lineIndex].split("")[boxIndex].toLowerCase()
        )
    )
      return "yellowBox";
    else return "greyBox";
    // }
    // return "";
  };
  const [solution] = useState(
    solutionList[Math.floor(solutionList.length * Math.random())]
  );
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // some code..
      let a = document.createElement("input");
      document.getElementById("root").appendChild(a);
      a.style = "display:hidden;";
      a.focus();
    }
    //   console.log(wordsList.length * Math.rand)
  });
  const keyDown = (event) => {
    const regex = /[a-z]{1}|[A-Z]{1}/g;
    console.log(solution);
    if (regex.test(event.key) && event.key.length === 1) {
      setWords((arr) => {
        let tempArr = [...arr];
        const firstNull = arr.findIndex(
          (item, index) => !item || item?.trim().length !== 5
        );
        const firstFilled = arr.findIndex(
          (item, index) => item?.trim().length === 5 && !checked.includes(item)
        );
        console.log(firstFilled);
        if (firstNull >= 0) {
          if (!tempArr[firstFilled]) {
            tempArr[firstNull] =
              tempArr[firstNull] && 5 - tempArr[firstNull].trim().length
                ? 5 - tempArr[firstNull].trim().length >= 0 &&
                  tempArr[firstNull].trim() +
                    event.key.toLowerCase() +
                    " ".repeat(4 - tempArr[firstNull].trim().length)
                : event.key + " ".repeat(4);
          }
        }
        return tempArr;
      });
    }
    if (event.key.toLowerCase() === "enter") {
      console.log("hdb", checked);
      let firstNull = words.findIndex(
        (item, index) => !checked.includes(item) && item?.trim().length === 5
      );
      // firstNull >= 0 && words[firstNull] === solution && console.log("hurray");

      if (firstNull >= 0 && wordsList.includes(words[firstNull]))
        setChecked((checked) =>
          firstNull >= 0 && !checked.includes(words[firstNull])
            ? checked.push(words[firstNull])
            : checked
        );
      if (!wordsList.includes(words[firstNull])) {
        setMessage("Not a word: " + getInsult("wrong"));
        setAlert(true);
        setTimeout(() => setAlert(false), 2500);
      }
    }
    if (event.key.toLowerCase() === "backspace") {
      console.log(words);
      const firstIncomplete = words.findIndex(
        (item, index) =>
          item?.trim().length <= 5 &&
          item?.trim().length > 0 &&
          !checked.includes(item)
      );
      firstIncomplete >= 0 &&
        setWords((words) => {
          let tempArr = [...words];
          tempArr[firstIncomplete] =
            tempArr[firstIncomplete]
              .trim()
              .substr(0, tempArr[firstIncomplete].trim().length - 1) +
            " ".repeat(6 - tempArr[firstIncomplete].trim().length);
          console.log(tempArr);
          return tempArr;
        });
    }
  };
  useEffect(() => {
    console.log(words, checked);
    !over && window.addEventListener("keydown", keyDown, true);
    return () => window.removeEventListener("keydown", keyDown, true);
  }, [words, over]);

  useEffect(() => {
    console.log(
      "blah",
      checked,
      checked.find((item) => item.toLowerCase() === solution)
    );
    if (
      checked.length &&
      checked[checked.length - 1]?.toLowerCase() === solution
    ) {
      setOver(true);
      setMessage("You won. " + getInsult("win"));
      setAlert(true);
      console.log("hurray");
      //The code below removes all types of event listeners from the selected element.
      //Don't use this in production and have better organised event listener functions
      //   var el = document.getElementById("root");
      //   let elClone = el.cloneNode(true);
      //   el.replaceWith(elClone);
    }
    if (
      checked.length &&
      checked.length >= 6 &&
      !checked.find((item) => item.toLowerCase === solution)
    ) {
      setAlert(true);
      setOver(true);
      setMessage("Lost. " + getInsult("lose"));
    }
    console.log(words);
  }, [checked.length]);
  return (
    <WordContainer>
      {words.map((item, index) => (
        <WordLine key={index}>
          {item == null
            ? new Array(5)
                .fill(null)
                .map((elem, indexes) => <WordBox key={indexes} />)
            : item.split("").map((box, boxIndex) => (
                <WordBox
                  key={boxIndex}
                  className={checkStatus(index, boxIndex)}
                >
                  {box}
                </WordBox>
              ))}
        </WordLine>
      ))}
      {alert && <AlertContainer>{message}</AlertContainer>}
    </WordContainer>
  );
};

export default Wordle;
