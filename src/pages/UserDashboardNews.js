import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { News } from '../services/json_dummy';

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

// Before user have author role
function UserHaveNotAuthor() {
    return (
        <>
            <div style={{
                position: "absolute",
                top: "35%",
                left: "45%",
                width: "max-content"
            }} className="userdashboardcenter-main"><h5>You Haven't Signed Up As an Author</h5>
            </div>
            <a className="btn btn-danger userdashboard-center-main" href="/userdashboard/news/createauthoraccount" style={{
                position: "absolute",
                top: "40%",
                left: "49%",
                width: "max-content"
            }}>Create Your Author Account</a>
        </>
    )
}

function WaitUntilAdminApprove() {
    return (
        <div style={{
            position: "relative",
            alignSelf: "center",
            width: "max-content",
            top: "25%",
            left: "25%",
            transform: "translate(50%, 100%)",
        }}>Wait until you being approved as author
        </div>
    )
}

// After user have author role, but user does not have money receiving account
function AuthorHaveNotReceivingAccount() {
    return (
        <>
            <div style={{
                position: "absolute",
                top: "35%",
                left: "45%",
                width: "max-content"
            }} className="userdashboardcenter-main"><h5>You Don't Have Money Receiving Account</h5>
            </div>
            <a className="btn btn-danger userdashboard-center-main" href="/userdashboard/authoraccountbalance/createaccountbalance" style={{
                position: "absolute",
                top: "40%",
                left: "49%",
                width: "max-content"
            }}>Create Money Receiving Account Number</a>
        </>
    )
}

// Before author write a news
function AuthorHasNotCreateNews() {
    return (
        <>
            <NavLink className="btn btn-danger" to="/userdashboard/news/createnews" style={{
                position: "relative",
                top: "7%",
                left: "1%",
                width: "max-content"
            }}>Add News</NavLink>
            <div style={{
                position: "absolute",
                top: "35%",
                left: "45%",
                width: "max-content"
            }}><h5>You Havent' Write News</h5>
            </div>

        </>
    )
}

function WaitUntilAdminApproveNews() {
    return (
        <div style={{
            position: "relative",
            top: "25%",
            // width: "max-content"
            alignSelf: "center"
        }} className="text-center"><h5>You had been writing a news in this account. Wait until your news being approved</h5>
        </div>
    )
}

