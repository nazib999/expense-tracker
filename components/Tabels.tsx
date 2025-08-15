"use client"
import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {deleteTracker, updateTracker} from "@/lib/tracker.action";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";




const Tables =  ({expenses, setExpenses}:ExProps) => {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Props | null>(null);
    const [form, setForm] = useState({ title: "", amount: 0, category: "", date: "" });

    const openEdit = (exp: Props) => {
        setEditing(exp);
        setForm({
            title: exp.title,
            amount: exp.amount,
            category: exp.category,
            date: exp.date,
        });
        setOpen(true);
    };

    const handleDelete = async (id:string) => {
        await deleteTracker(id);
        setExpenses((pre:Props[])=>pre.filter(exp=>exp._id !== id))
    }

    const handleUpdate = async () => {
        if (!editing) return;
        const { _id } = editing;
        await updateTracker({
            id: _id,
            title: form.title,
            amount: Number(form.amount),
            category: form.category,
            date: new Date(form.date || new Date().toISOString()),
        });
        // update local state
        setExpenses((pre:Props[])=> pre.map(exp => exp._id === _id ? {
            ...exp,
            title: form.title,
            amount: Number(form.amount),
            category: form.category,
            date: form.date,
        } : exp));
        setOpen(false);
        setEditing(null);
    }

    return (
        <>
        <Table className={'border border-white mt-10'}>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow className={'hover:bg-black'}>
                    <TableHead className="w-[100px]">Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead >Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {expenses.map((exp:Props) => (
                    <TableRow key={exp._id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{exp.title}</TableCell>
                        <TableCell>{exp.amount}</TableCell>
                        <TableCell>{exp.category}</TableCell>
                        <TableCell >{exp.date && new Date(exp.date).toISOString().split("T")[0]}</TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button className={'bg-primary'} onClick={() => openEdit(exp)}>Edit</Button>
                            <Button className={'bg-red-700'} onClick={()=>handleDelete(exp._id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
            <Dialog onOpenChange={setOpen} open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit expense</DialogTitle>
                        <DialogDescription>Update the fields and save your changes.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm mb-1">Title</label>
                            <Input value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} placeholder="Title" />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Amount</label>
                            <Input type="number" value={form.amount} onChange={(e)=>setForm({...form, amount: Number(e.target.value)})} placeholder="Amount" />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Category</label>
                            <Input value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} placeholder="Category" />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Date</label>
                            <Input type="date" value={form.date?.slice(0,10) || ""} onChange={(e)=>setForm({...form, date: e.target.value})} />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={()=>{setOpen(false); setEditing(null);}}>Cancel</Button>
                            <Button className={'bg-primary'} onClick={handleUpdate}>Save</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            </>
    )
}
//@ts-ignore
export default Tables
