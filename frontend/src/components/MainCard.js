import React from "react"
import { Form, Link } from "react-router-dom"

export function MainCard(props){
    const { type, data, options } = props
    console.log(`[debug]: MainCard type: ${type} data: ${data} options: ${options}`)
    return (
        <>
            <span>{data.title}</span>
            <div>
                <Form action="." method="post">
                    <input type="hidden" name="title" defaultValue={encodeURIComponent(data.title)} />
                    <input type="hidden" name="id" defaultValue={data.id} />
                    <button type="submit"> Start </button>
                </Form>
                <button>
                    <Link to={`./edit-workout/${data.id}`}> Edit </Link>
                </button>
            </div>
        </>
    )
}

export default MainCard