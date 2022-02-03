import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import { HomeProductItems } from '../data/data'

export default function HomeProductSection() {
    return (
        <Grid container spacing={3} style={{ marginTop: 20 }} className='center'>
            {HomeProductItems.map(item => (
                <Grid item md={4} key={item.title}>
                    <Card>
                        <Link href={`/products?type=${item.href}`} passHref>
                            <CardActionArea>
                                <CardMedia
                                    component='img'
                                    image={item.img}
                                    title={item.title}
                                ></CardMedia>
                                <CardContent>
                                    <Typography align='center'>
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>

            ))}
        </Grid>
    )
}