export function AuthorDashboardOpenedNews() {
    const { news_slug } = useParams();
    const [news, setNews] = useState({});
    const [topic, setTopic] = useState({});
    const [newsTitle, setNewsTitle] = useState("");
    const [newsContent, setNewsContent] = useState("");
    const [newsPictureName, setNewsPictureName] = useState("");
    const [newsPictureLink, setNewsPictureLink] = useState("");
    const [newsAddedAt, setNewsAddedAt] = useState(null);
    const [newsUpdatedAt, setNewsUpdatedAt] = useState(null);
    const [newsSubTopic, setNewsSubTopic] = useState("");
    const [newsTopic, setNewsTopic] = useState("");
    useEffect(() => {
        async function getNews() {
            await axios.get("http://127.0.0.1:8000/api/news/open_news/" + news_slug).then(response => {
                setNews(response.data.news);
                setTopic(response.data.topics);
            });
        }
        getNews();
    }, [])
    useEffect(() => {
        const { news_title, news_content, news_picture_name, news_picture_link, added_at, updated_at, sub_topic_title } = news;
        const { topic_title } = topic;
        setNewsTitle(news_title);
        setNewsContent(news_content);
        setNewsPictureName(news_picture_name);
        setNewsPictureLink(news_picture_link);
        setNewsAddedAt(added_at);
        setNewsUpdatedAt(updated_at);
        setNewsSubTopic(sub_topic_title);
        setNewsTopic(topic_title);
    });
    return (
        <div className="userdashboard-main">
            <div className="container-fluid">
                <p className="mt-4 ml-5">News / <span style={{ fontWeight: "bold" }}>{newsTitle}</span></p>
                <article style={{ marginLeft: "8%", marginTop: "3%" }} className="d-flex justify-content-start align-items-baseline flex-column">
                    <img src={newsPictureLink} style={{ width: "20%", height: "200px" }} alt={newsPictureName}></img>
                    <p className="mt-4 ml-5">Added At:{new Date(newsAddedAt).toLocaleDateString()}</p>
                    {
                        new Date(newsUpdatedAt).toLocaleDateString() != new Date(newsUpdatedAt).toLocaleDateString() ? "" : <p className="mt-4 ml-5"> {new Date(newsUpdatedAt).toLocaleDateString()}</p>
                    }
                    <p style={{ fontWeight: "bold" }}>{newsTitle}</p>
                    <div className="row container w-50">
                        <a className="btn btn-success w-25 col-sm-6" href={"/userdashboard/news/open_news/" + news_slug + "/update_news"}>Update</a>
                        <button style={{ marginLeft: "10px" }} className="btn btn-danger w-25 col-sm-6" href="">Delete</button>
                    </div>

                    <div className="d-flex justify-content-around align-items-baseline flex-row">
                        <p>Topic: <spa>{newsTopic}</spa></p>
                        <p style={{ marginLeft: "20px" }}>Sub topic: <span>{newsSubTopic}</span></p>
                    </div>
                    <div>{newsContent}</div>
                </article>
            </div>
        </div >
    )
}
export function AuthorUpdateNewsPage() {
    const { news_slug } = useParams();
    const [newsId, setNewsId] = useState(null);
    const [newsTitle, setNewsTitle] = useState("");
    const [newsContent, setNewsContent] = useState("");
    const [defaultNewsTitle, setDefaultNewsTitle] = useState("");
    const [defaultNewsContent, setDefaultNewsContent] = useState("");
    const [newsPictureName, setNewsPictureName] = useState("");
    const [subTopic, setSubTopic] = useState("");
    const [subTopics, setSubTopics] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isMounted, setIsMounted] = useState(true);
    const [renderImageMounted, setRenderImageMounted] = useState(true);
    const [isimageselected, setIsImageSelected] = useState(false);
    const handleUploadImage = event => {
        setSelectedImage(event.target.files[0]);
        setUploadedImage(event.target.files[0]);
        if (setUploadedImage === null) {
        }
        setIsImageSelected(true);
    }
    useEffect(() => {
        setTimeout(() => {
            setIsMounted(false);
        }, 1);
        let willUnmounted = true;
        async function getSubTopics() {
            await axios.get("http://127.0.0.1:8000/api/sub_topics").then(response => {
                setSubTopics(response.data.sub_topics);
            });
        }
        async function setUpNewsValue() {
            await axios.get("http://127.0.0.1:8000/api/news/open_news/" + news_slug).then(async (response) => {
                let { id, news_title, news_content, news_picture_name } = response.data.news;
                setNewsId(id);
                setNewsTitle(news_title);
                setDefaultNewsTitle(news_title);
                setDefaultNewsContent(news_content);
                setNewsContent(news_content);
                setNewsPictureName(news_picture_name);
                let picture = await axios({ url: "http://127.0.0.1:8000/api/news/openpicture/" + id, method: "GET", responseType: "blob" });
                let imageData = picture.data;
                let type = imageData.type;
                let UploadedFile = new File([imageData], news_picture_name, { type: type });
                if (willUnmounted) {
                    setUploadedImage(UploadedFile);
                } else {
                    setUploadedImage(selectedImage);
                }
            });
        }

        if (isMounted === false) {
            return () => {
                willUnmounted = false;
            }
        }
        getSubTopics();
        setUpNewsValue();
    }, [])
    useEffect(() => {
        let mounted = false;
        setTimeout(() => {
            setRenderImageMounted(false);
        }, 100);
        async function RenderImageFromUploadPreviousImage() {
            const picture = await axios({ url: "http://127.0.0.1:8000/api/news/openpicture/" + newsId, method: "GET", responseType: "blob" });
            const imageData = picture.data;
            const type = imageData.type;
            const UploadedFile = new File([imageData], newsPictureName, { type: type });
            document.querySelector("#image-preview-parent").style.display = "none";
            const image_preview_result = document.querySelector("#image-preview-result");
            image_preview_result.style.display = "block";
            const fileReader = new FileReader();
            fileReader.onload = ev => {
                image_preview_result.style.backgroundImage = `url(${ev.target.result})`;
            }
            fileReader.readAsDataURL(UploadedFile);
        }
        if (isimageselected === true) {
            document.querySelector("#image-preview-parent").style.display = "none";
            const image_preview_result = document.querySelector("#image-preview-result");
            image_preview_result.style.display = "block";
            const fileReader = new FileReader();
            fileReader.onload = ev => {
                image_preview_result.style.backgroundImage = `url(${ev.target.result})`;
            }
            fileReader.readAsDataURL(uploadedImage);
        } else if (isimageselected === false) {
            RenderImageFromUploadPreviousImage();
        }
        if (mounted === false) {
            return () => {
                mounted = false;
            }
        }
    })
    async function chooseTopic(e) {
        const sub_topic = await axios.get("http://127.0.0.1:8000/api/sub_topics/" + e.target.value);
        setSubTopic(sub_topic.data.sub_topics["id"]);
        axios.get(`http://127.0.0.1:8000/api/topics/showbyid/${sub_topic.data.sub_topics["topic_id"]}`).then(response => {
            document.getElementById("topic-by-sub-toopic").innerHTML = response.data.topics["topic_title"];
        });
    }

    async function Sumbit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("news_title", newsTitle);
        formData.append("news_content", newsContent);
        formData.append("image_file", uploadedImage);
        formData.append("sub_topic_id", subTopic);
        console.log(formData.get("image_file"));
        await axios.post(`http://127.0.0.1:8000/api/news/${newsId}`, formData).then(response => {
            console.log(response.data);
            setTimeout(() => {
                window.location.replace("/userdashboard/news");
            }, 2000);
        }).catch(errResponse => {
            console.log(errResponse.response);
        });
    }
    return (
        <div className="userdashboard-main">
            <div className="container-fluid">
                <form className="form-group" encType="multipart/form-data" onSubmit={Sumbit} >
                    <div className="mt-5 row">
                        <label className="col-sm-2 mt-5">News Image</label>
                        <div className="col-sm-10 d-flex justify-content-start flex-column align-items-baseline">
                            <div className="border" id="image-preview-parent" style={{ width: "30%", height: "250px", padding: "50px 10px", marginRight: "20px", marginLeft: "45px" }}>
                                <label id="image-preview">News image preview</label>
                            </div>
                            <div id="image-preview-result" style={{ display: "none", width: "35%", height: "300px", backgroundSize: "contain", backgroundRepeat: "no-repeat", marginRight: "20px", marginLeft: "45px" }}></div>
                            <div className="mt-4">
                                <input type="file" className="btn btn-dark" accept="image/*" onChange={handleUploadImage} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 mt-1 row">
                        <label className="col-sm-2 mt-5 col-form-label">News Title</label>
                        <div className="col-sm-10">
                            <input type={"text"} className="form-control mt-5 w-50" defaultValue={defaultNewsTitle} value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3 mt-3 row">
                        <label htmlFor='description' className="col-sm-2 mt-5 col-form-label">News Content</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control w-100" id="description" rows="5" cols="1" defaultValue={defaultNewsContent} value={newsContent} onChange={(e) => setNewsContent(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="mb-3 mt-3 row">
                        <label className="col-sm-2 mt-2 col-form-label">News Sub Topic</label>
                        <div className="">
                            <select className="w-50 mt-2 col-sm-10" value={subTopic} onChange={chooseTopic} >
                                <option value="selected">Choose News Sub Topic</option>
                                {
                                    subTopics.map((sub_topic) => {
                                        return (<option value={sub_topic.sub_topic_slug} key={sub_topic.id}>{sub_topic.sub_topic_title}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <label className="col-sm-1">Topic:</label>
                        <p id="topic-by-sub-toopic" className="col-sm-11"></p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <ul className="w-25">
                            <li className="nav-item">
                                <NavLink to={"/userdashboard/userprofile"} className="btn btn-primary"> Create Account Account Guidline</NavLink>
                            </li>
                        </ul>
                        <ul className="w-25 mr-5">
                            <li className="nav-item">
                                <button className="btn btn-success">Submit</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    )
}
function AuthorHasWrittenNews() {
    const [startDate, setStartDate] = useState();
    const [news, setNews] = useState([]);
    let user = window.localStorage.getItem("user");
    let userobject = JSON.parse(user);
    useEffect(() => {
        async function getNews() {
            await axios.get("http://127.0.0.1:8000/api/news/user/" + userobject["user"]).then(response => {
                setNews(response.data.news);
            })
        }
        getNews();
    }, []);
    useEffect(() => {
        filterByDateAt(news);
    });
    const filterByDateAt = (sorted_news) => {
        const radioButtons = document.querySelectorAll(".filterd-by-date");
        let sorted = null;
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].addEventListener("change", function (param) {
                if (param.target) {
                    if (param.target.value == "created_at") {
                        sorted = sorted_news.sort((a, b) => a.news_title - b.news_title);
                    }
                    if (param.target.value == "updated_at") {
                        sorted = sorted_news.sort((a, b) => b.updated_at - a.updated_at);
                        console.log(sorted)
                    }
                    // window.alert("hi")
                }
                setNews(sorted);
            });
        }
    }
    return (
        <>
            <div className="userdashboard-main">
                <form className="form-group">
                    <div className="row" style={{ marginTop: "15px", paddingLeft: "150px" }}>
                        <div className="col-sm-6 mt-3 mb-2">
                            <label htmlFor="date" className="col-form-label">Filter By Date</label>
                            <div className="d-flex flex-column align-items-baseline w-50">
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                <div className="d-flex flex-column">
                                    <label htmlFor="created_at"><input type={"radio"} id="created_at" value="created_at" name="filtered-by-date" className="filterd-by-date" />Created At</label>
                                    <label htmlFor="updated_at"><input type={"radio"} id="updated_at" value="updated_at" name="filtered-by-date" className="filterd-by-date" />Updated At</label>
                                </div>
                                <button className="btn btn-danger ">Reset Filter Date</button>
                            </div>
                        </div>
                        <div className="col-sm-6 mt-3" >
                            <label>Filter By Keywords</label>
                            <input className="form-control w-50" />
                        </div>
                    </div>
                </form>
                <div style={{ height: "2px", background: "black", marginTop: "1%" }}> </div>
                <NavLink to="/userdashboard/news/createnews" className="btn btn-danger" style={{ marginLeft: "120px", marginTop: "20px", marginBottom: "20px" }}>Add News</NavLink>
                <div className="container">
                    <div className="row ">
                        {
                            news.map((data, index) => {
                                return (
                                    <div className="col-sm-6 border mb-3 image-view" key={index}>
                                        <p style={{ fontWeight: "bold" }} className="">{data.name}</p>
                                        <img style={{
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            maxWidth: "50%",
                                            height: "300px"
                                        }} src={data.news_picture_link} />
                                        <p className="test">Added at: {new Date(data.news_added_at).toLocaleDateString()}</p>
                                        <p>Updated At: {new Date(data.news_updated_at).toLocaleDateString()}</p>
                                        <a style={{ display: "block" }} href={`/userdashboard/news/open_news/${data.news_slug}`}> <p className="">{data.news_title}</p></a>
                                        <div className="mb-2" style={{ textIndent: "15px" }}>{data.news_content}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export function AuthorNews() {
    const [approval, setApproval] = useState([]);
    const [user, setUser] = useState({});
    const [news, setNews] = useState([]);
    const [newsApproval, setNewsApproval] = useState([]);
    const [newsCount, setNewsCount] = useState(null);
    const [componentDidMount, setComponentDidMount] = useState(true);
    const navigate = useNavigate();
    async function getUser() {
        const userdata = localStorage.getItem("user");
        const userobject = JSON.parse(userdata);
        const user = await axios.get("http://127.0.0.1:8000/api/userprofile/" + userobject["user"]);
        // setUser(user.data.author);
    }
    async function getNotExistNews() {
        const userdata = localStorage.getItem("user");
        const userobject = JSON.parse(userdata);
        await axios.get("http://127.0.0.1:8000/api/rendercomponents/" + userobject["user"]).then(response => {
            setNews(response.data.news);
            setApproval(response.data.approval);
            setUser(response.data.user);
            console.log(response.data.user);
            setNewsApproval(response.data.news_approval);
            setNewsCount(response.data.news_total);
            // console.log(response.data.user.id);
        }).catch(error => {

        });
    }
    useEffect(() => {
        let ismounted = true;
        getUser();
        getNotExistNews();
        if (approval === null && user.role === null) {
            setTimeout(() => {
                setComponentDidMount(false);
            }, 0.1);
            // if (ismounted === true) {
            //     window.location.reload();
            // }
            // if ((user.role !== null && user.role === "author") && user.balance_account_number === null) {
            //     if (componentDidMount === false) {
            //         setComponentDidMount(true);
            //     } else {
            //         setTimeout(() => {
            //             setComponentDidMount(false);
            //         }, 0.1);
            //         if (ismounted === true) {
            //             window.location.reload();
            //         }
            //     }
            // }
            // if (newsApproval == null && newsCount > 0) {
            //     if (componentDidMount === false) {
            //         setComponentDidMount(true);
            //     } else {
            //         setTimeout(() => {
            //             setComponentDidMount(false);
            //         }, 0.1);
            //         if (ismounted === true) {
            //             window.location.reload();
            //         }
            //     }
            // }
        }
        if (componentDidMount === false) {
            return () => {
                ismounted = false;
            }
        }
    }, []);

    useEffect(() => {
        const userdata = window.localStorage.getItem("user");
        if (!userdata) {
            navigate("/");
        }
    });
    return (
        <>
            <div className="userdashboard-main">
                <div className="container-fluid" style={{ height: "700px", overflowY: "auto" }}>
                    {
                        // (approval.length === 0 && user.role === null) ? alert("test") : "BIG L"
                        (approval.length === 0 && user.role === null) ? <UserHaveNotAuthor /> : (approval.length !== 0 && user.role === null)
                            ? <WaitUntilAdminApprove /> : ((user.role !== null && user.role === "author") && user.balance_account_number === null)
                                ? <AuthorHaveNotReceivingAccount /> : ((newsCount === 0 && newsApproval.length === 0) && user.role === "author" && user.balance_account_number !== null)
                                    ? <AuthorHasNotCreateNews /> : (newsApproval.length !== 0 && newsCount === 0) ? <WaitUntilAdminApproveNews /> : <AuthorHasWrittenNews />
                    }
                </div>
            </div>
        </>
    )

}
export function CreateAuthorAccountForm() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [savedImage, setSavedImage] = useState(null);
    const [isimageselected, setIsImageSelected] = useState(false);
    const [userDescription, setUserDescription] = useState("");
    const [authorValidationErrorMessages, setAuthorValidationErrorMessages] = useState({});
    const [isCanceled, setIsCanceled] = useState(true);
    const [userDataObject, setUserDataObject] = useState(null);
    const handleUploadImage = event => {
        setSavedImage(event.target.files[0]);
        setSelectedImage(event.target.files[0]);
        if (event.target.files[0] == null) {
            setSavedImage(selectedImage);
        }
        setIsImageSelected(true);
    }

    async function getPreviousSavedImage() {
        const userdata = window.localStorage.getItem("user");
        const userdataobject = JSON.parse(userdata);
        let imagename = await axios.get("http://127.0.0.1:8000/api/userprofile/" + userdataobject["user"]);
        let imageUrl = await axios({
            url: "http://127.0.0.1:8000/api/userprofile/photo_profile/" + userdataobject["user"],
            method: "GET",
            responseType: "blob",
        });
        let imageData = imageUrl.data;
        let type = imageData.type;
        let uploadedFile = new File([imageData], imagename.data.author[0]["photo_profile_name"], { type: type });
        // if (mounted) {
        setSavedImage(uploadedFile);
        // }
    }

    async function PreviousPhotoProfile() {
        const userdata = window.localStorage.getItem("user");
        const userdataobject = JSON.parse(userdata);
        let imagename = await axios.get("http://127.0.0.1:8000/api/userprofile/" + userdataobject["user"]);
        let imageUrl = await axios({
            url: "http://127.0.0.1:8000/api/userprofile/photo_profile/" + userdataobject["user"],
            method: "GET",
            responseType: "blob",
        });
        let imageData = imageUrl.data;
        let type = imageData.type;
        let uploadedFile = new File([imageData], imagename.data.author[0]["photo_profile_name"], { type: type });
        console.log(uploadedFile);
        document.querySelector("#image-preview-parent").style.display = "none";
        const image_preview_result = document.querySelector("#image-preview-result");
        image_preview_result.style.display = "block";
        const fileReader = new FileReader();
        fileReader.onload = ev => {
            const savedPreview = ev.target.result;
            const selectedPreview = ev.target.result;
            if (selectedPreview == null) {
                image_preview_result.style.backgroundImage = `url(${savedPreview})`;
            } else {
                image_preview_result.style.backgroundImage = `url(${ev.target.result})`;
            }
        }
        fileReader.readAsDataURL(uploadedFile);
    }
    useEffect(() => {
        let mounted = true;
        function ShowImagePreviewAfterSelectImage() {
            document.querySelector("#image-preview-parent").style.display = "none";
            const image_preview_result = document.querySelector("#image-preview-result");
            image_preview_result.style.display = "block";
            const fileReader = new FileReader();
            fileReader.onload = ev => {
                const savedPreview = ev.target.result;
                const selectedPreview = ev.target.result;
                if (selectedPreview == null) {
                    image_preview_result.style.backgroundImage = `url(${savedPreview})`;
                } else {
                    image_preview_result.style.backgroundImage = `url(${ev.target.result})`;
                }
            }
            fileReader.readAsDataURL(savedImage);
        }
        if (isimageselected == true) ShowImagePreviewAfterSelectImage();
        if (isimageselected == false) {
            PreviousPhotoProfile()
            getPreviousSavedImage();
        };

    }, []);
    const userSubmit = async (e) => {
        e.preventDefault();
        const userdata = window.localStorage.getItem("user");
        const userdataobject = JSON.parse(userdata);
        PreviousPhotoProfile();
        let formData = new FormData();
        formData.append("image_file", savedImage)
        formData.append("author_description", userDescription);
        await axios.post(`http://127.0.0.1:8000/api/adminapproval/author/${userdataobject["user"]}`, formData).then(response => {
            window.location.replace("/userdashboard/news");
        }).catch(error => {
            if (error.response.status === 422) {
                setAuthorValidationErrorMessages(error.response.data.message);
            }
            if (error.response.status === 500) {
                console.log(error.response.data);
            }
            if (error.response.status === 409) {
                window.location.replace("/userdashboard/news");
            }
        });
    }
    return (
        <div className="userdashboard-main">
            <div className="container-fluid">
                <div className="text-center container mt-5 mb-5 w-50 rounded" style={{ border: "2px solid black" }}>
                    <h4>Indonesia Open News Create Author Account</h4>
                </div>
                <form style={{ positition: "relative", left: "60px" }} onSubmit={userSubmit}>
                    <div className="mb-3 mt-3 row">
                        <label htmlFor='description' className="col-sm-2 mt-5 col-form-label">Author Photo Profile</label>
                        <div className="col-sm-8">
                            <div className="d-flex justify-content-start flex-column align-items-baseline ">
                                <div className="border" id="image-preview-parent" style={{ width: "300px", padding: "10% 5%", marginRight: "20px" }}>
                                    <p id="image-preview" style={{ display: "inline" }} className="text-danger">You don't have photo profile</p>
                                </div>
                                <div className="border" id="image-preview-result" style={{
                                    display: "none", height: "200px", width: "300px", marginRight: "20px",
                                    backgroundRepeat: "no-repeat", backgroundSize: "contain"
                                }} ></div>
                                <input type="file" className="btn btn-dark form-control w-50 mt-3" accept="image/*" onChange={handleUploadImage} />
                            </div>
                            <ul className="mr-5 mt-2">
                                {authorValidationErrorMessages["image_file"] && <li className="text-danger">{authorValidationErrorMessages["image_file"][0]}</li>}
                            </ul>
                        </div>
                    </div>
                    <div className="mb-3 mt-3 row">
                        <label htmlFor='description' className="col-sm-2 mt-5 col-form-label">Author Description</label>
                        <div className="col-sm-8 mt-4 d-flex flex-column align-items-start">
                            <textarea type="text" className="form-control" value={userDescription} onChange={(e) => setUserDescription(e.target.value)} id="description" rows="5" cols="1"></textarea>
                            <ul className="mr-5 mt-2">
                                {authorValidationErrorMessages["author_description"] && <li className="text-danger">{authorValidationErrorMessages["author_description"][0]}</li>}
                            </ul>
                        </div>
                    </div>

                    <div className="mb-3 mt-3 row">
                    </div>
                    <div className="d-flex justify-content-center">
                        <ul className="w-25">
                            <li className="nav-item">
                                <NavLink to={"/userdashboard/userprofile"} className="btn btn-primary">Author Create Account Guidline</NavLink>
                            </li>
                        </ul>
                        <ul className="w-25 mr-5">
                            <li className="nav-item">
                                <button className="btn btn-success">Submit</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    )
}
export function CreateNewsForm() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [newsTitle, setNewsTitle] = useState("");
    const [newsContent, setNewsContent] = useState("");
    const [subTopic, setSubTopic] = useState("");
    const [subTopics, setSubTopics] = useState([]);
    const [isimageselected, setIsImageSelected] = useState(false);
    const handleUploadImage = event => {
        setSelectedImage(event.target.files[0]);
        setUploadedImage(event.target.files[0]);
        if (setUploadedImage === null) {
            setUploadedImage(selectedImage);
        }
        setIsImageSelected(true);
    }
    async function getSubTopics() {
        await axios.get("http://127.0.0.1:8000/api/sub_topics").then(response => {
            setSubTopics(response.data.sub_topics);
        });
    }
    useEffect(() => {
        getSubTopics();
    }, [])
    useEffect(() => {
        if (isimageselected == true) {
            document.querySelector("#image-preview-parent").style.display = "none";
            const image_preview_result = document.querySelector("#image-preview-result");
            image_preview_result.style.display = "block";
            const fileReader = new FileReader();
            fileReader.onload = ev => {
                image_preview_result.style.backgroundImage = `url(${ev.target.result})`;
            }
            fileReader.readAsDataURL(uploadedImage);
        }
    })
    async function chooseTopic(e) {
        const sub_topic = await axios.get("http://127.0.0.1:8000/api/sub_topics/show_by_id/" + e.target.value);
        setSubTopic(e.target.value);
        if (e.target.value === "selected") {
            document.getElementById("topic-by-sub-toopic").innerHTML = "";
        } else {
            axios.get(`http://127.0.0.1:8000/api/topics/showbyid/${sub_topic.data.sub_topics["topic_id"]}`).then(response => {
                document.getElementById("topic-by-sub-toopic").innerHTML = response.data.topics["topic_title"];
            });
        }
    }
    async function Sumbit(e) {
        e.preventDefault();
        const userdata = window.localStorage.getItem("user");
        const userdataobject = JSON.parse(userdata);
        let formData = new FormData();
        formData.append("news_title", newsTitle);
        formData.append("news_content", newsContent);
        formData.append("image_file", uploadedImage);
        formData.append("sub_topic_id", subTopic);
        await axios.post(`http://127.0.0.1:8000/api/adminapproval/news/${userdataobject["user"]}`, formData).then(response => {
            // console.log(response.data);
            window.location.replace("/userdashboard/news");
        }).catch(errResponse => {
            console.log(errResponse.response);
        });
    }
    return (
        <div className="userdashboard-main">
            <div className="container-fluid">
                <form className="form-group" encType="multipart/form-data" onSubmit={Sumbit} >
                    <div className="mt-5 row">
                        <label className="col-sm-2 mt-5">News Image</label>
                        <div className="col-sm-10 d-flex justify-content-start flex-column align-items-baseline">
                            <div className="border" id="image-preview-parent" style={{ width: "30%", height: "250px", padding: "50px 10px", marginRight: "20px", marginLeft: "45px" }}>
                                <label id="image-preview">News image preview</label>
                            </div>
                            <div id="image-preview-result" style={{ display: "none", width: "35%", height: "300px", backgroundSize: "contain", backgroundRepeat: "no-repeat", marginRight: "20px", marginLeft: "45px" }}></div>
                            <div className="mt-4">
                                <input type="file" className="btn btn-dark" accept="image/*" onChange={handleUploadImage} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 mt-1 row">
                        <label className="col-sm-2 mt-5 col-form-label">News Title</label>
                        <div className="col-sm-10">
                            <input type={"text"} className="form-control mt-5 w-50" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3 mt-3 row">
                        <label htmlFor='description' className="col-sm-2 mt-5 col-form-label">News Content</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control w-50" id="description" rows="5" cols="1" value={newsContent} onChange={(e) => setNewsContent(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="mb-3 mt-3 row">
                        <label className="col-sm-2 mt-2 col-form-label">News Sub Topic</label>
                        <div className="">
                            <select className="w-50 mt-2 col-sm-10" onChange={chooseTopic} >
                                <option value="selected" >Choose News Sub Topic 1</option>
                                {
                                    subTopics.map((sub_topic, index) => {
                                        return (<option value={sub_topic.id} key={index}>{sub_topic.sub_topic_title}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <label className="col-sm-1">Topic:</label>
                        <p id="topic-by-sub-toopic" className="col-sm-11"></p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <ul className="w-25">
                            <li className="nav-item">
                                <NavLink to={"/userdashboard/userprofile"} className="btn btn-primary"> Create Account Account Guidline</NavLink>
                            </li>
                        </ul>
                        <ul className="w-25 mr-5">
                            <li className="nav-item">
                                <button className="btn btn-success">Submit</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    )
}