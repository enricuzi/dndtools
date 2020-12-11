import React, {useRef, useState} from "react";
import "./NoteSection.css";
import Storage from "../../Services/Storage";

const NoteSection = props => {

    const [value, setValue] = useState(Storage.getItem("note") || '')
    let textarea = useRef(null)

    function setText() {
        const {value} = textarea.current;
        setValue(value)
    }

    function onSaveText(e) {
        const {value} = textarea.current;
        Storage.save("note", value);
    }

    function onClearText(e) {
        textarea.current.value = ''
    }

    return (
        <div className={"note-section"}>
            <div className={"actions"}>
                <label>Note</label>
                <button className={"clear"} onClick={onClearText}>Clear</button>
                <button className={"save"} onClick={onSaveText}>Save</button>
            </div>
            <textarea value={value} onChange={setText} ref={textarea} />
        </div>
    )
}

export default NoteSection