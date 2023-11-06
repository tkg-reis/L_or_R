"use client";

export default function Opinion() {
    return(
        <>
            <div className="m-20">
                <h1 className="text-center py-5 text-xl">ご意見・ご感想</h1>
                <p>ご意見・ご感想は下記のボタンからお願いします！皆さんのご意見により、より良いアプリケーションが作り出せますので、ご協力お願い致します。</p>
                {/* 下記にgoogle form */}
                <div className="text-center py-5">
                    <a href="" className="text-lg rounded-md border-5 border-black border-dotted">
                        <button>ご意見・ご感想はこちらから！</button>
                    </a>
                </div>
            </div>
        </>
    )
} 