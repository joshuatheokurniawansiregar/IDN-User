import Footer from "../layout/Footer";
// import { TopNavLayoutLoggedIn } from "../layout/TopNavigationLoggedIn";
import { News } from "../services/json_dummy";
import { useEffect, userState, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export function ReadNewsPage() {
    const { news_slug_url } = useParams();
    const [news, setNews] = useState({});
    const [manyNewsBySubTopic, setManyNewsBySubTopic] = useState([]);
    const [imageNews, setImageNews] = useState(null);
    useEffect(() => {
        getNews();
        getManyNews();
    }, []);
    const SaveHistory = async () => {
        // const localStorage = JSON.stringify(window.localStorage("user"));
        // await axios.post("http://127.0.0.1:8000/api/history", {
        //     news_id: 
        // }).then(() => {

        //     })
    }
    const getNews = async () => {
        await axios.get("http://127.0.0.1:8000/api/news/open_news/" + news_slug_url).then(async (response) => {
            setNews(response.data.news);
            console.log(response.data.news)
            const { id } = response.data.news;
            const userdata = window.localStorage.getItem("user");
            const userobject = JSON.parse(userdata);
            // console.log(userobject["user"]);
            await axios.post("http://127.0.0.1:8000/api/history", {
                news_id: id,
                user_id: userobject["user"]
            }).then(response => {
                // console.log(response.data);
            }).catch(errResponse => {
                // console.log(errResponse.response.data);
            });
        });
    }
    const getManyNews = async () => {
        await axios.get("http://127.0.0.1:8000/api/news/relate_news/" + news_slug_url).then(response => {
            setManyNewsBySubTopic(response.data);
            // console.log(response.data);
        });
    }

    return (
        <>
            <div className="container-fluid mt-2">
                <div className="d-flex">
                    <div className="main-read-news">
                        <div className="container-fluid">
                            {/* {news.map((data, key) => { */}
                            {/* return ( */}
                            <div className="container card">
                                <div className="mt-2">
                                    <img style={{
                                        // backgroundImage: `url(${data.url_gambar})`,
                                        position: "relative",
                                        left: "20px",
                                        border: "1px solid black",
                                        width: "400px",
                                        height: "300px"
                                    }} src={news.news_picture_link} />
                                </div>
                                <div className="text-title mt-2" style={{ marginLeft: "18px" }}>
                                    <h4>{news.news_title}</h4>
                                    <div className="d-flex">
                                        <img className='rounded-circle' width={50} height={50} src={news.photo_profile_link} />
                                        <p style={{ marginTop: "10px" }}>{news.name}</p>
                                    </div>
                                    <p>Added at: {new Date(news.added_at).toLocaleDateString()}</p>
                                </div>
                                <div className='card-body'>
                                    <div className="card-text" style={{ textAlign: "justify" }}>
                                        {news.news_content}
                                    </div>
                                </div>
                            </div>
                            {/* ) */}
                            {/* })} */}
                        </div>
                    </div>
                    <div className="related-news-right-side border rounded bg-secondary" style={{ height: "fit-content", position: "sticky", top: "20%", right: "0", paddingTop: "2%" }}>
                        <h5 className="text-center">Related News</h5>
                        <hr style={{ "border": "2px solid black" }} />
                        {
                            manyNewsBySubTopic.map((data, key) => {
                                return (
                                    <div key={key} className="container p-3">
                                        <img style={{
                                            position: "relative",
                                            width: "200px",
                                            height: "200px",
                                        }} src={data.news_picture_link} />
                                        <a style={{
                                            display: "block",
                                            textDecoration: "none",
                                            color: "black", fontWeight: "bold",
                                            fontSize: "1.2em",
                                            textAlign: "justify"
                                        }} href={"/" + data.topic_slug + "/" + data.sub_topic_slug + "/readnews/" + data.news_slug}>{data.news_title}
                                        </a>
                                        {data.news_content.substring(0, 200)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >
        </>
    )
}