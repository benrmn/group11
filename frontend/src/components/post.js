import React, {useState} from 'react';


function Post() {
    const [post_text, setPost] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {post_text};
            const response = await fetch("http://localhost:5000/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)});

            window.location = "/";
        } catch(err) {
            console.error(err.message);
        }
    }
    return (  
        <>
            <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
            </div>

            <div className="input-group">
            <span className="input-group-text" id="inputGroup-sizing-lg">Body</span>
            <textarea className="form-control" aria-label="With textarea" value={post_text} onChange={e => setPost(e.target.value)}></textarea>
            </div>

            <button type="button" classNameName="btn btn-primary" onClick={onSubmitForm}>Post</button>
        </>


    );
}

export default Post;