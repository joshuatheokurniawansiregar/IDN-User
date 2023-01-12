import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export function UpdateUserProfile() {
    const navigate = useNavigate();
    const [photoProfileLink, setPhotoProfileLink] = useState("");
    const [savedImage, setSavedImage] = useState(null);
    const [isimageselected, setIsImageSelected] = useState(false);
    const [id, setId] = useState(null);
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [email, setEmail] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [updatedAt, setUpdatedAt] = useState();
    const [isCanceled, setIsCanceled] = useState(true);
    const handleUploadImage = (event) => {
        let uploadedFile = event.target.files[0];
        let test = event.target.files[0];
        if (test != null) {
            setSavedImage(uploadedFile);
        }
        setIsImageSelected(true);
    }
    function showPhotoPreview() {
        const photo_profile = document.querySelector("#photo-profile");
        const fileReader = new FileReader();
        fileReader.onload = ev => {
            photo_profile.src = ev.target.result;
        }
        fileReader.readAsDataURL(savedImage);
    }
    useEffect(() => {
        setTimeout(() => {
            setIsCanceled(false);
        }, 0.1);
        let mounted = true;

        if (isimageselected === true) {
            showPhotoPreview();
        }
        if (isimageselected === false) {
            PrevousProfile();
        }
        async function PrevousProfile() {
            const userdata = window.localStorage.getItem("user");
            const userdataobject = JSON.parse(userdata);
            let user = await axios.get("http://127.0.0.1:8000/api/userprofile/" + userdataobject["user"]);
            let imageUrl = await axios({
                url: "http://127.0.0.1:8000/api/userprofile/photo_profile/" + userdataobject["user"],
                method: "GET",
                responseType: "blob",
            });
            let imageData = imageUrl.data;
            let type = imageData.type;
            let uploadedFile = new File([imageData], user.data.author[0]["photo_profile_name"], { type: type });
            const { id, name, email, author_description, created_at, updated_at, photo_profile_link } = user.data.author[0];
            setId(id);
            if (photo_profile_link === null || photo_profile_link == "") {
                setPhotoProfileLink("https://w7.pngwing.com/pngs/73/580/png-transparent-arturia-business-logo-musical-instruments-individual-retirement-account-logo-business-sound.png");
            } else {
                setPhotoProfileLink(photo_profile_link);
            }
            setUserDescription(author_description);
            setUserName(name);
            setEmail(email);
            setCreatedAt(created_at);
            setUpdatedAt(updated_at);
            if (mounted) {
                if (author_description === null || author_description === "") {
                    document.getElementById("user-description").disabled = true;
                } else {
                    document.getElementById("user-description").disabled = false;
                }
                // setSavedImage(uploadedFile);
            } else {
                // setSavedImage(null);
            }
        }
        if (isCanceled === false) {
            return () => {
                mounted = false;
            }
        }
    });
    const userSubmit = async (e) => {
        e.preventDefault();
        const userdata = window.localStorage.getItem("user");
        const userdataobject = JSON.parse(userdata);
        let formData = new FormData();
        formData.append("name", userName);
        formData.append("author_desc", userDescription);
        formData.append("image_file", savedImage);
        console.log(formData.get("image_file"));
        await axios.post(`http://127.0.0.1:8000/api/user/profile/${userdataobject["user"]}`, formData).then(response => {
        }).catch(error => {
            if (error.response.status === 422) {

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
        <>
            <div className="userdashboard-main">
                <div className="container-fluid" style={{ height: "700px", overflowY: "auto" }}>
                    <div className="d-flex flex-column justify-content-between align-items-baseline" style={{
                        marginTop: "30px",
                    }}>
                        <img className='rounded-circle border mb-2' id="photo-profile" src={photoProfileLink} style={{ width: "100px", height: "100px" }} />
                        <input type={"file"} id="updated-photo-profile" onChange={handleUploadImage} className="btn btn-secondary w-25" />
                    </div>
                    <form encType="multipart/form" onSubmit={userSubmit}>
                        <div className="mb-3 mt-3 row">
                            <label htmlFor='username' className="col-sm-2 col-form-label">User Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} id="username" />
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row">
                            <label htmlFor='userdescription' className="col-sm-2 col-form-label">User Description</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" value={userDescription} onChange={(e) => setUserDescription(e.target.value)} id="user-description" />
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row">
                            <label htmlFor='email' className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" disabled defaultValue={email} id="email" />
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row">
                            <label className="col-sm-2 col-form-label">Created At</label>
                            <div className="col-sm-10">
                                {new Date(createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row">
                            <label className="col-sm-2 col-form-label">Updated At</label>
                            <div className="col-sm-10">
                                {new Date(updatedAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}