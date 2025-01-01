import LibraryItem from "@/app/library/components/LibraryItem";

export default function LibraryPage() {
    return (<div className='container mx-auto p-4'>
        <div className='grid grid-cols-2 gap-4 relative'>
            <LibraryItem/>
            <LibraryItem/>
            <LibraryItem/>
            <LibraryItem/>
        </div>
    </div>);
}

