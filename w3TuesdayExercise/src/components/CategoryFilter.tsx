interface CategoryFilterProps {
    categories: string[]
    selected: string
    onSelect: (category: string) => void
}

export function CategoryFilter({categories, selected, onSelect}: CategoryFilterProps){
    return (
        <div className="flex gap-3">
            {categories.map((category:string)=> (
                <button key={category} onClick={() => onSelect(category)} className={`px-4 py-2 rounded-md capitalize ${selected === category ? 'font-bold text-white bg-zinc-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-300'}`}>
                    {category}
                </button>
            ))}
        </div>
    )
}