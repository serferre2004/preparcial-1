"use client";
import Image from "next/image";
import { useEffect, useState } from "react"
import styles from "./form.module.css"
import { AuthorCardProps } from "@/components/authorCard"
import { useListContext } from "@/contexts/ListContext";
import { useRouter, useSearchParams } from "next/navigation";


export default function CrearPage() {
    const { list, addAuthor, updateAuthor } = useListContext();
    const router = useRouter();
    const params = useSearchParams();
    let counter = 2000;

    const id_string = params.get("id");
    const id: number = id_string? +id_string: 0;

    const initialAuthor: AuthorCardProps = {
        id: counter++,
        name: "",
        birthdate: "",
        image: "",
        description: "" 
    }
    
    const [author, setAuthor] = useState<AuthorCardProps> (initialAuthor);
    const [imagePrev, setImagePrev] = useState("");
    
    useEffect(() => {
        if (id !== 0) {
            const foundAuthor = list.find(auth => auth.id === id);
            if (foundAuthor) {
                setAuthor(foundAuthor);
                setImagePrev(foundAuthor.image || "");
            }
        }
    }, [id, list]);

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if (id != 0){
            updateAuthor(author);
        } else {
            addAuthor(author);
        }
        router.push("/authors")
    }

    const handleInputChange = (field: keyof AuthorCardProps, value: string) => {
        setAuthor(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Actualizar previsualización de imagen si es el campo image
        if (field === 'image') {
            setImagePrev(value);
        }
    };

    return (
        <div className="w-1/2 mx-auto bg-slate-300 rounded-lg p-7 h-9/10 mt-10">
            <h1 className="text-2xl font-bold text-center">Nuevo Autor</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label className={styles.label}>Nombre</label>
                <input className={styles.input} onChange={(e) => handleInputChange('name', e.target.value)} value={author.name} required></input>
                <label className={styles.label}>Fecha de nacimiento</label>
                <input className={styles.input} onChange={(e) => handleInputChange('birthdate', e.target.value)}  type="date" value={author.birthdate} required></input>
                <label className={styles.label}>URL de imagen</label>
                <textarea className={styles.input} onChange={(e) => handleInputChange('image', e.target.value)} value={author.image} required></textarea>
                { imagePrev.length > 0 && (
                <Image 
                src={imagePrev} 
                alt="Previsualización de imagen" 
                width={200} 
                height={200} 
                className={styles.image}
                />
                )}
                <label className={styles.label}>Descripción</label>
                <textarea rows={5} onChange={(e) => handleInputChange('description', e.target.value)}  className={styles.input} value={author.description} required></textarea>
                <button type="submit" className={styles.button}>Guardar</button>
            </form>
        </div>

    )
}