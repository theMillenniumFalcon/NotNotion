import DragHandleIcon from "../../images/draggable.svg"
import Image from 'next/image'

const EditableBlock = ({ html }) => {
    return (
        <>{html}
            <Image
                src={DragHandleIcon}
                alt="Icon"
                priority
            />
            <br />
        </>
    )
}

export default EditableBlock