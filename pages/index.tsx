import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState<string[]>(["", "", "", "", ""]);
  const [lineIndex, setLineIndex] = useState<number>(0);
  const typingText: string[] = ["Hi,", "I'm", "S", "o Jiwoo", "Front-End Developer"];

  const getGitHubHistory = () => {};

  useEffect(() => {
    let arrIndex = 0;
    let textIndex = 0;
    let nowText = text;
    let textQueue = typingText;

    const interval = setInterval(() => {
      if (arrIndex < text.length && textIndex < textQueue[arrIndex].length) {
        nowText[arrIndex] = nowText[arrIndex] + textQueue[arrIndex][textIndex];
        textIndex++;
      } else if (arrIndex < text.length) {
        textIndex = 0;
        arrIndex++;
        setLineIndex(arrIndex);
      } else {
        clearInterval(interval);
      }

      setText([...nowText]);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Layout center={true}>
        <div className="home_inner-wrapper">
          <div className="home_title-wrapper">
            <h1 className={`home_title ${lineIndex === 0 ? "typing" : ""}`}>{text[0]}</h1>
            <h1 className={`home_title ${lineIndex > 0 && lineIndex < 4 ? "typing" : ""}`}>
              {text[1]} <span className="home_emphasize_title">{text[2]}</span>
              {text[3]}
            </h1>
            <h1 className={`home_title ${lineIndex >= 4 ? "typing" : ""}`}>{text[4]}</h1>
          </div>
        </div>
      </Layout>
    </>
  );
}
