"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Opinion() {
    return(
        <>
            <Header/>
            <div className="m-20">
                <h1 className="text-center py-5 text-xl">ご意見・ご感想</h1>
                <p className="text-center">ご意見・ご感想は下記のボタンからお願いします！皆さんのご意見により、より良いアプリケーションが作り出せますので、ご協力お願い致します。</p>
                {/* 下記にgoogle form */}
                <div className="text-center py-5">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdz6slEfMqmVm62dG3kdjelVHotNqlWa_S6wetiVK0O1aPICg/viewform?usp=sf_link" className="text-lg rounded-md border-5 border-black border-dotted hover:text-blue-500">
                        <button>ご意見・ご感想はこちらから！</button>
                    </a>
                </div>
            </div>
            <Footer/>
        </>
    )
} 