const ClientLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    return (
        <section>
            <nav>This reps the executor specific navigation</nav>

            {children}
        </section>
    );
}

export default ClientLayout;