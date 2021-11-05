import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {makeStyles} from '@mui/styles'
import {Rating} from "@mui/material";
import {useState} from "react";

function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images
}
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

const useStyles = makeStyles({
    root: {
        backgroundColor: '#fafafa',
        transition: 'transform .2s'
    },
    '&:hover': {
        transition: 'transform .1s',
        transform: 'scale(1.1)',
        cursor: 'pointer'
    }
});


export function CardRecipe({alt, imageName, name, author, rating}) {
    const classes = useStyles();
    const [style, setStyle] = useState(classes.root);
    return (
        <Card className={style}
              onMouseOver={(e) => setStyle(classes["&:hover"])}
              onMouseOut={(e) => setStyle(classes.root)}
              sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={images[imageName + '.jpg']}
                alt={alt}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {author}
                </Typography>
            </CardContent>
            <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
        </Card>
    );
}
