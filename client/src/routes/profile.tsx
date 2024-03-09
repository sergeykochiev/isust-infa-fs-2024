import { FC, useState } from "react";
import { H1 } from "../components/header1";
import Input from "../components/input";
import Button from "../components/button";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/pageWrapper";
import { User } from "../types";

export const ProfilePage: FC = () => {
    const goto = useNavigate()
    const [url, setUrl] = useState('')
    const user: User | null = useLoaderData() as User | null

    const savePulls = async (url: string): Promise<void> => {
        const res = await fetch('/api/pull', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hoyoUrl: url
            })
        })
        if (!res.ok) {
            alert(`Unhandled error`)
            return
        }
        const pullCount = await res.json()
        alert(`Saved ${pullCount.result} pulls`)
        return
    }
    // useEffect(() => {
    //     if (!user) {
    //         goto('/login')
    //         return
    //     }
    // }, [])
    // console.log(user)


    // const user = localStorage.getItem('username')

    return <PageWrapper>
        <div className="flex justify-between items-center gap-4">
            <H1>HSR History</H1>
            <p>{user && user.username}</p>
        </div>
        <p>Paste our Hoyoverse wish URL to the field below to retrieve wishes from Star Rail servers</p>
        <div className="flex gap-4">
            <Input placeholder="Hoyoverse URL" value={url} setValue={setUrl}/>
            <Button onClick={() => savePulls(url)}>Fetch</Button>
        </div>
        <Outlet/>
    </PageWrapper>
}