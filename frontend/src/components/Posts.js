import React from 'react'
import Post from './Post'

const Posts = ({posts}) => {


    return (
        <div>
            {posts.map(p => <Post key={p.id} post={p}/>)}
        </div>
        )

}
export default Posts