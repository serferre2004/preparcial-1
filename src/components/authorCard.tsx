"use client";
import Image from "next/image";
import { FaEdit, FaTrash, FaStar} from "react-icons/fa"
import styles from "./author.module.css";
import { useListContext } from "@/contexts/ListContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface AuthorCardProps {
    id: number;
    name: string;
    birthdate: string;
    image: string;
    description: string;
}

export default function AuthorCard({id, name, birthdate, description, image}: AuthorCardProps) {
    const { favs, removeAuthor, addFav, removeFav } = useListContext();
    const [fav, setFav] = useState(false);
    const router = useRouter();
    const handleEdit = () => {
        router.push(`/crear?id=${id}`);
    }

    useEffect (() => {
        const author: AuthorCardProps | undefined = favs.find(a => a.id === id);
        if (author) {
            setFav(true);
        }
    })

    const handleFav = () => {
        if (fav) {
            setFav(false);
            removeFav(id);
            console.log(`${name} eliminado de favoritos`);
        } else {
            setFav(true);
            addFav(id);
            console.log(`${name} añadido a favoritos`);
        }
    }

    return (
        <div className="relative bg-gray-600/30 hover:bg-slate-400/100 border-2 border-slate-400 rounded-lg w-9/10 h-90 mx-auto justify-items-center p-5 shadow-md">
            <button 
            className={`${styles.favIcon} ${fav? styles.fav:''}`} 
            onClick={handleFav}
            aria-pressed={fav}
            >
                <FaStar size={14} opacity={0.8} />
            </button>
            <button className={styles.editIcon} onClick={handleEdit}>
                <FaEdit size={14} color="oklch(50.4% 0.04 256.788)" opacity={0.8} />
            </button>
            <button className={styles.deleteIcon} onClick={() => {console.log(id);removeAuthor(id);}}>
                <FaTrash size={13} color="oklch(50.4% 0.04 256.788)" opacity={0.8} />
            </button>
            <h1 className="text-xl font-bold mt-3">{name}</h1>
            <p className="opacity-70 text-sm mb-5">{birthdate}</p>
            <div className="w-30 mask-b-from-50% mask-b-to-90% rounded-full border-1 aspect-square">
                <Image src={image} alt={`${name} image`} width={100} height={100} className="object-cover w-full h-full"/>
            </div>
            <p className="text-xs opacity-90 mt-5">{description}</p>
        </div>
    );
}