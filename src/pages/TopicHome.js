import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function TopicHome() {
    const [news, setNews] = useState([])
    const { topic_slug_url } = useParams();
    const [topicSlug, setTopicSlug] = useState("");
    const [timeOutMounted, setTimeOutMounted] = useState(true);
    async function getNews() {
        await axios.get("http://127.0.0.1:8000/api/news/topics/" + topic_slug_url).then(response => {
            response.data.forEach(list => {
                // const { topic_slug } = list;
                setNews(list.news);
                // setTopicSlug(topic_slug);
            });
        });
    }
    function orderByDate(news) {
        const orderbydate = document.querySelectorAll(".order-by-date");
        let sorted = null;

        for (let i = 0; i < orderbydate.length; i++) {
            orderbydate[i].addEventListener("change", function (param) {
                if (param.target) {
                    if (param.target.value == "oldest") {
                        sorted = news.sort((a, b) => b.added_at - a.added_at);
                    }
                    if (param.target.value == "newest") {
                        sorted = news.sort((a, b) => a.added_at - b.added_at);
                    }
                    setNews(sorted);
                }
            })
        }
    }
    function resetButton(news) {
        document.getElementById("reset-button").addEventListener("click", function () {
            let sorted = news.sort((a, b) => b.id - a.id);
            setNews(sorted);
            document.getElementsByName("order_by").forEach(i => i.checked = false);
        });
    }
    useEffect(() => {
        getNews();
    }, []);
    useEffect(() => {
        orderByDate(news);
        resetButton(news);
    })

    return (
        <>
            <div className="container mt-3">
                <label htmlFor="oldest" className="display-block">
                    <input type="radio" value="oldest" name="order_by" className="order-by-date" /> Oldest</label>
                <label htmlFor="newest" className="display-block">
                    <input type="radio" value="newest" name="order_by" className="order-by-date" /> Newest
                </label>
                <button className="btn btn-danger mb-2" id="reset-button">Reset</button>
                <div className="row">
                    {
                        news.map(data => {
                            return (
                                <div key={data.id} className="col-sm-4">
                                    <div className="card mb-3">
                                        <img style={{
                                            maxWidth: "100%",
                                            height: "150px"
                                        }} src={data.news_picture_link} />
                                        <div style={{ overflowY: "hidden", padding: "5px" }}>
                                            <h4 className='card-title' style={{ fontSize: "1em" }}><a style={{ color: "black", textDecoration: "none" }} href={"/" + topic_slug_url + "/" + data.sub_topic_slug + "/readnews/" + data.news_slug}>{data.news_title}</a></h4>
                                            <div className="card-text" style={{ textAlign: "justify" }} >{data.news_content.substring(0, 150)}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="text-center">
                    <button className="btn btn-success mb-2"> Load More</button>
                </div>
            </div></>
    )
}