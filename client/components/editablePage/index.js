import React, { useState } from 'react'
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import EditableBlock from "../editableBlock"
import Notice from "../notice"

const EditablePage = ({
    id,
    // fetchedBlocks, 
    err
}) => {

    const fetchedBlocks = [
        {
            _id: "5f54d75b114c6d176d7e9765",
            html: "Heading",
            tag: "h1",
            imageUrl: "",
        },
        {
            _id: "5f54d75b114c6d176d7e9766",
            html: "I am a <strong>paragraph</strong>",
            tag: "p",
            imageUrl: "",
        },
        {
            _id: "5f54d75b114c6d176d7e9767",
            html: "random_3",
            tag: "img",
            imageUrl: "images/test.png",
        }
    ]

    const [blocks, setBlocks] = useState(fetchedBlocks)

    const onDragEndHandler = () => { }

    const isNewPublicPage = true
    return (
        <>
            {isNewPublicPage && (
                <Notice dismissible>
                    <h4>Hey 👋 You just created a public page.</h4>
                    <p>It will be automatically deleted after 24 hours.</p>
                </Notice>
            )}
            <DragDropContext onDragEnd={onDragEndHandler}>
                <Droppable droppableId={id}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {blocks.map((block) => {
                                const position = blocks.map((b) => b._id).indexOf(block._id) + 1
                                return (
                                    <EditableBlock
                                        key={block._id}
                                        position={position}
                                        id={block._id}
                                        tag={block.tag}
                                        html={block.html}
                                        imageUrl={block.imageUrl}
                                        pageId={id}
                                    // addBlock={addBlockHandler}
                                    // deleteBlock={deleteBlockHandler}
                                    // updateBlock={updateBlockHandler}
                                    />
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default EditablePage