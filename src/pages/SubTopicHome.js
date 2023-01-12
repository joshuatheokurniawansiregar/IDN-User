import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubTopicTopNav } from "../layout/SubTopicTopNav";
export function SubTopic(props) {
    const [news, setNews] = useState([]);
    const { sub_topic_slug } = useParams();
    // console.log(props.match.params.subtopic.sub_topic_slug);
    useEffect(() => {
        getNews();

    }, []);
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
                <button className="btn btn-danger mb-2" onClick={() => document.getElementsByName("order_by").forEach(i => i.checked = false)}>Reset</button>
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
                                            <h4 className='card-title'><a style={{ textDecoration: "none", color: "black" }} href={data.topic_slug + "/" + data.sub_topic_slug}>{data.news_title}</a></h4>
                                            <div className="card-text" style={{ textAlign: "justify" }}>{data.news_content.substring(0, 150)}</div>
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
            </div>
        </>
    )
}