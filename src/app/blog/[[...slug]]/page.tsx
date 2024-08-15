// app/blog/[slug]/page.tsx
interface Props {
    params: {
        slug: string;
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = params;

    return (
        <div>
            mutiple detail
        </div>
    );
}