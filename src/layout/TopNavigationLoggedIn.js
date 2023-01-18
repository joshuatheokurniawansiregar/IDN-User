import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';

const TopNavLayoutLoggedIn = () => {
    const [topics, setTopics] = useState([]);
    const { topic_slug } = useParams();
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [newsTitleSearch, setNewsTitleSearch] = useState("");
    const [isSearchByNewsContentClicked, setIsSearchByNewsContentClicked] = useState(false);
    useEffect(() => {
        getTopics();
        getUserProfile();
    }, []);
    const getTopics = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/topics");
        setTopics(response.data.topics);
    }
    const getUserProfile = async () => {
        const userdata = localStorage.getItem("user");
        const userobject = JSON.parse(userdata);
        const response = await axios.get("http://127.0.0.1:8000/api/userprofile/" + userobject["user"]);
        setUser(response.data.author);
    }

    // const searchButtonClicked = () => {
    //     document.getElementById("")
    // }
    const activeLink = ({ isActive }) => {

    }

    const activeTopics = () => {
        return (topic_slug ? "active-topics" : "")

    }
    return (
        <nav className="top-navbar">
            <ul className="top-navigation-bar">
                <li className="top-nav-logo"><Link to="/"><img src="http://localhost:3006/res/logo.png" /></Link></li>
                <li className="top-nav-members-container">
                    <div className="top-nav-members">
                        <div className="top-nav-home"><NavLink to="/" >Home</NavLink></div>
                        {topics.map((data) => {
                            return (
                                <a className="top-nav-links" href={`${data.topic_slug}`}> {data.topic_title}</a>
                            )
                        })}
                    </div>
                </li>
                <div className="top-nav-specific-keywords-area">
                    <div className="top-nav-search-area">
                        <input type="search" value={newsTitleSearch} onChange={(e) => { setNewsTitleSearch(e.target.value) }} placeholder='Search news...' />
                        <button onClick={(e) => {
                            e.preventDefault();
                            // if (isSearchByNewsContentClicked === true) {
                            //     alert("true");
                            // } else {
                            //     alert("false");
                            // }
                            window.location.replace("newsbytitle/search/" + newsTitleSearch);
                        }}>Search</button>
                    </div>
                    <label htmlFor="news_content_radio" className="auto-specific">
                        <input type="radio" id="news_content_radio" name="search_specific_news" onChange={(e) => {
                            e.preventDefault();
                            // setIsSearchByNewsContentClicked(true);
                        }} /> Search By News Content
                    </label>
                    <button className="btn-custom btn-red" onClick={() => {
                        const search_specific_news_radio = document.getElementsByName("search_specific_news");
                        search_specific_news_radio.forEach(test1 => {
                            test1.checked = false
                            // setIsSearchByNewsContentClicked(false);
                        })
                    }}>Clear Search 'By'</button>
                </div>
                <ul>
                    <li>
                        <button className="btn btn-secondary">Subscribe</button>
                    </li>
                </ul>
                <ul>
                    <li>
                        {
                            user.map((data, key) => {
                                if (data.photo_profile_link != null) {
                                    return (
                                        <div className='d-flex align-items-center' style={{ cursor: "pointer" }} onClick={() => navigate("userdashboard/userprofile")}>
                                            <img className='rounded-circle' width={30} height={30} src={data.photo_profile_link} />
                                            <h5 className='text-light'>{data.name.replace(/ .*/, '')}</h5>
                                        </div>
                                    )
                                }
                                return (
                                    <div className='d-flex' style={{ cursor: "pointer" }} onClick={() => navigate("userdashboard/userprofile")}>
                                        <img className='rounded-circle' width={30} height={30} src='https://w7.pngwing.com/pngs/73/580/png-transparent-arturia-business-logo-musical-instruments-individual-retirement-account-logo-business-sound.png' />
                                        <h5 className='text-light'>Joshua</h5>
                                    </div>
                                )
                            })
                        }
                    </li>
                </ul>
            </ul>
        </nav >
    )
}
export { TopNavLayoutLoggedIn }