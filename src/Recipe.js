import React, {useEffect, useState} from 'react';
import {CardRecipe} from './CardRecipe';
import {Container, Grid, TextField} from "@mui/material";
import JSONDATA from './recipes.json';

const axios = require('axios');

const Recipe = () => {

    const [items, setItems] = useState([])
    const [search, setSearch] = useState('');

    const getRecipes = () => {

        axios.get('http://localhost:5000/api/Recipe')
            .then(function (response) {
                setItems(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log("-End-");
            });
    }
    useEffect(() => {getRecipes();}, [])

    return (
        <Container>
            <div className="InputContainer">
                <TextField
                    style={{
                        padding: '16px 32px',
                        border: 'none',
                        display: "flex",
                        transition: 'all 240ms ease-out',
                        width: '100%',
                        justifyContent: "center",
                        alignItems: "center"
                    }}

                    placeholder={"Search Recipe"}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}/>
            </div>
            <Grid container columns={12} spacing={1}>
                {
                    items !== undefined
                    && items.filter(item => {
                        if (search === "") {
                            return item
                        } else {
                            return item.name.toLowerCase().includes(search.toLowerCase())
                            || item.author.toLowerCase().includes(search.toLowerCase())
                        }
                    }).map((item) => {
                        return (
                            <Grid item xs={4} key={item.id}>
                                <CardRecipe alt={item.name}
                                            imageName={item.name}
                                            name={item.name}
                                            author={item.author}
                                            rating={item.rating}
                                            key={item.id}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}
export default Recipe