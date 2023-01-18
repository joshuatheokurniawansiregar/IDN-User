import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
export const SearchNewsByTitle = () => {
    const { keywordparam } = useParams();
    const [news, setNews] = useState([]);
    useEffect(() => {
        async function getNews() {
            await axios.get("http://127.0.0.1:8000/api/news/search_news_title/" + keywordparam, {
                title_keyword: keywordparam
            }).then(response => {
                setNews(response.data);
            });
        }
        getNews();
    }, []);
    return (
        <>
            <div className='container row'>
                {
                    news.map((data, index) => {
                        return (
                            <div key={index} className='col-sm-12' style={{ paddingTop: "7px" }}>
                                <h4><Link style={{ color: 'black', textDecoration: "none" }} to={{ pathname: `/${data.topic_slug}/${data.sub_topic_slug}/readnews/${data.news_slug}` }}>{data.news_title.substring(0, 50) + "..."}</Link></h4>
                                <p style={{ textAlign: "justify" }}>{data.news_content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}