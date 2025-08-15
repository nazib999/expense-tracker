"use server"
import {connectDB} from "@/lib/mongoose";
import Tracker from "@/lib/models/tracker.model";
import {revalidatePath} from "next/cache";

interface Props{
    id?:string;
    title:string;
    amount:number;
    category:string;
    date:Date;
    path?:string;
}

export const updateTracker = async ({id,title,amount,category,date,path}:Props) =>{
    try {
        await connectDB();
        const updated = await Tracker.findByIdAndUpdate(
            id,
            {
                title,
                amount,
                category,
                date,
            },
            { new: true, upsert: false }
        );
        if(path) revalidatePath(path)
        return JSON.parse(JSON.stringify(updated));
    }
    catch (error) {
        console.log("Error updating tracker",error);
    }
}

export const deleteTracker = async (id:string) =>{
    try {
        await connectDB();
        await Tracker.findByIdAndDelete(id);
        revalidatePath("/");
    }
    catch (error) {
        console.log("Error deleting tracker",error);
    }
}

export const getTracker = async (id:string) =>{
    try {
        await connectDB();
        const tracker = await Tracker.findById(id);
        return tracker;
    }
    catch (error) {
        console.log("Error getting tracker",error);
    }
}

export const getTrackers = async () =>{
    try {
        await connectDB();
        const tracker = await Tracker.find();
        return JSON.parse(JSON.stringify(tracker));
    }
    catch (error) {
        console.log("Error getting tracker",error);
    }
}

export const searchTrackers = async (query: string) => {
    try {
        await connectDB();
        const q = (query || "").trim();
        if (!q) {
            const all = await Tracker.find();
            return JSON.parse(JSON.stringify(all));
        }
        const regex = new RegExp(q, 'i');
        const results = await Tracker.find({
            $or: [
                { title: { $regex: regex } },
                { category: { $regex: regex } },
            ]
        });
        return JSON.parse(JSON.stringify(results));
    } catch (error) {
        console.log("Error searching trackers", error);
    }
}

export const searchTrackerByCategory = async (query:string) =>{
    try {
        await connectDB();
        const q = (query || "").trim();
        if (q==='All') {
            const all = await Tracker.find();
            return JSON.parse(JSON.stringify(all));
        }
        const regex = new RegExp(q, 'i');
        const results = await Tracker.find({
            $or: [
                { category: { $regex: regex } },
            ]
        });
        return JSON.parse(JSON.stringify(results));
    } catch (error) {
        console.log("Error searching trackers", error);
    }
}

export const createTracker = async ({title,amount,category,date,path}:Props) =>{
    try {
        await connectDB();
        const tracker = await Tracker.create({
            title,
            amount,
            category,
            date,
        })
        revalidatePath('/')
        return JSON.parse(JSON.stringify(tracker));
    }
    catch (error) {
        console.log("Error creating tracker",error);
    }
}
