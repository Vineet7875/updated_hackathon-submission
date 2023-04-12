import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Submissions from "./Submissions";
import SubForm from "./SubForm";
import Description from "./Descriptions";
import Editsubmission from "./Editsubmission"
import Navbar from "./Navbar"
import FavDescription from "./FavDescription";
import FavSubmissions from "./FavSubmissions";
import DiaglogBox from "./DiaglogBox";
function Hackathon() {
  const [submissions, setSubmissions] = useState([]);
  const [favsubmissions, setFavsubmissions] = useState([]);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleSubmission = (submission) => {
    setSubmissions((prevSubmissions) => [...prevSubmissions, submission]);
    setCurrentSubmission(submission);
  };

  const addSubmission = (submission) => {
    setSubmissions([...submissions, { id: submissions.length + 1, ...submission }]);
    setCurrentSubmission(submission);
  };

  const updateSubmission = (submission) => {
    console.log("update submission")
    const index = submissions.findIndex((s) => s.id === submission.id);
    if (index >= 0) {
      setSubmissions((prevSubmissions) => [...prevSubmissions.slice(0, index), submission, ...prevSubmissions.slice(index + 1),]);
      setCurrentSubmission(submission);
    }
    console.log(submission)
  };


  const handleFormSubmit = (id, data) => {
    const newSubmission = { id, ...data };
    setSubmissions([...submissions, newSubmission]);
    setSubmissions([...submissions, { id, ...data }]);
    setCurrentSubmission(newSubmission);
  };

  const handleFavSubmissions = (submission) => {
    setFavsubmissions([...favsubmissions, { id: favsubmissions.length + 1, ...submission }]);
  }


  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSortBy={setSortBy} sortBy={sortBy} />
                <Submissions submissions={submissions} favsubmissions={favsubmissions} searchQuery={searchQuery} sortBy={sortBy} />
              </>
            }
          />
          <Route
            path="/Submissions"
            element={
              <>
                <Home />
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSortBy={setSortBy} sortBy={sortBy} />
                <Submissions submissions={submissions} favsubmissions={favsubmissions} searchQuery={searchQuery} sortBy={sortBy} />
              </>
            }
          />
          <Route
            path="/FavSubmissions"
            element={
              <>
                <Home />
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSortBy={setSortBy} sortBy={sortBy} />
                <FavSubmissions searchQuery={searchQuery} sortBy={sortBy} favsubmissions={favsubmissions} />
              </>
            }
          />

          <Route
            path="/SubForm"
            element={<SubForm onSubmit={addSubmission} />}
          />
          <Route
            path="/Description/:id"
            element={
              <Description
                setSubmissions={setSubmissions} setCurrentSubmission={setCurrentSubmission}
                setFavsubmissions={setFavsubmissions}
                favsubmissions={favsubmissions}
              />}
          />
          <Route
            path="/FavDescription/:id"
            element={
              <FavDescription
                setFavsubmissions={setFavsubmissions}
                favsubmissions={favsubmissions}
              />}
          />
          <Route path="/Editsubmission" element={<Editsubmission
            onSubmit={updateSubmission}
            updateSubmission={updateSubmission}
          />} />
          <Route path="/DiaglogBox" element={<DiaglogBox
          />} />
        </Routes>
      </Router>
    </>
  );
}

export default Hackathon;
