export default function CodeBlock({ children }: { children: React.ReactNode }) {
    return (
        <pre style={{ background: "#f4f4f4", padding: "1em", borderRadius: "4px" }}>
            <code>{children}</code>
        </pre>
    );
}
