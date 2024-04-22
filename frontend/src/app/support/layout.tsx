const ClientLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    return (
        <section>
            <nav>This reps the support specific navigation</nav>

            {children}
        </section>
    );
}

export default ClientLayout;