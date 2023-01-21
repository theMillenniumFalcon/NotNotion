import { useState } from "react"

import Card from "../components/card"
import Button from "../components/button"
import Notice from "../components/notice"

const PagesPage = ({ pages }) => {
    const initialPages = pages || []
    const [cards, setCards] = useState(initialPages.map((data) => data.page))

    const deleteCard = async (pageId) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API}/api/pages/${pageId}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const cardIndex = cards.map((page) => page._id).indexOf(pageId)
            const updatedCards = [...cards]
            updatedCards.splice(cardIndex, 1)
            setCards(updatedCards)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h1 className="pageHeading">Pages</h1>
            <div id="pageList">
                {cards.length === 0 && (
                    <Notice style={{ marginBottom: "2rem" }}>
                        <h3>Let's go!</h3>
                        <p>Seems like you haven't created any pages so far.</p>
                        <p>How about starting now?</p>
                    </Notice>
                )}
                {cards.map((page, key) => {
                    const updatedAtDate = new Date(Date.parse(page.updatedAt))
                    const pageId = page._id
                    const blocks = page.blocks
                    return (
                        <Card
                            key={key}
                            pageId={pageId}
                            date={updatedAtDate}
                            content={blocks}
                            deleteCard={(pageId) => deleteCard(pageId)}
                        />
                    )
                })}
            </div>
            <Button href="/">Create A New Page</Button>
        </>
    )
}

export default PagesPage