import Link from 'next/link';

export default function Post({ post, id }) {
  console.log(post)
  return (


    <div className='flex-col p-3 border-b border-gray-200 hover:bg-gray-50'>



        <Link href={`/posts/${id}`}>
          <p className='text-gray-800 text-sm my-3'>{post?.caption}</p>
        </Link>
        <Link href={`/posts/${id}`}>
          <img src={post?.image} className='rounded-2xl mr-2' />
        </Link>
      
    </div>
  );
}