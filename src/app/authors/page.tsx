"use client";
import AuthorCard from "@/components/authorCard"
import NewCard from "@/components/newCard"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { useListContext } from "@/contexts/ListContext";

export default function AuthorsList() {
    const {list, setList} = useListContext();
    const router = useRouter();

    const handleClick = () => {
        router.push('/crear')
    };

    return (
        <>
        <h1 className="text-center w-full text-4xl mt-20 text-slate-500 font-bold">Pre-parcial 1</h1>
        <h1 className="text-center w-full text-xl text-slate-500">Sergio David Ferreira Ariza</h1>    
        <div className=" bg-slate-300 px-10 py-10 mt-20">
            <h1 className="text-slate-500 text-3xl font-bold mb-10">Autores</h1>
            <div className="grid grid-cols-4 gap-5">
                {list?.map((author) => (
                    <AuthorCard  key={author.name}
                        id={author.id}
                        name={author.name} 
                        birthdate={author.birthdate} 
                        image= {author.image}
                        description={author.description}
                    />
                ))}
                <div onClick={handleClick}><NewCard /></div>
            </div>
        </div>
        </>
    )
}