import React, { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./stores/pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import MobilePage from "./stores/pages/MobilePage";
import ComputerPage from "./stores/pages/ComputerPage";
import ACPage from "./stores/pages/ACPage";
import TvsPage from "./stores/pages/TvsPage";
import SpeakersPage from "./stores/pages/SpeakersPage";
import MobileSingle from "./singles/MobileSingle";
import UserCart from "./stores/UserCart";
import ComputerSingle from "./singles/ComputerSingle";
import SpeakerSingle from "./singles/SpeakerSingle";
import TvSingle from "./singles/TvSingle";
import AcSingle from "./singles/AcSingle";
import FridgeSingle from "./singles/FridgeSingle";
import UserWishlist from "./stores/UserWishlist";
import FridgesPage from "./stores/pages/FridgesPage";
import axios from "axios";
import { mobileData } from "./stores/data/mobiles";
import { computerData } from "./stores/data/computers";
import { tvData } from "./stores/data/tv";
import { acData } from "./stores/data/ac";
import { speakerData } from "./stores/data/speaker";
import { fridgeData } from "./stores/data/fridge";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // Error state

  useEffect(() => {
    const endpoints = [
      "/products/Mobile",
      "/products/Computer",
      "/products/AC",
      "/products/TV",
      "/products/Speaker",
      "/products/Fridge",
    ];

    // Fetch data and populate the arrays
    Promise.all(endpoints.map((url) => axios.get(url)))
      .then((responses) => {
        // Reassign data instead of pushing to avoid duplicates
        mobileData.splice(0, mobileData.length, ...responses[0].data);
        computerData.splice(0, computerData.length, ...responses[1].data);
        acData.splice(0, acData.length, ...responses[2].data);
        tvData.splice(0, tvData.length, ...responses[3].data);
        speakerData.splice(0, speakerData.length, ...responses[4].data);
        fridgeData.splice(0, fridgeData.length, ...responses[5].data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true); // Set error state
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Show loading message or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data. Please try again later.</div>;

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Mobiles" element={<MobilePage />} />
        <Route path="/Computers" element={<ComputerPage />} />
        <Route path="/AC" element={<ACPage />} />
        <Route path="/TV" element={<TvsPage />} />
        <Route path="/Fridges" element={<FridgesPage />} />
        <Route path="/Speakers" element={<SpeakersPage />} />
        <Route path="/Mobiles/:id" element={<MobileSingle />} />
        <Route path="/Computers/:id" element={<ComputerSingle />} />
        <Route path="/TV/:id" element={<TvSingle />} />
        <Route path="/AC/:id" element={<AcSingle />} />
        <Route path="/Fridges/:id" element={<FridgeSingle />} />
        <Route path="/Speakers/:id" element={<SpeakerSingle />} />
        <Route path="/cart" element={<UserCart />} />
        <Route path="/wishlist" element={<UserWishlist />} />
      </Routes>
    </div>
  );
};

export default App;
