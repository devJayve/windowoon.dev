import PostCard from "@/components/PostCard";

export default function PostBoxes({ slugs }: { slugs: Slug[] }) {
    return (
        <ul>
            {slugs.map((slug, i) => (
                <PostCard key={i} slug={slug.slug}/>
            ))}
        </ul>
    );
}