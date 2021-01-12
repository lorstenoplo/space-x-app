import React, { useState, useEffect } from "react";
import NavBar from "./Navigation/NavBar";
import MobileNavBar from "./Navigation/MobileNavBar";
import HomeLogic from "./HomePage/HomeLogic";
import VehicleSpecsLanding from "./VehicleSpecs/VehicleSpecsLanding";
import MissionLogic from "./Missions/MissionLogic";
import VideoModal from "../Components/VideoModal/VideoModal";
import { Route, Switch, useLocation } from "react-router-dom";

import styles from "../CSS/Landing.module.css";

const Landing = () => {
    const location = useLocation();

    const [vehicleData, setVehicleData] = useState([]);
    const [vehicleSelection, setVehicleSelection] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getVehicleSelection = () => {
        const locationStr = location.pathname.toString();
        if (locationStr.includes("/vehicles/")) {
            const vehicle = locationStr.replace("/vehicles/", "");
            setVehicleSelection(vehicle);
        }
    };

    useEffect(() => {
        getVehicleSelection();
    }, [location]);

    console.log(vehicleSelection);

    console.log(location);

    useEffect(() => {
        getVehicleData();
    }, []);

    // console.log(vehicleSelection);

    const getVehicleData = async () => {
        const falcon9 = fetch(
            "https://api.spacexdata.com/v4/rockets/5e9d0d95eda69973a809d1ec"
        );
        const falconHeavy = fetch(
            "https://api.spacexdata.com/v4/rockets/5e9d0d95eda69974db09d1ed"
        );
        const starship = fetch(
            "https://api.spacexdata.com/v4/rockets/5e9d0d96eda699382d09d1ee"
        );
        const dragon = fetch(
            "https://api.spacexdata.com/v4/dragons/5e9d058859b1ffd8e2ad5f90"
        );
        await Promise.all([falcon9, falconHeavy, starship, dragon])
            .then((responses) => {
                return Promise.all(
                    responses.map((response) => {
                        return response.json();
                    })
                );
            })
            .then((data) => {
                setVehicleData(data);
                setIsLoading(false);
            });
    };

    const vehicleSpecDisplay = (
        <Route path="/vehicles">
            <VehicleSpecsLanding
                vehicleSelection={vehicleSelection}
                vehicleData={vehicleData}
            />
        </Route>
    );

    return (
        <div className={styles.landing}>
            <NavBar />
            <MobileNavBar />
            <Switch>
                <Route exact path="/">
                    <HomeLogic />
                </Route>
                {!isLoading && vehicleSpecDisplay}
                <Route path="/missions">
                    <MissionLogic />
                </Route>
            </Switch>

            <Route path="/vehicles/:vehicle/:video">
                <VideoModal vehicleSelection={vehicleSelection} />
            </Route>
        </div>
    );
};

export default Landing;
