import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SubTopicTopNav } from "../layout/SubTopicTopNav";
export function SubTopic(props) {
    const [news, setNews] = useState([]);
    const { sub_topic_slug } = useParams();
    // console.log(props.match.params.subtopic.sub_topic_slug);
    useEffect(() => {
        getNews();
    }, []);
    useEffect(() => {
        orderByDate(news);
        resetButton(news);
    });
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
    const getNews = async () => {
        await axios.get(`http://127.0.0.1:8000/api/news/topics/sub_topics/${sub_topic_slug}`).then(response => {
            setNews(response.data);
        });
    }
    return (
        <>
            <div className="container mt-3">
                <label htmlFor="oldest" className="display-block">
                    <input type="radio" id="oldest" name="order_by" /> Oldest</label>
                <label htmlFor="newest" className="display-block">
                    <input type="radio" id="newest" name="order_by" /> Newest
                </label>
                <button className="btn btn-danger mb-2" id="reset-button">Reset</button>
                <div className="row">
                    {
                        news.map((data, index) => {
                            return (
                                <div className="col-sm-4" key={index}>
                                    <div className="card mb-3">
                                        <img style={{
                                            maxWidth: "100%",
                                            height: "150px"
                                        }} src={data.news_picture_link} />
                                        <div style={{ overflowY: "hidden", padding: "5px" }}>
                                            <h4 className='card-title'><Link style={{ textDecoration: "none", color: "black" }} to={{ pathname: `readnews/${data.news_slug}` }}>{data.news_title}</Link></h4>
                                            <div className="card-text" style={{ textAlign: "justify" }}>{data.news_content.substring(0, 150)}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="text-center">
                    {/* <button className="btn btn-success mb-2"> Load More</button> */}
                </div>
            </div>
        </>
    )
}