import PageNotFound from "./Pages/Misc/PageNotFound.jsx";
import SignIn from "./Pages/Auth/SignIn/SignIn.jsx";
import Navbar from "./components/NavBar/NavBar.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import AllClubs from "./Pages/Clubs/AllClubs.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./Pages/Auth/SignUp/SignUp.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import ProfileCard from "./Pages/Profile/ProfilePage.jsx";
import ClubProfile from "./Pages/Clubs/ClubProfile.jsx";
import NewClub from "./Pages/Clubs/NewClub.jsx";
import ClubApplication from "./Pages/Applications/Club/ClubApplication.jsx";
import AllEvents from "./Pages/Events/AllEvents.jsx";
import EventProfile from "./Pages/Events/EventProfile.jsx";
import NewEvent from "./Pages/Events/NewEvent.jsx";
function App() {
  return (
    <UserProvider>
      <div>
        <Navbar/>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/clubs" element={<AllClubs/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/profile/:userId' element={<ProfileCard/>}/>
            <Route path="/clubs/:clubId" element={<ClubProfile/>} />
            <Route path="/newclub" element={<NewClub />} />
            <Route path="/newevent" element={<NewEvent />} />
            <Route path="/club-application" element={<ClubApplication />} />
            <Route path="/events" element={<AllEvents/>}/>
            <Route path="/events/:eventId" element={<EventProfile/>}/>
            <Route path="*" element={<PageNotFound/>}/> 
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};
export default App;
