import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";
import { postRequest } from "../utils/GooglePhotosApi";
import { AuthContext } from "../contexts/Auth";
import WorkloadCard from "./WorkloadCard";

const WorkloadsList = () => {
    const { accessToken } = useContext(AuthContext);

    const [workloads, setWorkLoads] = useState([]);

    const router = useRouter();
    const { projectId } = router.query;

    useEffect(() => {
        if (!accessToken || !projectId) return;

        const body = {
            albumId: projectId
        };
        postRequest('mediaItems:search', accessToken, JSON.stringify(body))
            .then(response => {
                const { mediaItems } = response;
                if (mediaItems) {
                    setWorkLoads(mediaItems);
                }
            })
        ;
    }, [projectId, accessToken]);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {workloads.map(workload => {
                    return (
                        <Grid item md={4} sm={6} xs={12} key={workload.id}>
                            <WorkloadCard mediaItem={workload} projectId={projectId.toString()} />
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};

export default WorkloadsList;
