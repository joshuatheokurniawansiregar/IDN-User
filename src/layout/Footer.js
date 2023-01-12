import { Link } from "react-router-dom";
import { News } from "../services/json_dummy";
import axios from "axios";
import { useEffect, useState } from "react";

export function Footer() {
    const [topics, setTopics] = useState([]);
    const [subTopics, setSubTopics] = useState([]);
    useEffect(() => {
        getTopics();
        getSubTopics();
    }, []);
    const getTopics = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/topics");
        setTopics(response.data.topics);
    }
    const getSubTopics = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/sub_topics");
        setSubTopics(response.data.sub_topics);
    }
    return (
        <>
            <div className="container-fluid bg-dark text-light mt-3" style={{
                position: "relative",
                top: "100%"
            }}>
                <footer className='py-5'>
                    <div className="row">
                        <div className="col-sm-4">
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <Link className="nav-link text-light" to="/">Home</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link className="nav-link text-light" to="#">About</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <h5>Topic</h5>
                            <div className="scroll-y" style={{
                                height: "150px",
                                overflowY: "scroll",
                                width: "max-content"
                            }}>
                                <ul className="nav flex-column">
                                    {
                                        topics.map((data, key) => {
                                            return (
                                                <li className="nav-item mb-2" key={key}>
                                                    <a className="nav-link text-light fit-content" href={`${data.topic_slug}`}>{data.topic_title}</a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <h5>Sub Topic</h5>
                            <div style={{
                                height: "150px",
                                overflowY: "scroll",
                                width: "max-content"
                            }}>
                                <ul className="nav flex-column">
                                    {
                                        subTopics.map((data, key) => {
                                            return (
                                                <li className="nav-item mb-2" key={key}>
                                                    <a className="nav-link text-light fit-content" href={`${data.topic_slug}/${data.sub_topic_slug}`}>{data.sub_topic_title}</a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}