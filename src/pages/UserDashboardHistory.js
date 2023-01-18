import axios from "axios";
import { useEffect, useState } from "react";
import { News } from "../services/json_dummy";
export function History() {
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    function scrollEvent() {
        if (Math.round(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight) {
            setPage(page + 1);
        }
    }
    async function getHistory() {
        const userstorage = window.localStorage.getItem("user");
        const userobject = JSON.parse(userstorage);
        const response = await axios.get(`http://127.0.0.1:8000/api/history/${userobject["user"]}`);
        setHistory(response.data.history);
        console.log(response.data.history);
        // console.log(response.data.history);
    }
    useEffect(() => {
        getHistory();
    }, []);
    useEffect(() => {
        window.addEventListener("scroll", scrollEvent);
        return () => window.removeEventListener("scroll", scrollEvent);
    }, []);
    return (
        <>
            <div className="userdashboard-main">
                <div className="w-75 mt-4" style={{ marginLeft: "7.5%" }}>
                    <button type="btn btn-primary">Clear history</button>
                    <div className="mt-2">
                        {
                            history.map((data, key) => {
                                const { news } = data;
                                return (
                                    <div key={key} className="d-sm-flex  flex-row">
                                        <img className="mt-5" style={{ height: "7.5%", width: "15%", marginRight: "3%" }} src={news.news_picture_link} />
                                        <div className="mt-5">
                                            <h2 style={{ textAlign: "justify", fontSize: "27px", width: "50%" }}>{news.news_title}</h2>
                                            <p style={{ textAlign: "justify" }} className="w-50">
                                                {news.news_content.substring(0, 150)}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                            // history.map((data, key) => {
                            //     return (
                            //         <div key={key} className="d-sm-flex  flex-row" style={{ paddingTop: "10%" }}>
                            //             <img style={{ height: "7.5%", width: "15%", marginRight: "3%" }} src={data.news_picture_link} />
                            //             <div>
                            //                 <h2 style={{ textAlign: "justify", fontSize: "27px", width: "50%" }}>{data.news_title}</h2>
                            //                 <p style={{ textAlign: "justify" }} className="w-50">
                            //                     {data.news_content.substring(0, 150)}
                            //                 </p>
                            //             </div>
                            //         </div>
                            //     )
                            // })
                        }
                    </div>
                    {loading === true ? <p>Loading...</p> : ""}
                </div>
            </div>
        </>
    )
}