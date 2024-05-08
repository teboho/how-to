import withAuth from "@/hocs/withAuth";

const Page = () => {
    return (
        <div>
            <h1>Portfolio</h1>
            <div>
                <p>Portfolio content</p>
            </div>
        </div>
    )
}

export default withAuth(Page);