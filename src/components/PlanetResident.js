import React from "react";
import SimpleDialog from "./common/SimpleDialog";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlanetResident({ residents, open, handleClose }) {
  const [residentsList, setResidentsList] = useState([]);

  useEffect(() => {
    if (residents && residents.length) {
        const nameList = []
        residents.forEach(url => {
            axios.get(url).then((res) => {
                nameList.push(res.data.name)
            });
        })
        setResidentsList(nameList)
    }
  }, []);

  return (
    <>
      <SimpleDialog
        items={residentsList}
        title={"Planet Residents"}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
