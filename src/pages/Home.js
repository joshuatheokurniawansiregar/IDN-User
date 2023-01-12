import React from 'react'
import { News } from '../services/json_dummy';
import { useEffect, useState } from 'react';
import { data } from 'jquery';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function Home() {
    const [topicData, setTopics] = useState([]);
    const [newsData, setNews] = useState([]);
    const [testNewsData, setTestNewsData] = useState([]);
    const location = useLocation();
    const path = location.pathname;
    const fetchNews = async () => {
        await axios.get("http://127.0.0.1:8000/api/news/topics").
            then(response => {
                setNews(response.data);
                response.data.map(list_news_data => {
                    const { news } = list_news_data;
                    setTestNewsData(news);
                    // console.log(news)
                });

            });
    }
    function loadMoreButtonClicked(e) {
        const loadMoreButton = document.querySelectorAll(".load-more");
        for (let i = 0; i < loadMoreButton.length; i++) {
            loadMoreButton[i].addEventListener("click", function (e) {
                // fetchNews();
                // newsData.map(news_data => {
                //     const { topic_slug, news } = news_data;
                //     console.log(topic_slug);
                // })
                // console.log("test")
            });
        }
    }
    useEffect(() => {
        fetchNews();
        const loadMoreButton = document.querySelectorAll(".load-more");
    }, []);
    return (
        <>
            <div className="container mt-3">
                <div className="d-flex flex-column justify-content-between">
                    <div className='row'>
                        {
                            newsData.map(data => {
                                const { topic_title, topic_slug, news } = data;
                                return (
                                    <>
                                        <h5>{topic_title}</h5>
                                        {
                                            news.map(data => {
                                                return (
                                                    <div className='col-sm-4'>
                                                        <img style={{
                                                            maxWidth: "100%",
                                                            height: "150px"
                                                        }} src={data.news_picture_link} />
                                                        <p><a style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} href={"/" + topic_slug + "/" + data.sub_topic_slug + "/readnews/" + data.news_slug}>{data.news_title}</a></p>
                                                        <div style={{ height: "100px", overflowY: "auto" }}>{data.news_content}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="text-center">
                                            <button className="btn btn-success mb-2 load-more" onClick={loadMoreButtonClicked}> Load More </button>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div >
        </>
    );
}