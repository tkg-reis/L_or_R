import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
    return(
        <>
            <Header/>
            <div className="mx-auto my-10 w-11/12 text-center">
                <h1 className="text-lg">About</h1>
                <p className="m-3 p-4">
                    こんにちは。皆さんは英語の勉強などで、Lの音とRの音が区別できないなどの経験はありますか？
                    <br />
                    何度聞いても同じに聞こえてしまう。。。そのような経験を踏まえて、「だったら飽きるぐらい双方を聞いて覚えてしまえばいいのではないか。」
                    <br />
                    そのような境地にたどり着き、こちらのアプリケーションを作成しました。
                    <br />
                    ご意見・ご感想は<Link className="underline hover:text-blue-500" href={"/opinion"}>Opinion</Link>または<a className="underline hover:text-blue-500" href="https://github.com/tkg-reis/L_or_R">こちら</a>のissueにお願いします。
                </p>
            </div>
            <Footer/>
        </>
    )
}