import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";
import {getTrackers, searchTrackers} from "@/lib/tracker.action";

const SearchBar = ({expenses: _expenses, setExpenses}:ExProps) => {
    const [search, setSearch] = useState('');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            try {
                if (!search.trim()) {
                    const all = await getTrackers();
                    setExpenses(all);
                } else {
                    const results = await searchTrackers(search);
                     setExpenses(results || []);
                }
            } catch (e) {
                console.log('Search error', e);
            }
        }, 300);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [search, setExpenses]);

    return (
        <div className={'flex items-center h-12 justify-center max-w-md border rounded-xl p-2 px-4 border-white'}>
            <SearchIcon/>
            <Input onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)} placeholder={'Search tracer...'} className={'w-full' +
                ' border-none' +
                ' focus-visible:ring-0' +
                ' focus:ring-0'} />
        </div>
    )
}
export default SearchBar
