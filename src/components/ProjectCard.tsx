import React from "react";
import Link from "next/link";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    makeStyles,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        margin: 'auto',
    },
    media: {
        maxHeight: 400,
    },
});

type TProps = {
    project: {
        id: string
        title: string
        type: string
        builder: string
        start: string
        productUrl: string
    }
};

const ProjectCard: React.FC<TProps> = ({ project }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <Link href="/projects/[projectId]" as={`/projects/${project.id}`}>
                    <CardActionArea>
                        <CardHeader
                            title={project.title}
                            subheader={project.start + ' 〜'}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                工種： {project.type}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                工事施工者： {project.builder}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions>
                    <Button size="small" color="primary" href={project.productUrl} target="_blank">
                        Google Photoで開く
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default ProjectCard;
