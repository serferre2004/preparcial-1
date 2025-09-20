import { FaCirclePlus } from "react-icons/fa6";

export default function NewCard() {
    return (
        <div className="w-9/10 h-full mx-auto opacity-50 cursor-pointer hover:opacity-100 rounded-lg border-3 border-dashed border-slate-400 relative flex items-center">
            <div className="mx-auto">
                <FaCirclePlus size={80} color="oklch(70.4% 0.04 256.788)"/>
                <p className="text-sm text-center text-slate-400">Nuevo autor</p>
            </div>
        </div>
    );
}