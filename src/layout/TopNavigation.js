import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useParams, useHref, useNavigate } from 'react-router-dom';
import axios from 'axios';
const TopNavLayout = () => {
    const [topics, setTopics] = useState([]);
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [active, setActive] = useState(null);
    const [newsKeyWord, setNewsKeyWord] = useState("");
    const { topic_slug_url } = useParams();
    const locationProps = useLocation();
    const navigation = useNavigate();
    useEffect(() => {
        getTopics();
        getNews();
    }, []);

    const getTopics = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/topics");
        setTopics(response.data.topics);
    }
    const getNews = async () => {
        const newsData = await axios.get("http://127.0.0.1:8000/api/news");
        setNews(newsData.data);
    }
    return (
        <>
            <nav className="top-navbar">
                <ul className="top-navigation-bar">
                    <li className="top-nav-logo"><Link to="/"><img src="http://localhost:3000/res/logo.png" /></Link></li>
                    <li className="top-nav-members-container">
                        <div className="top-nav-members">
                            <div className="top-nav-home"><NavLink to="/" >Home</NavLink></div>
                            {topics.map((data) => {
                                return (
                                    <NavLink className="top-nav-links" to={`${data.topic_slug}`} state={news}> {data.topic_title}</NavLink>
                                )
                            })}
                        </div>
                    </li>
                    <div className="top-nav-specific-keywords-area">
                        <div className="top-nav-search-area">
                            <input type="search" placeholder='Search news...' value={newsKeyWord} onChange={(e) => setNewsKeyWord(e.target.value)} />
                            <button onClick={(e) => {
                                e.preventDefault();
                                window.location.replace("newsbytitle/search/" + newsKeyWord);
                            }}>Search</button>
                        </div>
                        <label htmlFor="news_content_radio" className="auto-specific">
                            <input type="radio" id="news_content_radio" name="search_specific_news" /> Search By News Content
                        </label>
                        <button className="btn btn-danger w-50" onClick={() => {
                            const search_specific_news_radio = document.getElementsByName("search_specific_news");
                            search_specific_news_radio.forEach(test1 => test1.checked = false)
                        }}>Clear Search 'By'</button>
                    </div>
                    <Link to={"/signup"} className="btn-custom btn-slate">Sign Up</Link>
                </ul>
            </nav >
        </>
    )
}
export { TopNavLayout }