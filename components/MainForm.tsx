"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import React, {useState} from "react";
import {CalendarIcon} from "lucide-react";
import { format } from "date-fns"
import {Card, CardHeader} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {createTracker} from "@/lib/tracker.action";


const categories = ['food', 'transport', 'entertainment', 'health', 'education', 'shopping', 'other']



const formSchema = z.object({
    title: z.string().min(3,{message:"Title must be at least 3 characters"}),
    amount: z.coerce.number().min(1,{message:"Amount must be at least 1"}),
    category: z.string().min(2,{message:"Category must be at least 2 characters"}),
    date: z.coerce
        .date()
        .refine((val) => val < new Date(), {
            message: "Date must be in the past",
        })
})

interface Props {
    title: string;
    amount: number;
    category: string;
    date: string;
    _id: string;
}
interface ExProps {
    expenses: Props[];
    setExpenses: React.Dispatch<React.SetStateAction<Props[]>>;
}

const MainForm = ({expenses, setExpenses}:ExProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date());


    const DatePicker =()=>{
        return(
            <Popover  >
                <PopoverTrigger asChild className="flex !w-full">
                    <Button
                        variant="outline"
                        data-empty={!date}
                        className="bg-white data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                    >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
            </Popover>
        )
    }

    const form = useForm<z.infer<typeof formSchema>>({

        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            amount: 1000,
            category: "",
            date: new Date()
        },
    })

    // 2. Define a submit handler.
    const onSubmit=async (values: z.infer<typeof formSchema>)=> {

        const newEx= await createTracker({title:values.title,amount:values.amount,category:values.category,date:values.date});
        setExpenses((pre)=>[...pre,newEx])
        form.reset();

    }
    return (
        <>
        <Card className={'p-6 dark max-w-lg w-full '}>
            <CardHeader className={'text-center mb-2 text-3xl font-semibold'}>Add Expense</CardHeader>
        <Form {...form} >

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                <div className={'flex gap-6 max-sm:flex-col'}>
                <FormField
                    control={form.control}
                    name="title"

                    render={({ field }) => (
                        <FormItem  className={'w-1/2 max-sm:w-full'}>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter title" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem className={'w-1/2 max-sm:w-full'}>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input  placeholder="Enter amount" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>

                <div className={'flex gap-6 max-sm:flex-col '}>
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem className={'w-1/2 max-sm:w-full'}>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select required={true} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent  >
                                        {categories.map((category)=>(

                                        <SelectItem  key={category} value={category}>{category}</SelectItem>
                                            ))}

                                    </SelectContent>
                                </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className={'w-1/2 max-sm:w-full'}>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <DatePicker/>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <Button type="submit" className={' w-full !mt-5'}>Submit</Button>
            </form>
        </Form>
        </Card>
            </>
    )
}
export default MainForm
