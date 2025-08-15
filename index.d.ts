declare interface Props {
    title: string;
    amount: number;
    category: string;
    date: string;
    _id: string;
}

declare interface ExProps {
    expenses: Props[];
    setExpenses: Dispatch<SetStateAction<Props[]>>;
}

// Ambient declaration to silence missing types for jsonwebtoken
declare module 'jsonwebtoken';