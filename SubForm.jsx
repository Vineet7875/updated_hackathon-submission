import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SubForm.css";

function SubForm({ onSubmit }) {

    const location = useLocation();
    const submission = location.state?.submission ?? {};
    const [startdate, setStartDate] = useState(submission.startdate ?? "")
    const [enddate, setEndDate] = useState(submission.enddate ?? "")
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);


    const [title, setTitle] = useState(submission.title ?? "");
    const [summary, setSummary] = useState(submission.summary ?? "");
    const [description, setDescription] = useState(submission.description ?? "");
    const [characterCount, setCharacterCount] = useState(0);
    const [img, setImg] = useState(submission.img ?? "");

    const [gitlink, setGitLink] = useState(submission.gitlink ?? "");
    const [linklink, setLinkLink] = useState(submission.gitlink ?? "");
    const [hackathonname, sethackathonname] = useState(submission.hackathonname ?? "");
    const navigate = useNavigate();

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
        setCharacterCount(event.target.value.length);
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => {
                if (img.width >= 360 && img.height >= 360) {
                    setImg({
                        preview: URL.createObjectURL(file),
                        name: file.name,
                    });
                } else {
                    alert('Minimum resolution  is 360px X 360px.');
                }
            };
            img.src = URL.createObjectURL(file);

        }
    };

    const handleStartDateChange = (date, event) => {
        setSelectedStartDate(date);
        setStartDate(date.toLocaleDateString('en-GB'))

    };

    const handleEndDateChange = (date, event) => {
        setSelectedEndDate(date);
        setEndDate(date.toLocaleDateString('en-GB'))

    };

    function handleSubmit(event) {
        event.preventDefault();
        const submission = { title, summary, description, img, gitlink, linklink, startdate, enddate, hackathonname };
        // console.log(startdate)
        // console.log(enddate)
        // console.log(img)
        onSubmit && onSubmit(submission);
        setTitle("");
        setSummary("");
        setDescription("");
        setCharacterCount(0);
        setImg("");
        setStartDate("");
        setEndDate("");
        setGitLink("");
        setLinkLink("")
        sethackathonname("")
        navigate("/")
    }


    return (
        <div className="sub-form-container">
            <h2>New Hackathon Submission</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        placeholder="Title of your submission"
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <input
                        placeholder="A short summary of your submission (this will be visible with your submission)"
                        type="text"
                        id="summary"
                        name="summary"
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        placeholder="Write a long description of your project. You can describe your idea and approach here."
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}

                    />
                    <div className="char-count">{characterCount}/3,000 characters</div>
                </div>
                <div className="form-group">
                    <label htmlFor="cover-image">Cover Image</label>
                    <p>Minimum resolution: 360px X 360px</p>
                    <div >
                        {img ? (
                            <div className="upload-reupload">
                                <div className="img-name">

                                    <img src={img.preview} alt={img.name} style={{ width: '5rem' }} />
                                    <p>{img.name}</p>
                                </div>
                                <div className="re-upload">
                                    <p>Reupload</p>
                                    <label htmlFor="image-reupload">
                                        <CloudUploadIcon style={{ fontSize: '2.5rem', color: '#858585' }} />
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <div style={{ border: 'dashed 2px #CCCCCC', borderRadius: '5px', background: '#F5F5F5', padding: '10px', textAlign: 'center' }}>
                                <label htmlFor="image-upload" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <AddPhotoAlternateIcon style={{ fontSize: '3rem', color: '#CCCCCC' }} />
                                </label>
                            </div>
                        )}
                        <input type="file" id="image-upload" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload}  required/>
                        <input type="file" id="image-reupload" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload}/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="hackathon-name">Hackathon Name</label>
                    <input placeholder="Enter the name of the hackathon" value={hackathonname}
                        onChange={(event) => sethackathonname(event.target.value)} type="text" id="hackathon-name" name="hackathon-name"  required />
                </div>
                <div className="form-group">
                    <div className="Date">
                        <div className="startDate">
                            <label htmlFor="start-date">Hackathon Start Date</label>
                            <div className="start">
                                <DatePicker
                                    id="date-picker"
                                    placeholderText="Select start date"
                                    name="start-date"
                                    value={startdate}
                                    selected={selectedStartDate}
                                    onChange={handleStartDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    required
                                />
                                <CalendarTodayIcon style={{ 'color': '#858585' }} onClick={() => document.getElementById("date-picker").click()} />
                            </div>

                        </div>

                        <div className="endDate">
                            <label htmlFor="end-date">Hackathon End Date</label>
                            <div className="end">
                                <DatePicker
                                    id="date-picker1"
                                    placeholderText="Select end date"
                                    name="end-date"
                                    value={enddate}
                                    selected={selectedEndDate}
                                    onChange={handleEndDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    required
                                />
                                <CalendarTodayIcon style={{ 'color': '#858585' }} onClick={() => document.getElementById("date-picker1").click()} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="github-repo">GitHub Repository</label>
                    <input placeholder="Enter your submission's public Github repository link" type="text" id="github-repo" name="github-repo" value={gitlink} onChange={(event) => setGitLink(event.target.value)}  required/>

                </div>
                <div className="form-group">
                    <label htmlFor="other-links">Other Links</label>
                    <input placeholder="You can upload a video demo or URL of you demo app here." type="text" id="other-links" name="other-links" value={linklink} onChange={(event) => setLinkLink(event.target.value)} />
                </div>
                <button type="submit">Upload Submission</button>
            </form>
        </div>
    );
}
export default SubForm;






