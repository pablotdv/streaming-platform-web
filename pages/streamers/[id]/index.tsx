import { Copyright } from '@mui/icons-material';
import { Container, Box, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import VideoPlayer from '../../../components/video-player';
import ProTip from '../../../src/ProTip';
import axios from 'axios';
import { GetServerSideProps } from 'next';

interface IndexProp {
    streamer: StreamerResponse;
}

export default function Index({streamer}: IndexProp) {
    console.log(streamer)
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    {streamer.name}
                </Typography>
                <VideoPlayer src={streamer.urlPlayer} />
                <Link href="/about" color="secondary">
                    Go to the about page
                </Link>
            </Box>
        </Container>
    );
}

interface StreamerResponse {
    name: string;
    urlPlayer: string;    
}

export const getServerSideProps = async (context: any) => {    
    const { id } = context.params;
    const response = await axios.get(`http://localhost:3001/api/streamers/${id}`);
    console.log(response.data);
    return {
        props: {
            streamer: response.data
        }
    }
};