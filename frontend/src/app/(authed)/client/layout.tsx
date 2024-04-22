const ClientLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    return (
        <section>
            <nav>This reps the client specific navigation</nav>

            {children}
        </section>
    );
}

export default ClientLayout;