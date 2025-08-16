import React, { useEffect, useState} from 'react'

import {getTrackers, searchTrackerByCategory, searchTrackers} from "@/lib/tracker.action";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const categories = ['All','food', 'transport', 'entertainment', 'health', 'education', 'shopping', 'others']

const SearchByCategory = ({expenses: _expenses, setExpenses}:ExProps) => {
    const [search, setSearch] = useState('All');

    useEffect(() => {

      const  debounce = setTimeout(async () => {
            try {
                if (!search.trim()) {
                    const all = await getTrackers();
                    setExpenses(all);
                } else {
                    const results = await searchTrackerByCategory(search);
                    setExpenses(results || []);
                }
            } catch (e) {
                console.log('Search error', e);
            }
        }, 300);
        return () => {
            if (debounce) clearTimeout(debounce);
        };
    }, [search, setExpenses]);

    return (
        <div className={'flex items-center h-12 justify-center max-w-md border rounded-xl p-2 px-4 border-white'}>
            <Select  onValueChange={setSearch} value={search} defaultValue={search}>
                <SelectTrigger className="w-full border-none focus-visible:ring-0 focus:ring-0">
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent >
                    {categories.map((category)=>(

                        <SelectItem key={category} value={category} className={'capitalize'}>{category}</SelectItem>
                    ))}

                </SelectContent>
            </Select>

        </div>
    )
}
export default SearchByCategory
