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
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import env from "dotenv";
env.config();


export default function Home() {
  
  // 音源の数
  // 1がcollect/correct 
  // 2がalive/arrive 
  // 3がlight/right
  // 4がgrass/glass
  // 5がfry/fly
  // =>mongoDBでデータベース化して、ハードコードを無くして、データベース管理にする。
  
  const numberArray: number[] = [1, 2, 3, 4, 5];
  // => useStateで代替できるかも。
  const stringArray : any[] = ["collect", "alive", "light", "glass", "fly"];
  const [targetString, setTargetString] = useState<string[]>(["collect", "alive", "light", "glass", "fly"]);
  const [outputStringL, setOutputStringL] = useState<undefined | string>();
  const [outputStringR, setOutputStringR] = useState<undefined | string>();
  const [error,setError] = useState<undefined | string>();
  const [resultString, setResultString] = useState<string | null>("");
  // 出題数のカウントの状態管理
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [isStart, isSetStart] = useState<boolean>(false);
  const [isAnswer, isSetAnswer] = useState<boolean>(false);
  const [imgData, setImgData] = useState<string>();
  // 解答時間と解答表示時間
  let openTime = 5000;
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
  // const outputPhotoNumber = getRandomNumber(0, 19); 
  // 音を出す
  const PlayAudio = () => {
    
    // stringArrayの値をランダムに選ぶためのランダム関数
    const randomNumber = getRandomNumber(1, 5);
    // 出力する音声をランダムに決めるためのランダム関数。上記を併用すると、一定の音声しか出力されないため追加
    const outputMusicNumber = getOutputMusicNumber(1,5);
    isSetStart(true);
    setCurrentCount(prev   => prev + 1);
    
    const selectedWord = (wordL?: (string | undefined), wordR?: string ) => {
      let selecteingWordL = wordL;
      let selecteingWordR = wordR;
      
      const Index = stringArray.indexOf(wordL);
      // !!!!!1any型の変更
      if (Index !== -1) setTargetString(stringArray[Index]);
      setOutputStringL(selecteingWordL);
      setOutputStringR(selecteingWordR);
    };
    // sound test
    // let audio = new Audio(randomNumber % 2 === 0 ? Collect : Correct);
    // return audio.play();

    // バグ修正：渡ってくるdataが更新されないため、改修の必要あり。
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
    setTimeout(() => {
        isSetAnswer(!true);
    }, openTime);

    return () => {
      isSetAnswer(true)
    }
  }, [targetString])

  // 写真データを取ってくる。
  useEffect(() => {
    
    const getJson = async() : Promise<any> => {

      try {
        const url = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${resultString}`;
        const res = await axios.get(url);
        
        setImgData(res.data.hits[getRandomNumber(1,20)].largeImageURL);
        
      } catch (error) {
        setError("error: push again!!")
      }
    }
    getJson();
  }, [targetString]);
  return (
    <>
      <Header/>
      <main>
        <div className="mx-auto my-7 w-11/12">
          <h1 className="text-center text-2xl">LかRか</h1>
          <h2 className="text-center text-lg mt-4">こちらの音は「L」それとも「R」？？？</h2>
          <div className="text-center ">
            <button className="my-6 bg-lime-600	 rounded-lg p-4 hover:text-black" onClick={PlayAudio}>Push Here To Listen!!!</button>
          </div>
          <div className="text-center ">
            <p className="p-1 text-lg">{!isStart ? "Get Started!!!" : "This sound is..."}</p>
            <span className=" inline-block rounded-lg p-5 text-2xl">{!isStart ?  "" : `${outputStringL === undefined ? "Lか" : outputStringL + "?"}  ${outputStringR=== undefined ? "Rか" : outputStringR + "?"}` }</span>
          </div>
          <div className="text-center flex justify-center items-center flex-col p-4">
            <p>{isAnswer ? "" : "Answer is ..."}</p>
            <span className="underline text-sky-300	 text-3xl">{isAnswer ? "" : resultString }</span>
          </div>
            <div className=" flex justify-center items-center">
              {isAnswer ? "" : (
                <div className="max-h-12 max-w-xs p-4">
                <img src={imgData ? imgData : error}  className=""/>
              </div>
              )}
            </div>
          <div className="text-center">
            <span>
              出題数：
            </span>
            {currentCount}
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}
