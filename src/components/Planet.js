import React from 'react'
import PlanetInfo from './PlanetInfo'
import PlanetResident from './PlanetResident'

export default function Planet({ planet }) {

    const { name, residents } = planet

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
  
    return (
        <>
            <PlanetInfo openModal={handleClickOpen} name={name} />
            <PlanetResident open={open} handleClose={handleClose} residents={residents} />
        </>
    )
  }