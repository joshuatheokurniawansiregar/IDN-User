import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubTopicTopNav } from "../layout/SubTopicTopNav";

export function TopicHome() {
    const [news, setNews] = useState([])
    const { topic_slug_url } = useParams();
    const [topicSlug, setTopicSlug] = ("");
    async function getNews() {
        await axios.get("http://127.0.0.1:8000/api/news/topics/" + topic_slug_url).then(response => {
            response.data.forEach(list => {
                setNews(list.news);
                const { topic_slug } = list;
                setTopicSlug(topic_slug);
            });
        });
    }
    useEffect(() => {
        getNews();
    }, []);
    return (
        <>
            <div className="container mt-3">
                <label htmlFor="oldest" className="display-block">
                    <input type="radio" id="oldest" name="order_by" /> Oldest</label>
                <label htmlFor="newest" className="display-block">
                    <input type="radio" id="newest" name="order_by" /> Newest
                </label>
                <button className="btn btn-danger mb-2" onClick={() => document.getElementsByName("order_by").forEach(i => i.checked = false)}>Reset</button>
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