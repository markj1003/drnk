import React from "react";
import { useLoaderData } from "react-router-dom";
import { ProfileCard, StatsCard, DetailsCard, Rooms } from "./profileComponents";
import { useSelector } from "react-redux";
import Stack from 'react-bootstrap/Stack';

export default function PublicProfile() {
    const data = useLoaderData();
    const username = useSelector((state) => state.login.Username);
    if (!data.found) {
       return <React.Fragment>
        <Stack className='w-100 text-center'>
            <h1> User not found! </h1>
            <p>The account {data.details.Username} does not exist.</p>
        </Stack>
        </React.Fragment> 
    }
    let isUser;
    if (username===data.details.Username) isUser = true;
    else isUser = false;

return <div className="container pt-2" >
<div className="row">
    <div className="col-md-5 mb-3">
    <ProfileCard details={data.details} isUser={isUser} />
    <StatsCard awards={data.awards} />
    </div>
    <div className="col-md-7">
    <DetailsCard details={data.details} isUser={isUser}  />
    <Rooms rooms={data.rooms} isUser={isUser} />
    </div>
    </div>
</div>
}