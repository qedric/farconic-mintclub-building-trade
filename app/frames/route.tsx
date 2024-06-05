/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next"
import { frames } from "./frames"
import { getUserDataForFid } from 'frames.js'
import { CardImage } from '@/app/components/Card'
import { getRandomBuildingAmongFavourites } from '@/app/utils'

export const maxDuration = 20

const handleRequest = frames(async (ctx) => {

    const building = ctx.searchParams?.building ? JSON.parse(ctx.searchParams?.building) : getRandomBuildingAmongFavourites()
    const userData = await getUserDataForFid({ fid: (ctx.message?.requesterFid as number) })

    return {
        image: await CardImage( building, userData?.profileImage, userData?.username, undefined),
        imageOptions: {
            aspectRatio: "1:1"
        },
        textInput: "search e.g. \"bridge\" or \"Rome\"",
        buttons: [
            <Button action="tx" target={{ query: { contractAddress: building.address }, pathname: "/trade/txdata" }} post_url="/trade/txStatusTrade">
                Buy
            </Button>,
            <Button action="post" target="/search">
                Search
            </Button>,
            <Button action="post" target={{ query: { building: JSON.stringify(getRandomBuildingAmongFavourites(building.metadata.name)) }, pathname: "/" }}>
                Random
            </Button>,
            <Button action="link" target="https://farconic.xyz">
                App
            </Button>
        ],
        headers: {  
            "Cache-Control": "max-age=0", 
        }
    }
})

export const GET = handleRequest
export const POST = handleRequest