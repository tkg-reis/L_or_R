"use client";

import Collect from "../../audio/collect.mp3"
import Correct from "../../audio/correct.mp3"

import Alive from "../../audio/alive.mp3"
import Arrive from "../../audio/arrive.mp3"

import Light from "../../audio/light.mp3"
import Right from "../../audio/right.mp3"

import Grass from "../../audio/grass.mp3"
import Glass from "../../audio/glass.mp3"

import Fry from "../../audio/fry.mp3"
import Fly from "../../audio/fly.mp3"
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {

  // 音源の数
  // 1がcollect/correct 
  // 2がalive/arrive 
  // 3がlight/right
  // 4がgrass/glass
  // 5がfry/fly
  const numberArray: number[] = [1, 2, 3, 4, 5];
  // => useStateで代替できるかも。
  const stringArray : (string | undefined)[] = ["collect", "alive", "light", "glass", "fly"];
  const [targetString, setTargetString] = useState<string[]>(["collect", "alive", "light", "glass", "fly"]);
  const [outputStringL, setOutputStringL] = useState();
  const [outputStringR, setOutputStringR] = useState();
  const [resultString, setResultString] = useState<string | null>("");
  const [isStart, isSetStart] = useState<boolean>(false);
  const [isAnswer, isSetAnswer] = useState<boolean>(false);
  let openTime = 2000;
  let timeout = 5000;
  // こちらもuseStateで代替可能かも。

  // 音源をランダムに出力するために、不作為数値の設定。
  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // *2 リファクタリング候補
  function getOutputMusicNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 音を出す
  const PlayAudio = () => {
    // stringArrayの値をランダムに選ぶためのランダム関数
    const randomNumber = getRandomNumber(1, 5);
    // 出力する音声をランダムに決めるためのランダム関数。上記を併用すると、一定の音声しか出力されないため追加
    const outputMusicNumber = getOutputMusicNumber(1,5);
    isSetStart(true);
    
    const selectedWord = (wordL?: (string | undefined), wordR?: string ) => {
      let selecteingWordL = wordL;
      let selecteingWordR = wordR;
      const Index = stringArray.indexOf(wordL);
      if (Index !== -1) setTargetString(stringArray[Index]);
      setOutputStringL(selecteingWordL);
      setOutputStringR(selecteingWordR);
    };
    // sound test
    // let audio = new Audio(randomNumber % 2 === 0 ? Collect : Correct);
    // return audio.play();

    if(randomNumber === numberArray[0]){
        // ＊1リファクタリング候補
        let audio = new Audio(outputMusicNumber % 2 === 0 ? Collect : Correct);
        // 
        if(outputMusicNumber % 2 === 0 ) {
          setResultString("collect");
        } else {
          setResultString("correct");
        }
        
        audio.play();
        let endAudio = audio.ended;
          // *3 リファクタリング候補
          if(!endAudio) return selectedWord("collect", "correct");
    }

    if(randomNumber === numberArray[1]) {
      let audio = new Audio(outputMusicNumber % 2 === 0 ? Alive : Arrive);
      
      if(outputMusicNumber % 2 === 0 ) {
        setResultString("alive");
      } else {
        setResultString("arrive");
      }

      audio.play();
      let endAudio = audio.ended;
        if(!endAudio) return selectedWord("alive", "arrive");
    }

    if(randomNumber === numberArray[2]) {
      let audio = new Audio(outputMusicNumber % 2 === 0 ? Light : Right);
      
      if(outputMusicNumber % 2 === 0 ) {
          setResultString("light");
        } else {
          setResultString("right");
        }
      audio.play();
      let endAudio = audio.ended;
        if(!endAudio) return selectedWord("light", "right" );
    }

    if(randomNumber === numberArray[3]) {
      let audio = new Audio(randomNumber % 2 === 0 ? Glass : Grass);
      
      if(outputMusicNumber % 2 === 0 ) {
        setResultString("glass");
      } else {
        setResultString("grass");
      }

      audio.play();
      let endAudio = audio.ended;
        if(!endAudio) return selectedWord("glass", "grass");
    }

    if(randomNumber === numberArray[4]) {
      let audio = new Audio(randomNumber % 2 === 0 ? Fly : Fry);
      
      if(outputMusicNumber % 2 === 0 ) {
          setResultString("fly");
        } else {
          setResultString("fry");
        }

      audio.play();
      let endAudio = audio.ended;
        if(!endAudio) return selectedWord("fly", "fry");
    }
  }
  // playAudioの副作用で対象のoutputStringを出力する。
  useEffect(() => {
    let timeOutId = setTimeout(() => {
      isSetStart(true);
    }, timeout);
    
    return () => {
      clearTimeout(timeOutId);
    }
  }, [targetString]);

  useEffect(() => {
    let openAnswer = setTimeout(() => {
        isSetAnswer(!true);
    }, openTime);

    return () => {
      isSetAnswer(true)
    }
  }, [targetString])


  return (
    <>
      <header>
        <ul className="flex items-center justify-center gap-5">
          <li className="p-3">
            <Link href={"/"}>
              Home
            </Link>
          </li>
          <li className="p-3">
            <Link href={"/about"}>
              About
            </Link>
          </li>
          <li className="p-3">
            <Link href={"/opinion"}>
              Opinion
            </Link>
          </li>
        </ul>
      </header>
      <main>
        <div className="mx-auto my-10 w-11/12">
          <h1 className="text-center text-2xl">LかRか</h1>
          <h2 className="text-center text-lg mt-4">こちらの音は「L」それとも「R」？？？</h2>
          <div className="text-center ">
            <button className="my-6 bg-slate-500 rounded-lg p-4" onClick={PlayAudio}>Push Here To Listen!!!</button>
          </div>
          <div className="text-center ">
            <p className="p-1">{!isStart ? "Get Started!!!" : "Listen to Music"}</p>
            <span className=" inline-block rounded-lg p-5 ">{!isStart ?  "" : `${outputStringL === undefined ? "" : outputStringL}  ${outputStringR=== undefined ? "" : outputStringR}` }</span>
          </div>
          {/* pixaybayAPIで画像の追加処理 */}
          <div className="text-center flex justify-center items-center flex-col">
            <div className="max-h-14 max-w-md">
              <img src="" alt="LかRかの画像です" />
            </div>
            <p></p>
            <span>{isAnswer ? "" : resultString }</span>
          </div>
        </div>
      </main>
      <footer>
        <div className="text-center">
          <p>&copy;tkg-reis.app</p>
        </div>
      </footer>
    </>
  )
}
