import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import MainForm from "@/components/MainForm";


const Cards = () => {
    return (
        <Card className={'p-6'}>
            <MainForm/>
        </Card>
    )
}
export default Cards
