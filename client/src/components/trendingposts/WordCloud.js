import React from "react";
import ReactWordcloud from "react-wordcloud";
import { Resizable } from "re-resizable";

const resizeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f0f0f0"
};
 
const words = [
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
]

 
export default function WordCloud() {
  return (
    <div>
      <p>Resize the container!</p>
      <Resizable
        defaultSize={{
          width: 300,
          height: 300
        }}
        style={resizeStyle}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <ReactWordcloud words={words} />
        </div>
      </Resizable>
  </div>
  )
}