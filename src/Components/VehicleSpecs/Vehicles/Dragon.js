import React from "react";
import { motion } from "framer-motion";
import VehicleSpecsNav from "../VehicleSpecsNav";
import SpecsFirstPageDragon from "../InfoPages/SpecsFirstPageDragon";
import SpecsSecondPageDragon from "../InfoPages/SpecsSecondPageDragon";
import D2 from "../../../Assets/img/D2.png";

import styles from "../VehicleSpecs.module.css";

const Dragon = ({
    page,
    handleSpecPage,
    vehicleSelection,
    vehicleData,
    containerVariants,
}) => {
    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={styles.vehicleSpecs}
        >
            <div className={styles.specs}>
                <div>
                    <div className={styles.vehicleTitle}>
                        <h3>{vehicleData.name.toUpperCase()}</h3>
                    </div>
                    <div className={styles.title}>
                        <h4>OVERVIEW</h4>
                    </div>
                </div>
                {page === 1 ? (
                    <SpecsFirstPageDragon
                        selectionData={vehicleData}
                        vehicleSelection={vehicleSelection}
                    />
                ) : (
                    <SpecsSecondPageDragon
                        selectionData={vehicleData}
                        vehicleSelection={vehicleSelection}
                    />
                )}
                <VehicleSpecsNav page={page} handleSpecPage={handleSpecPage} />
            </div>
            <div className={styles.vehicleImage}>
                <img
                    src={D2}
                    alt={`Dragon 2 vehicle`}
                    style={{ height: "30%" }}
                />
            </div>
        </motion.section>
    );
};

export default Dragon;
