"use client"
import MainForm from "@/components/MainForm";
import SearchBar from "@/components/SearchBar";
import Tables from "@/components/Tabels";
import {useState,useEffect} from "react";
import { getTrackers} from "@/lib/tracker.action";
import SearchByCategory from "@/components/SearchByCategory";
import Charts from "@/components/Charts";


const Page = () => {
    const [total, setTotal] = useState(0);
    const [expenses, setExpenses] = useState<Props[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrackers();
            setExpenses(data);
        };
        fetchData();
    }, []);

    useEffect(()=>{
        const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);
       setTotal(total);


    },[expenses])
    return (
        <main className={'main-container'}>
            <div className={'flex justify-between items-center max-sm:flex-col'}>

            <h1 className={'my-4 font-semibold text-2xl'}>Total Expenses : ${total} </h1>
            <div className={'flex max-sm:flex-col gap-4 max-sm:w-full'}>
                <SearchBar expenses={expenses} setExpenses={setExpenses}/>
                <SearchByCategory expenses={expenses} setExpenses={setExpenses}/>
            </div>
            </div>

            <div className={'flex mt-4 justify-between  max-sm:flex-col-reverse gap-6 '}>
                <MainForm expenses={expenses} setExpenses={setExpenses}/>
                <Charts/>

            </div>
            <Tables expenses={expenses} setExpenses={setExpenses}/>
        </main>
    )
}
export default Page
