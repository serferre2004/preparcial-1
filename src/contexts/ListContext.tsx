"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import AuthorCard, { AuthorCardProps } from "@/components/authorCard";

interface ListContextType {
    list: AuthorCardProps[];
    favs: AuthorCardProps[];
    setList: (list: AuthorCardProps[]) => void;
    addAuthor: (author: AuthorCardProps) => void;
    removeAuthor: (id: number) => void;
    updateAuthor: (author: AuthorCardProps) => void;
    addFav: (id: number) => void;
    removeFav: (id: number) => void;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export function ListProvider({ children }: { children:React.ReactNode }) {
    const [list, setList] = useState<AuthorCardProps[]>([]);
    const [favs, setFavs] = useState<AuthorCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/authors');
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
            }
            const result = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const authorList = result.map((item:any) => ({
            id: item.id,
            birthdate: item.birthDate,
            name: item.name, 
            image: item.image, 
            description: item.description
            }));
            setList(authorList);
            setLoading(false);
        } catch (error) {
            setError(error instanceof Error ? error : new Error(String(error)));
            setLoading(false);
        }
        }
        void fetchData();
    }, []);

    const addAuthor = (author: AuthorCardProps) => {
        setList(prev => [...prev, author]);
    }

    const removeAuthor = (id: number) => {
        setList(prev => prev.filter(author => author.id !== id));
    }

    const updateAuthor = (author: AuthorCardProps) => {
        removeAuthor(author.id);
        addAuthor(author);
    }

    const addFav = (id: number) => {
        const author: AuthorCardProps | undefined = list.find(a => a.id === id);
        if (!author) return;
        setFavs(prev => [...prev, author]);
        console.log(favs);
    }
    
    const removeFav = (id: number) => {
        setFavs(prev => prev.filter(a => a.id !== id));
    }

    return (
        <ListContext.Provider value={{ list, favs, setList, addAuthor, removeAuthor, updateAuthor, addFav, removeFav}}>
            {children}
        </ListContext.Provider>
    );
}

export function useListContext() {
    const context = useContext(ListContext);
    if (context === undefined) {
        throw new Error('useListContext no está en un ListProvider');
    }
    return context;
}