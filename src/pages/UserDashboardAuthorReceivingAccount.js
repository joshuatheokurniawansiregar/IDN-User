import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Form for creating author receving money account
export function UserDashboardCreateAuthorReceivingAccount() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountNumberErrorMessage, setAccountNumberErrorMessage] = useState("");
    const [isStoped, setIsseStoped] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        let ismounted = true;
        setTimeout(() => setIsseStoped(false), 100);
        let userdata = window.localStorage.getItem("user");
        let userdataobject = JSON.parse(userdata);
        async function getUser() {
            const user = await axios.get("http://127.0.0.1:8000/api/userprofile/" + userdataobject["user"]);
            setEmail(user.data.author.at(0)["email"]);
            setName(user.data.author.at(0)["name"]);
            if (user.data.author.at(0)["balance_account_number"] != null) {
                if (ismounted) {
                    navigate("/userdashboard/authoraccountbalance");
                }
            }
        }
        if (isStoped === false) {
            return () => {
                ismounted = false
            }
        }
        getUser();
    }, []);
    const Submit = async (e) => {
        e.preventDefault();
        let userdata = window.localStorage.getItem("user");
        let userdataobject = JSON.parse(userdata);
        console.log(userdataobject["user"]);
        let formData = new FormData();
        formData.append("account_number", accountNumber);
        await axios.post("http://127.0.0.1:8000/api/user/author_balance_account/" + userdataobject["user"], formData).then(response => {
            if (response.status === 202) {
                window.location.replace("/userdashboard/news");
            }
        }).catch(error => {
            if (error.response.status === 422) {
                setAccountNumberErrorMessage(JSON.parse(error.response.data));
                console.log(error.response.data);
            }
        });
    }
    return (
        <div className="userdashboard-main">
            <div className="container-fluid" style={{ height: "100vh" }}>
                <form className="form-group w-75" style={{ position: "relative", left: "100px", top: "100px" }} onSubmit={Submit}>
                    <div className="mb-3 mt-3 row">
                        <label htmlFor='username' className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <span id="username">{name}</span>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor='email' className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <span type="text">{email}</span>
                        </div>
                    </div>
                    <div className="row">
                        <label className="col-sm-2 col-form-label">Account Bank Number</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" placeholder="0000000" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        </div>
                        {accountNumberErrorMessage["account_number"] && <span className="text-danger">{accountNumberErrorMessage["account_number"][0]}</span>}
                    </div>
                    <button type="input" className="text-center  btn btn-danger ">Create Account Balance</button>
                </form>
            </div>
        </div>
    )
}
export function UserDashboardAuthorReceivingAccount() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const userdata = window.localStorage.getItem("user");
        const userdataobject = JSON.parse(userdata);
        async function getUser() {
            axios.get("http://127.0.0.1:8000/api/userprofile/" + userdataobject["user"]).then(response => {
                setUser(response.data.author);
                console.log(response.data.author_with_paid_news);
            });
        }
        getUser();
    }, [])
    let activeteButtonClicked = (event) => {
        event.preventDefault();
        let formActivated = document.querySelectorAll(".actived-input-in-balance-account-page");
        formActivated.forEach(element => element.disabled = false);
        let activebutton = document.querySelectorAll(".button-actived");
        activebutton.forEach(element => { element.style.display = "block" });
    }
    let removeActiveButton = (event) => {
        event.preventDefault();
        let formActivated = document.querySelectorAll(".actived-input-in-balance-account-page");
        formActivated.forEach(element => element.disabled = true);
        document.querySelectorAll(".button-actived").forEach(element => { element.style.display = "none" });
    }
    useEffect(() => {
        document.querySelectorAll(".button-actived").forEach(element => {
            element.style.display = "none";
        })
    })
    return (
        <>
            <div className="userdashboard-main">

                {
                    user.map((data, index) => {
                        return (
                            <form className="w-75 mt-5" style={{ margin: "auto" }} key={index}>
                                <div>
                                    <div className="mb-3 mt-3 row">
                                        <label htmlFor='username' className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control actived-input-in-balance-account-page" defaultValue={data.name} disabled id="username" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor='email' className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control actived-input-in-balance-account-page" defaultValue={data.email} disabled id="email" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor='username' className="col-sm-2 col-form-label">Account Bank Number</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" defaultValue={data.balance_account_number} disabled id="username" />
                                        </div>
                                    </div>
                                    <div className="margin-auto d-lg-flex justify-content-between mt-3">
                                        <button className="btn btn-primary" onClick={activeteButtonClicked}>Activate Update</button>
                                        <button className="btn btn-success button-actived">Update</button>
                                        <button className="btn btn-secondary button-actived" onClick={removeActiveButton}>Cancel</button>
                                        <button className="btn btn-danger button-actived">Delete Account</button>
                                    </div>
                                </div>
                            </form>
                        )
                    })
                }
                <div className="d-flex justify-content-between flex-column" >
                    <div className="d-flex justify-content-start" style={{ marginTop: "75px" }}>
                        <label className="mt-3">Amount of Money Collected: </label>
                        {
                            user.map((data, index) => {
                                return <div style={{ width: "max-content", border: "1px solid grey", marginLeft: "20px", padding: "20px 10px" }}>IDR. {data.balance}</div>
                            })
                        }
                    </div>
                </div>
                <div className="w-75 mt-5">
                    <fieldset className="w-100" style={{ borderRight: "1px solid black", borderTop: "1px solid black", borderLeft: "1px solid black" }}>
                        <legend className="text-center">Paid News Table</legend>
                    </fieldset>
                    <table style={{ width: "100%" }}>
                        <tr style={{ border: "1px solid black", height: "", }}>
                            <th style={{ border: "1px solid black", padding: "10px 20px" }}>News Title</th>
                            <th style={{ border: "1px solid black", padding: "10px 20px" }}>Amount</th>
                            <th style={{ padding: "10px 20px" }}>Status</th>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

